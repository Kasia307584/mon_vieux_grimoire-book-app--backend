const Book = require("../models/Book");

exports.createBook = (reqData) => {
  const bookObject = JSON.parse(reqData.body.book);
  delete reqData.body._id;
  delete reqData.body.userId;
  const book = new Book({
    ...bookObject,
    userId: reqData.auth.userId,
    imageUrl: `${reqData.protocol}://${reqData.get("host")}/images/${
      reqData.image.ref
    }`,
    ratings: [],
    averageRating: 0,
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
        return Promise.reject(new Error("403: unauthorized request"));
      } else {
        return Book.updateOne(
          { _id: reqData.params.id },
          { ...bookObject, _id: reqData.params.id }
        );
      }
    })
    .catch((error) => {
      return Promise.reject(new Error(error.message));
    });
};

exports.deleteBook = (id) => {
  return Book.deleteOne({ _id: id });
};

exports.rateBook = (reqData) => {
  return Book.findById(reqData.params.id)
    .then((book) => {
      let alreadyRatedByUser = false;
      book.ratings.forEach((rating) => {
        if (rating.userId === reqData.auth.userId) {
          alreadyRatedByUser = true;
        }
      });
      if (alreadyRatedByUser) {
        return Promise.reject(new Error("User has already rated this book"));
      }
      book.ratings.push({
        userId: reqData.auth.userId,
        grade: reqData.body.rating,
      });
      book.averageRating = Math.round(
        book.ratings.reduce((total, current) => total + current.grade, 0) /
          book.ratings.length
      );
      return book.save();
    })
    .catch((error) => {
      return Promise.reject(new Error(error.message));
    });
};

exports.getBestRated = () => {
  return Book.find({}).sort({ averageRating: -1 }).limit(3);
};
