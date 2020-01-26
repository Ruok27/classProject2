require('dotenv').config();
let jwt = require('jsonwebtoken');
let db = require('../models');

module.exports = function(app) {
	
	// POST /login
	app.post('/login', function(request, response) {
		const errorMessage = encodeURI('Invalid username and/or password');
		const { username, password } = request.body;
		db.Users.findOne({ where: { username } }).then(function(userExist) {
			if (userExist && userExist.hasOwnProperty('dataValues')) {
				const { dataValues } = userExist;
				if (dataValues.password === password) {
					return response.redirect(301, '/game');
				}
			} else {
				return response.redirect(301, `/signin?error=true&errorMessage=${errorMessage}`); // User do not exist
			}
		}, function(error) {
			return response.redirect(301, `/signin?error=true&errorMessage=${errorMessage}`); // User do not exist
		});
	});

	// POST /users
	app.post('/users', function(request, response) {
		const { username, password } = request.body;
		const user = { username, password };
		db.Users.create(user).then(function(dbUsers, err) {
			if (err) return response.status(400).send('Error in insert new record');
			return response.redirect(301, '/login');
		});
	});























	// 	app.get('/posts', authenticateToken, function(req, res) {
	// 		res.json(posts.filter((post) => post.username === req.user.name));
	//   });

	//   // Grab messages
	// 	app.get('/game', function(req, res) {
	// 		db.Messages.findAll().then(function(dbMessages) {
	// 			res.json(dbMessages);
	// 		});
	//   });

	//   // Grab highscores
	// 	app.get('/scores', function(req, res) {
	// 		db.Scores.findAll().then(function(dbScores) {
	// 			res.json(dbScores);
	// 		});
	//   });

	// Post to highscores
	// 	app.post('/api/scores', function(req, res) {
	// 		try {
	//       db.Scores.create(req.body).then(function(dbScores) {
	//       if (err) {
	//         res.status(400).send('Error in insert new record');
	//       } else {
	//         res.status(201).send()
	//         res.render("score", {
	//         });
	//       }
	//       });
	//     } catch {
	//         res.status(500).send()
	//       }
	//     });
	// ​

	// 	function generateAccessToken(user) {
	// 		return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
	// 	}
	// ​
	// 	function authenticateToken(req, res, next) {
	// 		const authHeader = req.headers['authorization'];
	// 		const token = authHeader && authHeader.split(' ')[1];
	// 		if (token == null) {
	// 			return res.sendStatus(401);
	// 		}
	// 		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
	// 			if (err) return res.sendStatus(403);
	// 			req.user = user;
	// 			next();
	// 		});
};
