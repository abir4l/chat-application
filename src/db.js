const mongo = require('mongodb').MongoClient
const url = 'mongodb://db:' + process.env.MONGO_PORT
class Connection{

	static connect(){
		if(this.db) return Promise.resolve(this.db);
		return mongo.connect(this.url,this.options)
		.then(db => { 
				this.db = db;
		});
	}
}
Connection.db = null
Connection.url = 'mongodb://db:' + process.env.MONGO_PORT;
Connection.options =  {
		useNewUrlParser: true,
		useUnifiedTopology: true
};

module.exports = {Connection}
