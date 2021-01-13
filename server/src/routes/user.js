/* user routes for  authentications */

const ex = require('express');
const userController = require(global.constants.dir(['controller','userController']));

const { withJWTAuthMiddleware } = require("express-kun");
const router = ex.Router();

// different secret for refresh token route and access token route
const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_ACCESS_SECRET);
const refreshTokenRoute = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

//login controller
router.post('/login',userController.login);
protectedRouter.get('/list',userController.listUsers);
router.post('/register',userController.register);
protectedRouter.post('/chat/handshake',userController.setupChatSocket);
protectedRouter.post('/chat/send-message',userController.sendMessage);
protectedRouter.post('/chat/load-message',userController.loadMessage);
refreshTokenRoute.post('/access-token',userController.getAccessToken);
protectedRouter.post('/logout',userController.logout);
protectedRouter.get("/details", userController.getDetails);

/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/user'};
