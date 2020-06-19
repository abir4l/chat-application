const mongo = require('mongodb').MongoClient
const mongoose = require('mongoose')
const url = 'mongodb://db/'+process.env.DATABASE
class Mongoose{

	static connect(){
		if(this.db) return;
		let mong = mongoose.connection;
		mong.on('error', console.error.bind(console, 'connection error:'));
		mongoose.connect(url, {useNewUrlParser: true});
		(function(that){
			mong.once('open', function() {
				that.db = mongoose;
				console.log('connected');
			});
		})(this);
	

	}
}
Mongoose.db = null
Mongoose.connect()
module.exports = {Mongoose}
