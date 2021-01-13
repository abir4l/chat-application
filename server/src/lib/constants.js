const path = require('path');
/**
 *
 * @param dirname
 * @returns {{bycrypt_value: number, dir: (function(*=): string)}}
 */
module.exports =  function(dirname,socket){

	let obj =  {

		//utility method to get userPath easily
		dir : function(userPath){
			let  paths = [dirname];
				paths = paths.concat(userPath);
				return path.join.apply(null, paths);

		},
		bycrypt_value : 5,
		message:'From constants',
		socketHandler:socket,
		userSockets:[],
		mongoConnection:null
					
	};
	
	//constants here
	function database(collectionName){
		return obj.mongoConnection.db(process.env.DATABASE)
		.collection(collectionName);
	}
	

	obj.database = database;
	return obj;
	
};