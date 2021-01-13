
exports.test = function(req,res){

	let socketHandler = global.constants.socketHandler;
	let handler = global.constants.userSockets.find(
		d => d.username == req.query.to
	);

	let message = req.query.message ?	req.query.message : 'from socket';
	handler.socketHandle.emit("message",message);

	socketHandler.emit("message",message);
	res.send({
		message:"sending data to socket"
	})   	
   
}

exports.mongo = async function(req,res){
	let mongo = global.constants.mongoConnection;
	// mongo
	// .db('chat')
	// .collection("users").find({}).toArray((er,result)=>{
	// 	console.log(result);
	// 	res.send(result);
	// });

	// let user = await mongo.db("chat")
	// .collection("users")
	// .findOne({email:"test@test.com"});


	let user = await global.constants.database("users").findOne({email:"test@test.com"});
	res.send(user);

	// res.send("mongo testing here");
}

exports.socketTest = function(req,res){
	
}
