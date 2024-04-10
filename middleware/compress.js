const sharp = require("sharp");

module.exports = (req, res, next) => {
  const file = req.file;
  const name = file?.originalname.split(" ").join("_");
  const ref = `${name}${Date.now()}.webp`;

  file
    ? sharp(file.buffer)
        .webp({ quality: 20 })
        .toFile("images/" + ref)
        .then(() => {
          req.image = { ref: ref };
          next();
        })
        .catch((error) => {
          res.status(500).json({ error });
        })
    : null;
};
