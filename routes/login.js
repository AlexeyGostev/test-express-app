var express = require('express');
var path = require('path');
var router = express.Router();
var log = require('../libs/log.js')(module);

var User = require('../models/user.js').User;
var HttpError = require('../error').HttpError;

router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne( {username: username}, function(err, user) {
		if (err) return next(err);

		if (user) {
			if (user.checkPassword(password)) {
				req.session.user = user._id;
				res.send({});
			} else {
				return next(new HttpError(403, 'Пароль неверен'));
			}
		} else {
			user = new User({username: username, password: password})
			req.session.user = user._id;
			user.save(function(err) {
				if (err) return next(err);
			});
			res.send({});
		}
	})
});

module.exports = router;