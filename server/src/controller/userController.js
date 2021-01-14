const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const common = require('../lib/common');


/**
* @param req
* @param res
*/
exports.login = async function (req, res) {
    const { email, password } = req.body;
    
    let mongoDb = global.constants.mongoConnection;
    
    const user = await global.constants.database("users").findOne({email:email});
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) 
        res.status(500).json({
            'message':'something went wrong with the user detail provided'
        });
                
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
exports.register = function (req, res) {
    let user = req.body;
    bcrypt.hash(user.password, global.constants.bycrypt_value, (err, hash) => {
        
        if (err) {
            res.status(500);
            res.json('Error with saving user');
        }
        
        user.password = hash;
        global.constants.database("users")
        .insertOne(user,(err,result)=>{
            if (err) {
                console.log(err);
                res.status(400);
                res.send('Error while saving the user');
            } else {
                res.send({
                    url: '',
                    message: 'saved successfully'
                });
            }
        });
        
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

            const accessToken = jwt.sign({'email':user.email,'name':user.name }, process.env.JWT_ACCESS_SECRET, { expiresIn:20 + "s" });
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
    // TODO  test if the socket is closed
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
            message:"socket listening"
        });
        
    }
    
    
exports.logout = function(req,res){
    console.log('logout triggered');
    global.constants.socketHandler.emit("logout","loggedout user")
    res.send("sending logout event");
}



exports.sendMessage = async (req,res) => {
    
    const {sender,reciever,message} = req.body;
    
    
   await global.constants.database("chatHistory")
    .insertOne({
        reciever:reciever,
        sender:sender,
        message:message,
        timestamp:new Date()
    });
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
    ]})
    .sort({timestamp : -1})
    .limit(5)
    .toArray((er,response)=>{
        let recieverSocket = global.constants.userSockets.find(d => d.username === reciever);
        if(recieverSocket){
            recieverSocket.socketHandle.emit("message",response);
        }else{
            //will think about it later
        //     global.constants
        // .socketHandler.of(reciever)
        // .on('connection', (socket) => {
        //     global.constants.userSockets
        //     .push(
        //         { 
        //             username: reciever,
        //             socketHandle: socket
        //         } 
        //         );
        //     });

        }
        res.json({message:"success",data:response});
    });
    

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
    sort({timestamp : -1})
    .limit(5).toArray();
    res.json(messages);

}
    
    
    
    