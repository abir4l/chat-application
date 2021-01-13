/* user routes for  home pages */

const ex = require('express');
const router = ex.Router();


router.get('',(req,res)=>{
	res.send(JSON.stringify(global.constants.message));
});


/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/'};
