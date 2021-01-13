const ex = require('express');
const path = require('path');
const cors = require('cors');
const httpServer = require('http');
const ioServer = require('socket.io');
const { MongoClient } = require('mongodb');
const { connection } = require('mongoose');

require('dotenv').config();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};



//data base connection
// const mongoose = require('mongoose');
// const mongoDB = `mongodb://db/${process.env.DATABASE}`;
// mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser:true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));



const app = ex();
app.use(require('body-parser').json());
app.use(cors());


const nodeServer = httpServer.createServer(app);

var whitelist = ['http://localhost:4545', 'http://localhost:8080']

const socketIo = ioServer(nodeServer,{
	cors: {
	    origin: function(origin,callback){
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			  } else {
				callback(new Error('Not allowed by CORS'))
			  }
		},
	    methods: ["GET", "POST"]
	  }
});





// passing source path and sockethandler to constants
global.constants = require(path.join(__dirname,'lib','constants'))(__dirname,socketIo); 

const routesLib = require(global.constants.dir(['lib','routes']));
routesLib.loadRoutes(app); // load routes from route folder 
console.log(`server running on port ${process.env.NODE_PORT}`);
nodeServer.listen(process.env.NODE_PORT,'0.0.0.0', async () => {
	let connection = MongoClient.connect("mongodb://db/");
	global.constants.mongoConnection = await connection;
});

