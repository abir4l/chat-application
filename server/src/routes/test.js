/* user routes for  home pages */

const ex = require('express');
const { test } = require('../controller/testController');
const router = ex.Router();
const testController = require(global.constants.dir(['controller','testController']));


router.get('/socket',testController.test);
router.get('/handler',testController.constantsocket);
router.get('/mongo',testController.mongo);
router.get("/handshake",testController.handshake);

/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/test'};
