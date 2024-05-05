// routes/urlRoutes.js
const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController")

// Route for shortening URL
router.post("/shorten", urlController.shortenURL);

// Route for redirecting shortened URL
router.get("/:shortURL", urlController.redirectURL);

router.get("/analytics",)

module.exports = router;
