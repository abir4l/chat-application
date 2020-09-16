const userModel = require(global.constants.dir(['model', 'user']));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const common = require('../lib/common');

/**
 *
 * @param req
 * @param res
 */
exports.login = async function (req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    });

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
            const refreshToken = jwt.sign({'email':user.email,'name':user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN + "h" });
            const accessToken = jwt.sign({'email':user.email,'name':user.name }, process.env.JWT_ACCESS_SECRET, { expiresIn:20 + "s" });
            res.json({
                'email':user.email,
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
        let userInstance = new userModel(user);
        userInstance.save((err) => {
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
//testing user hashed password with bycrypt
exports.checkPassword = function (req, res) {
    let pass = req.body.password;
    userModel.findOne({ 'email': req.body.email }, (err, user) => {
        if (err || user == null) {
            console.log(err);
            res.send('user not found with ' + req.body.email);
        } else {
            bcrypt.compare(pass, user.password, (err, result) => {
                //result comes in boolean
                res.send(result);
                // else wrong password
            });
        }
    });
}
/**
 *
 * @param req
 * @param res
 */
//get details for logged in user
exports.getDetails = async function (req, res) {
    console.log('details page');
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
    userModel.findOne({ 'email': data.email }, (err, user) => {
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




