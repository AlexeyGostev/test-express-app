var express = require('express');
var path = require('path');
var router = express.Router();

var log = require('../libs/log.js')(module);

router.get('/', function(req, res, next) {
	res.render('index');

});

module.exports = router;