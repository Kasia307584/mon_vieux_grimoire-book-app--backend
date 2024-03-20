const express = require("express");

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

app.use("/api/books", (req, res, next) => {
  const books = [
    {
      iserId: "1",
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
    },
  ];
  res.status(200).json(books);
});

module.exports = app;
