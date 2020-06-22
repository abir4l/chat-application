/* user routes for  home pages */

const ex = require('express');
const router = ex.Router();

router.get('',(req,res)=>{
	res.send(global.basePath);
});



module.exports = {router: router,base:'/'};
