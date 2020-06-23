/* user routes for  authentications */

const ex = require('express');
const path = require('path');
const userController = require(global.constants.dir(['controller','userController']));
const router = ex.Router();


//login controller
router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/check',userController.checkPassword);


/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/user'};
