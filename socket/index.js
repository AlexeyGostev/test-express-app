var log = require('../libs/log.js')(module);
var session = require('express-session');
var config = require('../config');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var HttpError = require('../error').HttpError;
var sessionStore = require('../libs/sessionStore');
var User = require('../models/user.js').User;

module.exports = function(server) {
	var io = require('socket.io')(server); // create ws
	io.set('origins', '*:3000');
	io.set('logger', log);

	/*io.set('authorization', function(handshake, callback) {
		new Promise(function(resolve, reject) {
			log.info('start promise');
			var parser = cookieParser(config.get('session:secret'));
			parser(handshake, {}, function(err) {
				log.info('start parser');

				if (err) reject(new Error);	

				var sid = handshake.signedCookies[config.get('session:key')];
				sessionStore.load(sid, function(err, session) {
					log.info('start load');
					if (arguments.length == 0) {
						resolve(null);
					} else {
						resolve(session);
					}
				});
			});	
		})
			.then(function(session){
				log.info('session ' + session);
				if (!session) {
					return new HttpError(401, "No session");
				}

				handshake.session = session;
				if (!session.user) {
					return null;
				}

				User.findById(session.user, function(err, user) {
					log.info('start findbyid');

					if (err) return err;
					if (!user) {
						return new HttpError(403, "Anonymous session may not connect");
					}
					log.info('done----------------');
					handshake.user = user;	
					//log.info(user);
					callback(null, true);
				});
			})
			.catch(function(err){
				log.error(err);
				if (err instanceof HttpError) {
					return callback(null, false);
				}

				callback(err);
			});	

			//handshake.cookies = cookie.parse(handshake.headers.cookie || '');
			//log.info(handshake.cookies);
			//var sidCookie = handshake.cookies[config.get('session:key')];
			//log.info(sidCookie);

			//var sid = connect.utils.parseSignedCookie(sidCookie, config.get('session:secret'));
			//var sid = connect.utils.parseSignedCookie(sidCookie, config.get('session:secret'));
			//log.info(sid);

	})*/

	io.use(function(socket, next) {
		var handshake = socket.handshake;

		new Promise(function(resolve, reject) {
			var parser = cookieParser(config.get('session:secret'));
			parser(handshake, {}, function(err) {

				if (err) reject(new Error);	

				var sid = handshake.signedCookies[config.get('session:key')];
				sessionStore.load(sid, function(err, session) {
					if (arguments.length == 0) {
						resolve(null);
					} else {
						resolve(session);
					}
				});
			});	
		})
			.then(function(session){
				if (!session) {
					return new HttpError(401, "No session");
				}

				handshake.session = session;
				if (!session.user) {
					return null;
				}

				User.findById(session.user, function(err, user) {
					if (err) return err;
					if (!user) {
						return new HttpError(403, "Anonymous session may not connect");
					}
					handshake.user = user;	
					//log.info(user);
					next();
				});
			})
			.catch(function(err){
				log.error(err);
				next(err);
			});	
	});

	io.on('session:reload', function(sid) {
		var clients = io.sockets.sockets;

		/*clients.forEach(function(client) {
			if (client.handshake.session.id != sid) return;
				sessionStore.load(sid, function(err, session) {
					if (err) {
						client.emit('error', 'server error');
						client.disconnect();
						return;
					}
					if (!session) {
						client.emit('error', 'hadshake unauthorized');
						client.disconnect();
						return;
					} 

					client.handshake.session = session;
				});

		});*/
		for (var c in clients) {
			//console.log(clients[client].handshake);
			var client = clients[c];
			console.log(client.handshake.session.id);
			console.log(sid);
			if (client.handshake.session.id != sid) return;
			sessionStore.load(sid, function(err, session) {
				if (err) {
					client.emit('error', 'server error');
					client.disconnect();
					return;
				}
				if (!session) {
					client.emit('logout');
					client.disconnect();
					return;
				} 

				client.handshake.session = session;
			});	
		}
	});

	io.on('connection', function(socket) {
		console.log(socket.handshake.user.username);
		var username = socket.handshake.user.username;

		socket.broadcast.emit('join', username);

	 	socket.on('message', function(text, cb) {
	    	socket.broadcast.emit('message', username, text);
	    	cb && cb();
	  	});

	  	socket.on('disconnect', function() {
	  		socket.broadcast.emit('leave', username);
	  	})
	});

	return io;
};