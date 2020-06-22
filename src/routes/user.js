/* user routes for  authentications */

const ex = require('express');
const router = ex.Router();

router.get('/',(req,res)=>{
	res.send("user routes");
});


module.exports = {router: router,base:'/user'};
