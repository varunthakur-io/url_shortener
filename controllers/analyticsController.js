const URL = require("../models/urlModel");

exports.getAnalytics = async (req, res) => {
  try {
    const short_id = req.params.shortURL;
    const result = await URL.findOne({ shortURL: short_id });

    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    const total_clicks = result.visits.length;

    return res.json({
      total_clicks,
      analytics: result.visits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
