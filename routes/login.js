var express = require('express');
var path = require('path');
var router = express.Router();
var log = require('../libs/log.js')(module);

var User = require('../models/user.js').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../error').AuthError;


router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.authorize(username, password, function(err, user) {
		if (err) {
			if (err instanceof AuthError) {
				return next(new HttpError(403, err.message));
			} else {
				return next(err);
			}
		}
		
		req.session.user = user._id;
		res.send({});
	})
});

module.exports = router;