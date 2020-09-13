/* user routes for  home pages */

const ex = require('express');
const router = ex.Router();
const testController = require(global.constants.dir(['controller','testController']));


router.get('',testController.test);


/**
 *
 * @type {{router: *, base: string}}
 */
module.exports = {router: router,base:'/test'};
