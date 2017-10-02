var HttpError = require('../error').HttpError;

var middleware = function(req, res, next) {
	if (!req.session.user) {
		return next(new HttpError(401, "Вы не авторизованы"));
	}

	next();
};

module.exports = middleware;