const express = require("express");
const bookCtrl = require("../controllers/book");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const compress = require("../middleware/compress");

const router = express.Router();

router.post("/", auth, multer, compress, bookCtrl.createBook);
router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestRated);
router.get("/:id", bookCtrl.getOneBook);
router.put("/:id", auth, multer, compress, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

module.exports = router;
