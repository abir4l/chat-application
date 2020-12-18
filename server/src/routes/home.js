/* user routes for  home pages */

const ex = require('express');
const router = ex.Router();


router.get('',(req,res)=>{
	res.send(global.constants);
});


/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/'};
