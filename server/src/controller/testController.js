
exports.test = function(req,res){

	let handler = global.constants.userSockets.find(
		d => d.username == req.query.to
	);
	
	let message = req.query.message ?	req.query.message : 'from socket';
	global.constants.socketHandler.of(req.query.to).emit("testingsocket",message);
	// handler.socketHandle.emit("testingsocket",message);
	// socketHandler.emit("test",message);
	res.send({
		message:"sending data to socket"
	})   	
   
}

exports.handshake = function(req,res){
	res.json({"message":"connected"});
}
exports.constantsocket = function(req,res){
	let reciever = req.query.to;
	global.constants.socketHandler.of(reciever).emit("testingsocket","message");
	res.send("message sent");
}
exports.mongo = async function(req,res){
	let mongo = global.constants.mongoConnection;
	
	let user = await global.constants.database("users").findOne({email:"test@test.com"});
	res.send(user);

	// res.send("mongo testing here");
}

