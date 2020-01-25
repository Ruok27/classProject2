require('dotenv').config();
let jwt = require('jsonwebtoken');
let db = require("../models");
let bodyParser = require('body-parser')
let express = require("express");
​
module.exports = function(app) {
​
  let refreshTokens = [];
​
	// // Log-in and Authentication
	app.post('/login', authenticateToken, function(req, res) {
  
		db.Users.findAll(req.params).then(function(dbUsers) {
      const username = req.body.username;
      const user = { name: username };
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
			res.json(dbUsers);
			res.json({ accessToken: accessToken, refreshToken: refreshToken });
		});
	});
​
  // // Refreshes jwt token
	// app.post('/token', (req, res) => {
	// 	const refreshToken = req.body.token;
	// 	if (refreshToken == null) return res.sendStatus(401);
	// 	if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
	// 	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
	// 		if (err) return res.sendStatus(403);
	// 		const accessToken = generateAccessToken({ name: user.name });
	// 		res.json({ accessToken: accessToken });
	// 	});
	// });
​
  // // Deletes jwt token on logout
	// app.delete('/logout', (req, res) => {
	// 	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	// 	res.sendStatus(204);
	// });
​
  //Sign-up
  app.post('/users', function(req, res) {
    let user = { username: req.body.username, password: req.body.password }
    db.Users.create({ user }).then(function (dbUsers, err) {
      if (err) {
        res.status(400).send('Error in insert new record');
      } else if (dbUsers) {
        res.json(dbUsers).status(201).send().render("login", {
        })
      } else {
        res.status(500).send();
      }
    });
  })
​
	app.get('/posts', authenticateToken, function(req, res) {
		res.json(posts.filter((post) => post.username === req.user.name));
  });
  
  // Grab messages
	app.get('/game', function(req, res) {
		db.Messages.findAll().then(function(dbMessages) {
			res.json(dbMessages);
		});
  });
​
  // Grab highscores
	app.get('/scores', function(req, res) {
		db.Scores.findAll().then(function(dbScores) {
			res.json(dbScores);
		});
  });
  
  // Post to highscores
	app.post('/api/scores', function(req, res) {
		try {
      db.Scores.create(req.body).then(function(dbScores) {
      if (err) {
        res.status(400).send('Error in insert new record');
      } else {
        res.status(201).send()
        res.render("score", {
        });
      }
      });
    } catch {
        res.status(500).send()
      }
    });
​
  function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  }
​
	function authenticateToken(req, res, next) {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (token == null) {
			return res.sendStatus(401);
		}
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, user) {
			if (err) return res.sendStatus(403);
			req.user = user;
			next();
		});
	}


