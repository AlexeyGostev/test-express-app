var express = require('express');
var path = require('path');
var router = express.Router();
var log = require('../libs/log.js')(module);


router.post('/', function(req, res, next) {
	var io = req.app.get('io');
	sid = req.session.id;

	req.session.destroy(function(err) {
		io.sockets._events['session:reload'](sid);
		if (err) return next(err);
		res.send({});
	});
});

module.exports = router;