const bookService = require("../services/bookService");

exports.createBook = (req, res, next) => {
  // dois-je parser req.body.book ? Postman me renvoie une erreur si je le fais
  // const bookObject = JSON.parse(req.body.book);
  // dois-je supprimer _id ?
  delete req.body._id;
  // il semble que ca ne supprime pas userId - essaye Postman mais d'abord commente userId dans bookService
  delete req.body.userId;
  // delete req.body.ratings;
  bookService
    .createBook(req.body.book, req.auth)
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
    .modifyBook(req.params.id, req.body.book)
    .then(() => res.status(200).json({ message: "Book updated!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  bookService
    .deleteBook(req.params.id)
    .then(() => res.status(200).json({ message: "Book deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};
