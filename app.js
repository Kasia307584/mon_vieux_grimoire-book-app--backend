const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose
  .connect(
    "mongodb+srv://new_user_1:GG6NL2DQWZ6wrP55@clusterforbooksapp.7ka29ua.mongodb.net/?retryWrites=true&w=majority&appName=ClusterForBooksApp",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(() => console.log("Failed to connect to MongoDB!"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.get("/api/books", (req, res, next) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

app.post("/api/books", (req, res, next) => {
  const book = new Book({
    userId: "1",
    title: "The Lightning Thief",
    author: "Rick Riordan",
    imageUrl:
      "https://www.amazon.com/Lightning-Thief-Percy-Jackson-Olympians/dp/0786838655",
    year: "2005",
    genre: "fantasy",
    ratings: [
      {
        userId: "1",
        grade: 5,
      },
    ],
    averageRating: 4.5,
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

module.exports = app;
