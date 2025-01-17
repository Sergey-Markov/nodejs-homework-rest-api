const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 8000,
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploadAwatarMiddleware = multer({
  storage: uploadConfig,
  fileFilter: fileFilter,
});

module.exports = uploadAwatarMiddleware;
