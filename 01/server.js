const express = require("express");

const pool = require("./connection");

const app = express();

//middleware
app.use(express.json());

//ROUTES
//GET
app.get("/author/:id", async (req, res) => {
  const idAuthor = req.params.id;

  try {
    const result = await pool.query(
      "SELECT authors.id, authors.name, authors.age, books.id as book_id, books.name as book_name, books.gender, books.publisher, books.publication_date FROM authors LEFT JOIN books ON authors.id = books.author_id WHERE authors.id = $1",
      [idAuthor]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    const author = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      age: result.rows[0].age,
      books: [],
    };

    for (const row of result.rows) {
      if (row.book_id) {
        const book = {
          id: row.book_id,
          name: row.book_name,
          gender: row.gender,
          publisher: row.publisher,
          publication_date: row.publication_date,
        };
        author.books.push(book);
      }
    }

    if (author.books.length === 0) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    res.json(author);
  } catch (error) {
    console.error("Error when searching for author:", error);
    res.status(500).json({ message: "Error when searching for author." });
  }
});

app.get("/book", async (req, res) => {
  try {
    const booksAndAuthorJoin = `
    SELECT b.id as id_book, b.name as book_name, b.gender,
    b.publisher, b.publication_date, a.id as id_author,
    a.name as author_name, a.age as author_age
    FROM books b
    JOIN authors a
    ON b.author_id = a.id; 
    `;

    const booksAndAuthorDatabase = (await pool.query(booksAndAuthorJoin)).rows;

    const booksAndAuthor = booksAndAuthorDatabase.map((book) => {
      if (book.id_book) {
        const bookRecord = {
          id: book.id_book,
          name: book.book_name,
          gender: book.gender,
          publisher: book.publisher,
          publication_date: book.publication_date,
          author: {
            id: book.id_author,
            name: book.author_name,
            age: book.author_age,
          },
        };
        return bookRecord;
      }
    });

    return res.json(booksAndAuthor);
  } catch (error) {
    console.error(error.message);
  }
});

//POST
app.post("/author", async (req, res) => {
  const { name, age } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "The name field is required.",
    });
  }

  try {
    const queryInsertAuthor = `
      INSERT INTO authors (name, age)
      VALUES ($1, $2);
    `;

    const paramsAuthor = [name, age];

    await pool.query(queryInsertAuthor, paramsAuthor);

    const queryAuthors = `
      SELECT * FROM authors;
    `;

    const authors = await pool.query(queryAuthors);

    return res.json(authors.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/author/:id/book", async (req, res) => {
  const idAuthor = req.params.id;
  const { name, gender, publisher, publication_date } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "The name field is required.",
    });
  }

  try {
    const bookRegister = await pool.query(
      `
        INSERT INTO books 
        (name, gender, publisher, publication_date, author_id) 
        VALUES ($1, $2, $3, $4, $5)
      `,
      [name, gender, publisher, publication_date, idAuthor]
    );

    const books = (await pool.query("SELECT * FROM books;")).rows;

    const book = {
      id: books[books.length - 1].id,
      ...req.body,
    };

    return res.json(book);
  } catch (error) {
    console.error(error.message);
  }
});

//SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
