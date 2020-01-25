require('dotenv').config();
let jwt = require('jsonwebtoken');
let db = require('../models');

module.exports = function(app) {
	// // Log-in and Authentication
	app.post('/login', function(req, res) {
		db.Users.findAll(req.params).then(function(dbUsers) {
			const username = req.body.username;
			const user = { name: username };
			for (i = 0; i < db.User.length; i++) {
				if ((username = db.User[i].username)) {
					res.render('login', {
						msg: 'Welcome!'
					});
				} else {
					res.sendStatus(400);
				}
			}
		});
	});

	//Sign-up
	app.post('/users', function(req, res) {
		let user = { username: req.body.username, password: req.body.password };
		console.log(user);
		db.Users.create({ user }).then(function(dbUsers, err) {
			if (err) {
				res.status(400).send('Error in insert new record');
			} else if (dbUsers) {
				res.status(201).render('login', {});
			} else {
				res.status(500).send();
			}
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
