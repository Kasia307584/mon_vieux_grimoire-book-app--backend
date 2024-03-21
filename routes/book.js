const express = require("express");
const Book = require("./models/Book");

const router = express.Router();

router.post("/", (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => {
      res.status(201).json(book);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

router.get("/", (req, res, next) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
});

router.put("/:id", (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Book updated!" }))
    .catch((error) => res.status(400).json({ error }));
});

router.delete("/:id", (req, res, next) => {
  Book.findById(req.params.id)
    .then((book) => {
      Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Book deleted!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(401).json({ error });
    });
});

modules.export = router;
