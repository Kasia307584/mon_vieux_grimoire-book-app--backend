const Book = require("../models/Book");

exports.createBook = (bookData, reqData) => {
  const book = new Book({
    ...bookData,
    userId: reqData.auth.userId,
    imageUrl: `${reqData.protocol}://${reqData.get("host")}/images/${
      reqData.file.filename
    }`,
    ratings: [
      {
        userId: reqData.auth.userId,
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

exports.modifyBook = async (id, bookData, userId, reqData) => {
  const bookObject = reqData.file
    ? {
        ...JSON.parse(bookData),
        imageUrl: `${reqData.protocol}://${reqData.get("host")}/images/${
          reqData.file.filename
        }`,
      }
    : { ...reqData.body };

  delete bookObject.userId;
  Book.findOne({ _id: id })
    .then((book) => {
      if (book.userId !== userId) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        return Book.updateOne({ _id: id }, { ...bookObject, _id: id });
      }
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.deleteBook = (id) => {
  return Book.deleteOne({ _id: id });
};
