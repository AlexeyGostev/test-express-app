log = require('../libs/log.js')(module);

middleware = function(req, res, next) {
	res.sendHttpError = function(error) {
		
		res.status(error.status);
		if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
			res.json(error);
		} else {
			res.render('error', {error : error});
		}
	};

	next();
};

module.exports = middleware;