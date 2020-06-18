const ex = require('express')
const fs = require('fs') 


//to be changed to a library reading env filee
data = fs.readFileSync('.env',{ encoding:'utf-8',flag:'r' })
env = data.split('\n').filter(data=>data.indexOf('=') >= 0).reduce((sum,val)=>{
	arr = val.split('=');
	sum[arr[0]] = arr[1];
	return sum;
},{});



const app = ex();

app.get('/check',(req,res) => {
 res.send('route added')
});


app.get('/',(req,res) => {
 res.send('hello world')
});

app.listen(env.NODE_PORT,'0.0.0.0',() => {
	console.log('started')
})
