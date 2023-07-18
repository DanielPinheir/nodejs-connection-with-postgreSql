const express = require("express");

const pool = require("./connection");

const app = express();

//middleware
app.use(express.json());

//routes
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

    const querySelectAuthors = `
      SELECT * FROM authors;
    `;

    const authors = await pool.query(querySelectAuthors);

    return res.json(authors.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
