/* user routes for  home pages */
const path = require("path");
const ex = require('express');
const router = ex.Router();


router.get('',(req,res)=>{
	res.json(
		global.constants.userSockets.map( soc => {
			return {
				username: soc.username,
				socket: soc.socketHandle.id
			}
		})
	);
});
/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/'};
