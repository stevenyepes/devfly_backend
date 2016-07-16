
var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlOthers = require('../controllers/others');


/* Main pages */
router.get('/', ctrlMain.homelist);


/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
