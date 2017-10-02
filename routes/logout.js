var express = require('express');
var path = require('path');
var router = express.Router();
var log = require('../libs/log.js')(module);

router.post('/', function(req, res, next) {
	req.session.destroy();
	res.send({});
});

module.exports = router;