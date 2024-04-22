const bookService = require("../services/bookService");
const Book = require("../models/Book");

exports.createBook = (req, res, next) => {
  bookService
    .createBook(req)
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
    .modifyBook(req)
    .then(() => res.status(200).json({ message: "Book updated!" }))
    .catch((error) => {
      if (error.message === "403: unauthorized request") {
        res.status(403).json({ message: "403: unauthorized request" });
      } else {
        res.status(400).json({ error });
      }
    });
};

exports.deleteBook = (req, res, next) => {
  bookService
    .deleteBook(req.params.id)
    .then(() => res.status(200).json({ message: "Book deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.rateBook = (req, res, next) => {
  // bookService
  //   .rateBook(req)
  Book.findById(req.params.id)
    .then((book) => {
      let alreadyRatedByUser = false;
      book.ratings.forEach((rating) => {
        if (rating.userId === req.auth.userId) {
          alreadyRatedByUser = true;
        }
      });
      if (alreadyRatedByUser) {
        return Promise.reject(new Error("User has already rated this book"));
      }
      book.ratings.push({ userId: req.auth.userId, grade: req.body.rating });
      book.averageRating = Math.round(
        book.ratings.reduce((total, current) => total + current.grade, 0) /
          book.ratings.length
      );
      book
        .save()
        .then((book) => {
          res.status(200).json(book);
        })
        .catch((error) => {
          return Promise.reject(new Error(error.message));
        });
    })
    // .then(() => {
    //   console.log("We are in the then block");
    //   res.status(200).json({ message: "The book has been rated" });
    // })
    .catch((error) => {
      if (error.message === "User has already rated this book") {
        res.status(403).json({ message: "User has already rated this book" });
      } else {
        res.status(400).json({ error });
      }
    });
};
