const ex = require('express')
const fs = require('fs') 
const { Connection } = require('./database/db.js')
const { Mongoose } = require('./database/mongoose.js')
const bodyParser = require('body-parser')


//to be changed to a library reading env filee

const app = ex();
app.use(bodyParser.json())

app.post('/post-check',(req,res)=>{
	
	res.send(req.body.data);

});
app.get('/check',(req,res) => {
	res.send('route added')
});

app.get('/',(req,res) => {
	res.send('hello world')
});

// env passed from docker
app.listen(process.env.NODE_PORT,'0.0.0.0',() => {
	console.log('started')
})
