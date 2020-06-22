const fs = require('fs');
const path = require('path');


let dirnames = fs.readdirSync(global.constants.dir(['routes']));

let data = dirnames.map(d => d.substr(0,d.indexOf('.')))
		.map(dir => require(global.constants.dir(['routes',dir])));

module.exports = {loadRoutes: function(app){
	data.forEach(r =>app.use(r.base,r.router));
}};


