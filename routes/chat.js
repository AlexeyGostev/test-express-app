var express = require('express');
var path = require('path');
var router = express.Router();
var log = require('../libs/log.js')(module);

var checkAuth = require('../middleware/checkAuth');


router.get('/', checkAuth, function(req, res, next) {
	res.render('chat');
});

module.exports = router;

