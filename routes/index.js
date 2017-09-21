var express = require('express');
var path = require('path');
var router = express.Router();


router.get('/', function(req, res, next) {
	req.headers['if-none-match'] = 'no-match-for-this';
	res.render('index');
});

module.exports = router;