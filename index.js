const ex = require('express')

const app = ex();

app.get('/test',(req,res) => {
 res.send('hello world')
});

app.listen(8000,'0.0.0.0',() => {
	console.log('started')
})
