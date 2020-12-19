/* user routes for  home pages */

const ex = require('express');
const router = ex.Router();
const testController = require(global.constants.dir(['controller','testController']));


router.get('/socket',testController.test);
router.get('/mongo',testController.mongo);


/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/test'};
