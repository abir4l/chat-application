/* user routes for  authentications */

const ex = require('express');
const userController = require(global.constants.dir(['controller','userController']));
const { withJWTAuthMiddleware } = require("express-kun");
const router = ex.Router();

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_ACCESS_SECRET);
const refreshTokenRoute = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

//login controller
router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/check',userController.checkPassword);
refreshTokenRoute.post('/access-token',userController.getAccessToken);

protectedRouter.get("/details", userController.getDetails);

/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/user'};
