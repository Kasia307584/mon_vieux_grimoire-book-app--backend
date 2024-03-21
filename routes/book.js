const express = require("express");
const bookCtrl = require("../controllers/book");

const router = express.Router();

router.post("/", bookCtrl.createBook);
router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.put("/:id", bookCtrl.modifyBook);
router.delete("/:id", bookCtrl.deleteBook);

module.exports = router;
