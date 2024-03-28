const Book = require("../models/Book");

exports.createBook = (bookData, authData) => {
  const book = new Book({
    ...bookData,
    userId: authData.userId,
    ratings: [
      {
        userId: authData.userId,
        grade: bookData.ratings.find((element) => (element = bookData.userId))
          .grade,
      },
    ],
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
