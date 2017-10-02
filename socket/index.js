var log = require('../libs/log.js')(module);


module.exports = function(server) {
	var io = require('socket.io')(server); // create ws
	io.set('origins', '*:3000');
	io.set('logger', log);

	io.on('connection', function(socket) {
	  
	  socket.on('message', function(text, cb) {
	    socket.broadcast.emit('message', text);
	    cb();
	  });
	});
};