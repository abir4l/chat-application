const ex = require('express')
const fs = require('fs') 
const { Connection } = require('./db.js')
const bodyParser = require('body-parser')


//to be changed to a library reading env filee

const app = ex();
app.use(bodyParser.json())

app.get('/mongo',(req,res) => {

	Connection.connect()
	.then(db =>{
			doc = db.db('chat');
			doc.collection('testData').find({}).toArray((err,result) =>{
				res.send(result)
	});
	}).catch(err =>{
			console.log(err)
	});

});

app.post('/post-check',(req,res)=>{
	Connection.connect()
	.then(db =>{
			doc = db.db('chat');
			obj = {'source':'api',data: req.body.data}
			doc.collection('testData')
			.insertOne(obj,(err,res)=>{
				if(err) throw err;
				console.log('inserted to database')
			});
	}).catch(err => {
			console.log(err);
	});
	res.send(req.body.data);

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
