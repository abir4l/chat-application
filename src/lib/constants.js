const path = require('path');
module.exports =  function(dirname){

	
	
	//constants here

	return {

		dir : function(userPath){
			let  paths = [dirname];
				paths = paths.concat(userPath);
				return path.join.apply(null, paths);

		},

		bycrypt_value : 5
					
	}
	
};