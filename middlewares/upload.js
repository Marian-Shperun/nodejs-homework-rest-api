const multer = require("multer");
const path = require("path");

const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, "../", "temp"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // limits:{}
});

const upload = multer({
  storage: multerConfig,
});

module.exports = { upload };
