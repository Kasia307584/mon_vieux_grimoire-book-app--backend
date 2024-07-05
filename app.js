const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book");
// const helloRoutes = require("./routes/hello");
// const userRoutes = require("./routes/user");
// const path = require("path");

mongoose
  .connect(
    process.env.MONGO_URL,
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

app.use("/api/books", bookRoutes);
// app.use("/api/hello", helloRoutes);
// app.use("/api/auth", userRoutes);
// app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
