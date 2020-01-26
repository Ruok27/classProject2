var db = require("../models");
//var path = require("path");

module.exports = function(app) {
  // Load index page
  //app.get("/", function(req, res) {
  //    res.sendFile(path.join(__dirname,"../public/login.html"));
  //});

  // ROOT page
  app.get("/", function(req, res) {
    res.render("index", {
    });
  });

  app.get("/signin", function(req, res) {
    res.render("login", {
    });
  });

  app.get("/signup", function(req, res) {
    res.render("signup", {
    });
  });

  app.get("/game", function(req, res) {
    res.render("game", {
    });
  });

    app.get("/score", function(req, res) {
      res.render("score", {
      });
    });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};