
var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlOthers = require('../controllers/others');
var ctrlAdmin = require('../controllers/admin');


/* Main pages */
router.get('/', ctrlMain.homelist);
router.get('/admin', ctrlAdmin.admin);


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
