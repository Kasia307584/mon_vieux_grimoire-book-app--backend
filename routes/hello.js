const express = require("express");
const coucouCtrl = require("../controllers/coucou");

const router = express.Router();

console.log('lalalalala')

router.get("/coucou", coucouCtrl.getCoucou);


module.exports = router;
