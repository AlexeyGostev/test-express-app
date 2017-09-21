var mongoose = require('./libs/mongoose.js');
//var User = require('./models/user.js').User;


/*function createUser({username, password}) {
	return new Promise(function(resolve, reject) {
		var User = require('./models/user.js').User;
		var user = new User({username, password});
		user.save(function(err) { 
			if (err) reject(err);
			resolve();
		});
	});
};*/

function open() {
	return new Promise(function(resolve, reject) {
		mongoose.connection.on('open', resolve);
	});
};


function dropDatabase() {
	return new Promise(function(resolve, reject) {
		var db = mongoose.connection.db;
		db.dropDatabase(resolve);
	});
};


function createIndexes() {
	return new Promise(function(resolve, reject) {
		var User = require('./models/user.js').User;
		User.ensureIndexes(resolve);
	});
};

function createUsers() {
	var User = require('./models/user.js').User;

	var userPromises = [
		{username: 'vasya', password: 'supervasya'},
		{username: 'timalox', password: 'superpetya'},
		{username: 'lox', password: 'timalox'}
	].map(function(userData) {
		var user = new User(userData);
		return user.save();
	});

	var users = Promise.all(userPromises);

	return users;
	/*
	return new Promise(function(resolve, reject) {
		createUser({username: 'vasya', password: 'supervasya'})
				.then(function() {
					console.log('vasya добавлен');
					return createUser({username: 'petya', password: 'superpetya'});
				})
				.then(function() {
					console.log('petya добавлен');
					return createUser({username: 'timalox', password: 'timalox'});
				})
				.then(function() {
					console.log('timalox добавлен');
					resolve();
					//mongoose.disconnect();
				})
				.catch(function(err) {
					console.log(err);
					reject(err);
				});
	});
	*/
};

function disconnectDb() {
	return new Promise(function(resolve, reject) {
		mongoose.disconnect(resolve);
	});
};


function test() {
	open()
		.then(function(data) {
			//if (err) console.log(err);
			console.log('open: ' + data);
			return dropDatabase();
		})
		.then(function(data) {
			//if (err) throw err;
			console.log('dropDb: ' + data);
			return createIndexes();
		})
		.then(function(data) {
			//if (err) throw err;
			console.log('createIndexes: ' + data);
			return createUsers();
		})
		.then(function(data) {
			//if (err) throw err;
			console.log('createUsers: ' + data);
			return disconnectDb();
		})
		.then(function(data) {
			//if (err) throw err;
			console.log('disconnectDb: ' + data);
		})
		.catch(function(err) {
			console.log(err);
			mongoose.disconnect();
		});
};

test();

/*
mongoose.connection.on('open', function() {

	var db = mongoose.connection.db;
	db.dropDatabase(function(err) {
		if (err) throw err;

		()
			.then(function() {

				return createUsers();
			})
			.catch(function(err) {
				console.log(err);
			})
	});

});

*/





