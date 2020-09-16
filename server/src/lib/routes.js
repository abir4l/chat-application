const fs = require('fs');
const path = require('path');


let dirnames = fs.readdirSync(global.constants.dir(['routes']));

let data = dirnames.filter(d=>(d.indexOf('swp') == -1)) // removing vim files while editing
            .map(d => d.substr(0,d.indexOf('.')))
		    .map(dir => require(global.constants.dir(['routes',dir])));

/**
 *
 * @type {{loadRoutes: loadRoutes}}
 */
module.exports = {loadRoutes: function(app){
	data.forEach(r =>app.use(r.base,r.router));
}};


