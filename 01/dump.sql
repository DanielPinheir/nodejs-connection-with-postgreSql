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

--JOIN
SELECT b.id as id_book, b.name as book_name, b.gender,
b.publisher, b.publication_date, a.id as id_author,
a.name as author_name, a.age as author_age
FROM books b
JOIN authors a
ON b.author_id = a.id;