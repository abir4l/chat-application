const fs = require('fs');
const path = require('path');


let dirnames = fs.readdirSync(path.join(global.basePath,'routes'));

let data = dirnames.map(d => d.substr(0,d.indexOf('.')))
		.map(dir => require(path.join(global.basePath,'routes',dir)));

module.exports = {loadRoutes: function(app){
	data.forEach(r =>app.use(r.base,r.router));
}};

