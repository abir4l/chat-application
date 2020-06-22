
const userModel = require(global.constants.dir(['model','user']))
exports.login = function(req,res){
	
	res.send('Not yet implemented');
	
}

exports.register = function(req,res){
	user = req.body;
		user.name = "abiral";
		let userInstance = new userModel(user);
		userInstance.save((err)=>{
			if(err){
				console.log(err);
				res.send('Error while saving the user');
			}
			else{
				
				res.send({

					url:'',
					message:'saved successfully'
				});

			}
		});

}