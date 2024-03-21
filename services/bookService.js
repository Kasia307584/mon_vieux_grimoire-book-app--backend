const Book = require("../models/Book");

exports.createBook = (bookData) => {
  const book = new Book({
    ...bookData,
  });
  return book.save();
};

exports.getAllBooks = () => {
  return Book.find();
};

exports.getOneBook = (id) => {
  return Book.findById(id);
};

exports.modifyBook = (id, bookData) => {
  return Book.updateOne({ _id: id }, { ...bookData, _id: id });
};

exports.deleteBook = (id) => {
  return Book.deleteOne({ _id: id });
};
