const User = require("../models/User");

exports.createUser = (userData, hash) => {
  const user = new User({
    email: userData.email,
    password: hash,
  });
  return user.save();
};

exports.findUser = (email) => {
  return User.findOne({ email: email });
};
