const userModel = require(global.constants.dir(['model', 'user']));
const bcrypt = require('bcrypt');

exports.login = function(req, res) {

    res.send('Not yet implemented');

}

exports.register = function(req, res) {
    user = req.body;
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

//testing user hashed password with bycrypt
exports.checkPassword = function(req, res) {

    pass = req.body.password;
    userModel.findOne({ 'email': req.body.email }, (err, user) =>{
        if (err || user == null) {
        	console.log(err);
            res.send('user not found with ' + req.body.email);
        }
        bcrypt.compare(pass, user.password, (err, result) => {
        	//result comes in boolean
            res.send(result);
            // else wrong password
        });
        


    });
}




