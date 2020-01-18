-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS treasure;
-- Creates the "blogger" database --
CREATE DATABASE treasure;

USE treasure;

CREATE TABLE users (
	user_id INTEGER(20) AUTO_INCREMENT NOT NULL, 
    username VARCHAR(30) NOT NULL,
	password VARCHAR(30) NOT NULL, 
    PRIMARY KEY (user_id)
);

