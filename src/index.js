const ex = require('express')
const fs = require('fs') 
const mongo = require('mongodb').MongoClient
const url = 'mongodb://db:' + process.env.MONGO_PORT


//to be changed to a library reading env filee

const app = ex();

app.get('/mongo',(req,res) => {

	mongo.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
}, (err, client) => {
	if (err) {
		console.error('error')
	}
	else
		console.log('connected to mongo')
	});

	res.send('mongo checking')

});

app.get('/check',(req,res) => {
	res.send('route added')
});


app.get('/',(req,res) => {
	res.send('hello world')
});

app.listen(process.env.NODE_PORT,'0.0.0.0',() => {
	console.log('started')
})
