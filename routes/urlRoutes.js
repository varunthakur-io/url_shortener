// routes/urlRoutes.js
const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

// Route for shortening URL
router.post("/shorten", urlController.shortenURL);

// Route for redirecting shortened URL
router.get("/:shortURL", urlController.redirectURL);

// Route for deleting a URL
router.delete("/:id", urlController.deleteURL);

module.exports = router;
