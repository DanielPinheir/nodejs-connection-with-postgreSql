![](https://i.imgur.com/xG74tOh.png)

# Challenge 01

## API implementation for Library systems

Congratulations... You have been selected to work on an API project for a library system. Following all the requirements below, make the appropriate implementations of the API.

_It is necessary to carry out all the necessary validations to avoid errors in the database_

The API needs to connect to a `postgreSQL` database called `library` and all table creation code must be placed in the `dump.sql` file

1 - Implement a table called `authors` containing the following characteristics:

- A unique author identifier as a primary key and auto increment;
- The name (mandatory)
- The age

2 - Implement in the API the functionality of registering an author in the database following the specifications below::

`POST /author`

Input example

```
{
    "name": "Guido Cerqueira",
    "age": 32
}
```

Output example

```
{
    "id": 1
    "name": "Guido Cerqueira",
    "age": 32
}
```

or

```
{
    "message": "The name field is required."
}
```

3 - Implement the functionality to search for an author in the database through its unique identifier, following the specifications below:

`GET /author/:id`

Output example

```
{
    "id": 1
    "name": "Guido Cerqueira",
    "age": 32
}
```

or

```
{
    "message": "Author not found"
}
```

4 - Implement a table called `books` containing the following characteristics:

- A unique book identifier as a primary and auto-incrementing key;
- The name (obrigatório)
- The gender
- The publisher
- The publication date in the format `YYYY-MM-DD`
- The identifier of the author responsible for the book

5 - Implement the functionality of registering a book for an author in the database following the specifications below:

`POST /author/:id/book`

Input example

```
{
	"name": "Backend PHP",
	"gender": "Programação",
	"publisher": "Cubos Academy",
	"publication_date": "2020-10-18"
}
```

Output example

```
{
	"id": 2,
	"name": "Backend PHP",
	"gender": "Developer",
	"publisher": "Cubos Academy",
	"publication_date": "2020-10-18"
}
```

or

```
{
    "message": "The name field is required."
}
```

6 - The endpoint for searching for an author must be changed so that when detailing the author, bring up the list of registered books.

Output example

```
{
    "id": 1,
    "name": "Guido Cerqueira",
    "age": 32,
    "books": [
        {
            "id": 1,
            "name": "Backend Nodejs",
            "gender": "Developer",
            "publisher": "Cubos Academy",
            "publication_date": "2018-06-10"
        },
        {
            "id": 2,
            "name": "Backend PHP",
            "gender": "Developer",
            "publisher": "Cubos Academy",
            "publication_date": "2020-10-18"
        }
    ]
}
```

or

```
{
    "message": "book not found"
}
```

Obs.: You should implement this functionality using the `JOIN` clause.

7 - Implement the functionality to list the books registered in the database, with their author information, following the specifications below:

`GET /book`

Output example

```
[
    {
        "id": 1,
        "name": "Backend Nodejs",
        "gender": "Developer",
        "publisher": "Cubos Academy",
        "publication_date": "2018-06-10",
        "author": {
            "id": 1
            "name": "Guido Cerqueira",
            "age": 32
        }
    },
    {
        "id": 2,
        "name": "Backend PHP",
        "gender": "Developer",
        "publisher": "Cubos Academy",
        "publication_date": "2020-10-18",
        "author": {
            "id": 1
            "name": "Guido Cerqueira",
            "age": 32
        }
    }
]
```

or

```
[]
```

Obs.: You should implement this functionality using the `JOIN` clause.

And finally the job will be delivered and another mission will be accomplished. Congratulations!!!

---



###### tags: `challenge` `nodejs` `database` `sql` `postgres`
