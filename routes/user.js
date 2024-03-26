const express = require("express");
const userCtrl = require("../controllers/user");

const routes = express.Router();

routes.post("/signup", userCtrl.signup);
routes.post("/login", userCtrl.login);

module.exports = routes;
