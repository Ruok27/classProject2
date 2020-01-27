'use strict';

let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let axios = require("axios");
let basename = path.basename(module.filename);
let env = "development";
let config = require(__dirname + '/../config/config.json')[env];
let db = {};

if (env == "production") {
	var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
		dialect: config.dialect
	});
} else if (env == "development") {
	var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
		dialect: config.dialect
	});
}

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach(function(file) {
		let model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
