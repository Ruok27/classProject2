let db = require("../models");
//var path = require("path");

module.exports = function(app) {

  // ROOT page
  app.get("/", function(request, response) {
    response.render("index", {
    });
  });

  app.get("/signup", function(request, response) {
    response.render("signup", {
    });
  });

  app.get("/signin", function(request, response) {
    response.render("login", {
    });
  });

  app.get("/game", function(request, response) {
    response.render("game", {
    });
  });

  app.get("/score", function(request, response) {
    response.render("score", {
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(request, response) {
    response.render("404");
  });
};