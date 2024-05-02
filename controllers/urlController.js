const URL = require('../models/urlModel');
const shortid = require('shortid');

exports.shortenURL = async (req, res) => {
  const { originalURL } = req.body;

  try {
    let url = await URL.findOne({ originalURL });

    if (url) {
      res.json(url);
    } else {
      const shortURL = shortid.generate();
      const newURL = new URL({
        originalURL,
        shortURL
      });

      url = await newURL.save();
      res.json(url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.redirectURL = async (req, res) => {
  const { shortURL } = req.params;

  try {
    const url = await URL.findOne({ shortURL });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(url.originalURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
