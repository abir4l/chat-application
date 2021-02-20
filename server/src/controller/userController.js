const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const common = require('../lib/common');
const axios = require('axios');
const qs = require('qs');
/**
 *  TODO: make services for controllers
 */


/**
* @param req
* @param res
*/
exports.login = async function (req, res) {
    const { email, password } = req.body;

    const user = await global.constants.database("users").findOne({email:email});
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            res.status(500).json({
                'message':'something went wrong with the user detail provided'
            });
        }

        if (result) {
            user.password = null;
            const userDto = {'email':user.email,'name':user.name,"username":user.username };
            const refreshToken = jwt.sign( userDto, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN + "h" });
            const accessToken = jwt.sign(userDto, process.env.JWT_ACCESS_SECRET, { expiresIn:20 + "s" });
            res.json({
                'email':user.email,
                'username':user.username,
                refreshToken,
                accessToken,
            });
        } else {
            res.status(401).json({
                message: "Unauthenticated"
            });
        }
    });
}

/**
*
* @param req
* @param res
* todo handle validation errors
*/
exports.register = async function (req, res) {
    let user = req.body;
    let errors = [];
    let required = ['email', 'name', 'password', 'username'];

    required.map((field) => {
        if (!user.hasOwnProperty(field) || user[field] == '') {
            errors.push({ [field] : field + " is required"});
        }
    });

    if (errors.length > 0) {
        res.status(400);
        res.json({
            'msg': 'Validation Error',
            'errors': errors
        });
    }

    try {

        const emailUser = await global.constants.database("users").findOne({email:user.email}).catch(err => { console.log(err) });

        if (emailUser) {
            res.status(400).json({
                message: "Email already in use!"
            });
        }

        const userNameUser = await global.constants.database("users").findOne({username:user.username}).catch(err => { console.log(err) });

        if (userNameUser) {
            res.status(400).json({
                message: "Username already in use!"
            });
        }
    } catch (err) {
        res.status(400);
        res.send('Error while saving the user');
    }

    bcrypt.hash(user.password, global.constants.bycrypt_value, (err, hash) => {
        
        if (err) {
            res.status(500);
            res.json('Error with saving user');
        }
        try {
            user.password = hash;
            global.constants.database("users")
            .insertOne(user,(err,result)=>{
                if (!err) {
                    res.send({
                        message: 'saved successfully'
                    });
                }
            })
        } catch(err) {
            res.status(400);
            res.send('Error while saving the user');
        }
    })
}

/**
*
* @param req
* @param res
*/
//get details for logged in user
exports.getDetails = async function (req, res) {
    const token = common.getToken(req);
    let data = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    
    if (!data) {
        res.status(401).json({
            message: "Unauthenticated"
        });
    }
    
    res.send(data);
}



exports.getAccessToken = function(req,res){
    const token = common.getToken(req);
    let data =  jwt.verify(token, process.env.JWT_SECRET);
    
    global.constants.database("users")
    .findOne({ 'email': data.email }, (err, user) => {
        if (err || user == null) {
            console.log(err);
            res.send('user not found with ' + req.body.email);
        } else {
            
            /*
            * at the moment we are not sending new refresh token
            * as we are treating refresh token as the remember me token
            * with this the user should be logging out in 24 hours
            * */

            const accessToken = jwt.sign({'email':user.email,'name':user.name,'username':user.username }, process.env.JWT_ACCESS_SECRET, { expiresIn:20 + "s" });
            res.json({accessToken});
        }
    });
    
}


exports.listUsers = async function(req,res){
    const users = await global.constants.database("users").find({}).toArray(); // findall
    res.send(users);
    
}


exports.wantsToChat = function(req,res){
    
    const { username,sender } = req.body;
    let socketHandler = global.constants.userSockets.find(d => d.username == username);
    socketHandler.socketHandle.emit("message","someone wants to chat with you");
    res.send('handshake sent');
}

exports.setupChatSocket = (req,res) => {
    
    const {username} = req.body;
    let userSocketHandler = global.constants.userSockets.find(d=>d.username == username);
    
    // don't make new connection if socket exists.
    if(!userSocketHandler){
        global.constants
        .socketHandler.of(username)
        .on('connection', (socket) => {
            global.constants.userSockets
            .push(
                { 
                    username: username,
                    socketHandle: socket
                } 
                );
            });
        }
        res.send({
            message:"socket listening",
            socketfound: userSocketHandler != undefined
        });
        
    }
    
    
exports.logout = function(req,res){
    console.log('logout triggered');
    global.constants.socketHandler.emit("logout","loggedout user")
    res.send("sending logout event");
}



exports.sendMessage = async (req,res) => {
    
    const {sender,reciever,message} = req.body;
    let data = {sender,reciever,message};
    
    await global.constants.database("chatHistory")
            .insertOne({... data,timestamp:new Date()});
    
    global.constants.database("chatHistory")
            .find(
            {$or:[
                {
                    reciever:reciever,
                    sender:sender
                },
                {   
                    sender:reciever,
                    reciever:sender
                }
        ]}).sort({timestamp : -1})
           .toArray((er,response)=>{
                //send it back to both the sender and reciever, in order to reload all the tabs
                global.constants.socketHandler.of(reciever).emit("message",response);
                
                global.constants.socketHandler.of(reciever).emit("new-message",{data:response,reciever:sender});
                global.constants.socketHandler.of(sender).emit("new-message",{data:response,reciever:reciever});

                global.constants.socketHandler.of(reciever).emit("message",response);
                global.constants.socketHandler.of(sender).emit("message",response);
            });
    res.json({message:"success"});

}


exports.loadMessage = async(req,res) => {
    const {sender,reciever} = req.body;
    let messages = await global.constants.database("chatHistory")
    .find(
        {$or:[
            {
                reciever:reciever,
                sender:sender
            },
            {   
                sender:reciever,
                reciever:sender
            }
    ]}
    ).
    sort({timestamp : -1}).toArray();
    res.json(messages);

}

exports.recaptcha = async(req,res) => {
    if (req.body['Response'] === undefined || req.body['Response'] === '' || req.body['Response'] === null) {
        return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }

    try {
        let result = await axios({
            method: 'post',
            url: 'https://www.google.com/recaptcha/api/siteverify',
            params: {
                secret: '6LdIYVUaAAAAAG_It6dK0M_YFMoF-Ul4zJysBavq',
                response: req.body['Response']
            }
        });
        let data = result.data || {};
        if(!data.success){
            res.json({'success': false});
        }

        res.json({'success': true});
    } catch(err) {
        res.json({'success': false});
    }
}
    
    
    
    
