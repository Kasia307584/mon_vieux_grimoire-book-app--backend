const Book = require("../models/Book");

exports.createBook = (bookData, reqData) => {
  const book = new Book({
    ...bookData,
    userId: reqData.auth.userId,
    imageUrl: `${reqData.protocol}://${reqData.get("host")}/images/${
      reqData.image.ref
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

exports.modifyBook = async (reqData) => {
  const bookObject = reqData.file
    ? {
        ...JSON.parse(reqData.body.book),
        imageUrl: `${reqData.protocol}://${reqData.get("host")}/images/${
          reqData.image.ref
        }`,
      }
    : { ...reqData.body };

  delete bookObject.userId;
  Book.findOne({ _id: reqData.params.id })
    .then((book) => {
      if (book.userId !== reqData.auth.userId) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        return Book.updateOne(
          { _id: reqData.params.id },
          { ...bookObject, _id: reqData.params.id }
        );
      }
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.deleteBook = (id) => {
  return Book.deleteOne({ _id: id });
};
