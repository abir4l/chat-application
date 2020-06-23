const userModel = require(global.constants.dir(['model', 'user']));
const bcrypt = require('bcrypt');

/**
 *
 * @param req
 * @param res
 */
exports.login = function(req, res) {

    res.send('Not yet implemented');

}

/**
 *
 * @param req
 * @param res
 */
exports.register = function(req, res) {
    let user = req.body;
    bcrypt.hash(user.password, global.constants.bycrypt_value, (err, hash) => {
       
        if (err) {
            console.log(err);
            res.send('Error while saving the user');
        }

        user.password = hash;
        let userInstance = new userModel(user);
        userInstance.save((err) => {
            if (err) {
                console.log(err);
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
exports.checkPassword = function(req, res) {

    let pass = req.body.password;
    userModel.findOne({ 'email': req.body.email }, (err, user) =>{
        if (err || user == null) {
        	console.log(err);
            res.send('user not found with ' + req.body.email);
        }
        else{
            bcrypt.compare(pass, user.password, (err, result) => {
                //result comes in boolean
                res.send(result);
                // else wrong password
            });
        }

        


    });
}




