/* user routes for  authentications */

const ex = require('express');
const path = require('path');
const userController = require(global.constants.dir(['controller','userController']));
const { withJWTAuthMiddleware } = require("express-kun");
const router = ex.Router();

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

//login controller
router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/check',userController.checkPassword);

protectedRouter.get("/details", userController.getDetails);

/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/user'};