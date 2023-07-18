const express = require("express");

const pool = require("./connection");

const app = express();

//middleware
app.use(express.json());

//ROUTES

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
    console.log(error.message);
  }
});

//GET
app.get("/author/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const querySelectedAuthor = `
    SELECT * FROM authors
    WHERE id = $1;
  `;
    const selectedAuthor = (await pool.query(querySelectedAuthor, [id])).rows;

    if (selectedAuthor.length === 0) {
      return res.status(404).json({
        message: "Author not found.",
      });
    }
    return res.json(selectedAuthor);
  } catch (error) {
    console.log(error.message);
  }
});

//SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
