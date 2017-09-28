var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var logger = require('morgan');
var reactViews = require('express-react-views');
var sendHttpError = require('./middleware/sendHttpError');
var HttpError = require('./error').HttpError;
var log = require('./libs/log.js')(module);
var session = require('express-session');
var mongoose = require('./libs/mongoose.js');
var MongoStore = require('connect-mongo')(session);


var app = express();

var index = require('./routes/index');
var login = require('./routes/login');
//var users = require('./routes/users');


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jsx');
//app.engine('jsx', reactViews.createEngine());

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(session({
  secret : config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(sendHttpError);

//

//app.use(function(req, res, next) {
//  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
//  res.send('Visits: '  + req.session.numberOfVisits);
//});

//


app.use('/', index);
app.use('/login', login);

app.use(function(req, res, next) {
  next(404);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (typeof err === 'number') {
  	err = new HttpError(err);
  }

  if (err instanceof HttpError) {
  	res.sendHttpError(err);
  }	else {
  		log.error(err);
  		err = new HttpError(500);
  		res.sendHttpError(err);
  }
});

module.exports = app;
