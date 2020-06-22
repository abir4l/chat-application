global.basePath = __dirname;
const ex = require('express');
const path = require('path');
const constants = require(path.join(global.basePath,'lib','constants'))();
const routesLib = require(path.join(global.basePath,'lib','routes'));


const { Connection } = require(path.join(global.basePath,'database','db'));
const { Mongoose } = require('./database/mongoose.js');


const app = ex();

app.use(require('body-parser').json());
routesLib.loadRoutes(app); // load routes from route folder 

app.listen(process.env.NODE_PORT,'0.0.0.0',() => {
	console.log('started');
});
