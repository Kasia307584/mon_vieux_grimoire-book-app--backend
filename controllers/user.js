const userService = require("../services/userService");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(userData.password, 10)
    .then((hash) => {
      userService
        .createUser(req.body, hash)
        .then(() => res.status(201).json({ message: "User created!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {};
