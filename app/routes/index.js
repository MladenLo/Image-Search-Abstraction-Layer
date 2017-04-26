//Loading modules
var express = require('express');

var router = express.Router();

//Loading controllers
var indexController = require('../controllers/indexController');

//Routes
router.get('/', indexController.index);
router.get('/search/:searchParam', indexController.searchHandle);
router.get('/history', indexController.historyHandle);

module.exports = router;