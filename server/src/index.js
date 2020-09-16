const ex = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

global.constants = require(path.join(__dirname,'lib','constants'))(__dirname);
const routesLib = require(global.constants.dir(['lib','routes']));


//data base connection
const mongoose = require('mongoose');
const mongoDB = `mongodb://db/${process.env.DATABASE}`;
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser:true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



const app = ex();
app.use(require('body-parser').json());
app.use(cors());
routesLib.loadRoutes(app); // load routes from route folder 

console.log(process.env.NODE_PORT);
app.listen(process.env.NODE_PORT,'0.0.0.0',() => {
	console.log('started');
});