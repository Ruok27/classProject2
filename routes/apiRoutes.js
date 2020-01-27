require('dotenv').config();
let jwt = require('jsonwebtoken');
let db = require('../models');

module.exports = function(app) {

	// POST /users
	app.post('/api/users', function(request, response) {
		const { username, password } = request.body;
		const user = { username, password };
		db.Users.create(user).then(function(dbUsers, err) {
			if (err) return response.status(400).send('Error in insert new record');
			return response.redirect(301, '/signin');
		});
	});

	// POST /login
	app.post('/api/login', function(request, response) {
		const errorMessage = encodeURI('Invalid username and/or password');
		const { username, password } = request.body;
		db.Users.findOne({ where: { username } }).then(
			function(userExist) {
				if (userExist && userExist.hasOwnProperty('dataValues')) {
					const { dataValues } = userExist;
					if (dataValues.password === password) {
						return response.redirect(301, '/game');
					}
				} else {
					return response.redirect(301, `/signin?error=true&errorMessage=${errorMessage}`); // User do not exist
				}
			},
			function(error) {
				return response.redirect(301, `/signin?error=true&errorMessage=${errorMessage}`); // User do not exist
			}
		);
	});

	// GET /messages
	app.get('/api/getmessages', function(request, response) {
		db.Messages.findAll({}).then(function(dbMessages) {
			response.json(dbMessages);
		});
	});


	// GET /scores
	app.get('/api/getscores', function(request, response) {
		db.Scores
			.findAll({})
			.then(function(dbScores) {
				response.json(dbScores);
			});
	});

	// Post to Scores db
	app.post('/api/postscores', function(request, response) {
		const { score } = request.body;
		const newScore = { score };
		db.Scores.create(newScore).then(function(dbScores, err) {
			if (err) return response.status(400).send('Error in insert new record');
			return response.redirect(301, '/score');
		});
	});
};
