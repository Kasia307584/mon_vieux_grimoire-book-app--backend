const bookService = require("../services/bookService");

exports.createBook = (req, res, next) => {
  delete req.body._id;
  bookService
    .createBook(req.body)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllBooks = (req, res, next) => {
  bookService
    .getAllBooks()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneBook = (req, res, next) => {
  bookService
    .getOneBook(req.params.id)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.modifyBook = (req, res, next) => {
  bookService
    .modifyBook(req.params.id, req.body)
    .then(() => res.status(200).json({ message: "Book updated!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  bookService
    .deleteBook(req.params.id)
    .then(() => res.status(200).json({ message: "Book deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
