const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");
const URL = require("../models/urlModel");

// Define route for the home page
router.get("/", async (req, res) => {
  // res.send("Welcome to the URL shortener service!");

  const urls = await URL.find({});
  return res.render("home", {
    urls: urls,
  });
});

// Route for shortening URL
router.post("/shorten", urlController.shortenURL);

// Route for redirecting shortened URL
router.get("/:shortURL", urlController.redirectURL);

module.exports = router;
