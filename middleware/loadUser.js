var User = require('../models/user').User;

middleware = function(req, res, next) {
	req.user = res.locals.user = null;

	if (!req.session.user) return next();

	User.findById(req.session.user, function(err, user) {
		if (err) return next(err);

		req.user = res.locals.user = user;
		next();
	})
};

module.exports = middleware;