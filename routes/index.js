const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Define route for the home page
router.get('/', (req, res) => {
  res.send('Welcome to the URL shortener service!');
});

// Define route for URL shortening
router.post('/shorten', urlController.shortenURL);

// Define route for URL redirection
// router.get('/:shortURL', urlController.redirectURL);

module.exports = router;
