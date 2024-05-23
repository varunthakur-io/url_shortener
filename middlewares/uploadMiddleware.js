// middlewares/uploadMiddleware.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define storage settings using diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userDir = path.join("public", "profilePic", req.user._id);

    // Check if the user upload directory exists
    fs.access(userDir, fs.constants.F_OK, (err) => {
      if (err) {
        // Directory doesn't exist, create it recursively
        fs.mkdir(userDir, { recursive: true }, (mkdirErr) => {
          if (mkdirErr) {
            return cb(mkdirErr); // Handle error during directory creation
          }
          // Directory created successfully, proceed with storage
          cb(null, userDir);
        });
      } else {
        // User upload directory exists, proceed with storage
        cb(null, userDir);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, `profilepic-${Date.now()}-${file.originalname}`);
  },
});

// Create a multer instance with the storage settings
const upload = multer({ storage: storage });

module.exports = upload;
