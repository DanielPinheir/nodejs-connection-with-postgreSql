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

-- create table books
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  gender VARCHAR(100),
  publisher VARCHAR(100),
  publication_date DATE,
  author_id INTEGER REFERENCES authors(id)
);
