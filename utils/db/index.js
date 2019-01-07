const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connection = mongoose.connect('mongodb://localhost/ecom', { useNewUrlParser: true });

connection
	.then(db => {
		console.log(
			`Successfully connected to  MongoDB.`,
		);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			console.log('Attempting to re-establish database connection.');
			mongoose.connect('mongodb://localhost/ecom');
		} else {
			console.error('Error while attempting to connect to database:');
			console.error(err);
		}
	});

module.exports.connection = connection;
