const path = require('path');
/**
 *
 * @param dirname
 * @returns {{bycrypt_value: number, dir: (function(*=): string)}}
 */
module.exports =  function(dirname){

	
	//constants here

	return {

		dir : function(userPath){
			let  paths = [dirname];
				paths = paths.concat(userPath);
				return path.join.apply(null, paths);

		},
		bycrypt_value : 5,
		message:'From constants'
					
	}
	
};