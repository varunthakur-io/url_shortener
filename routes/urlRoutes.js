const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

// Define route for the home page
router.get("/", (req, res) => {
  // res.send("Welcome to the URL shortener service!");
  res.render("home")
});

// Route for shortening URL
router.post("/shorten", urlController.shortenURL);

// Route for redirecting shortened URL
router.get("/:shortURL", urlController.redirectURL);

module.exports = router;
