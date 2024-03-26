const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = (userData) => {
  bcrypt
    .hash(userData.password, 10)
    .then((hash) => {
      const user = new User({
        email: userData.email,
        password: hash,
      });
      return user.save();
    })
    .catch((error) => {
      return error;
    });
};
exports.findUser = () => {};
