-- create database
create database library;

-- create author table
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT
);

-- insert author
INSERT INTO authors (name, age)
VALUES ("Guido Cerqueira", 32);