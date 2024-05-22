// routes/staticRoutes.js
const express = require("express");
const StaticRouter = express.Router();
const redisClient = require("../config/redis");

const URL = require("../models/urlModel");
const restrictToLoggedIn = require("../middlewares/auth");

StaticRouter.get("/", restrictToLoggedIn, async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
  const id = req.query.id;

  return res.render("home", {
    urls: urls,
    id: id,
  });
});

StaticRouter.get("/login", (req, res) => {
  if (req.cookies.session_id) return res.redirect("/");
  return res.render("login");
});

StaticRouter.get("/signup", (req, res) => {
  if (req.cookies.session_id) return res.redirect("/");
  return res.render("signup");
});

StaticRouter.get("/analytics", restrictToLoggedIn, async (req, res) => {
  try {
    // Attempt to fetch "urls" data from Redis cache
    let cachedUrls = await redisClient.get("urls");

    if (cachedUrls) {
      // If data found in cache, parse and render it
      const urls = JSON.parse(cachedUrls);
      return res.render("analytics", { urls });
    } else {
      // If data not found in cache, fetch it from the database
      const urls = await URL.find({ createdBy: req.user._id });

      // Convert fetched data to JSON string
      const data = JSON.stringify(urls);

      // Store fetched data in Redis cache
      redisClient.set("urls", data);

      // Render fetched data
      return res.render("analytics", { urls });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error in /analytics route:", error);

    // Send 500 Internal Server Error response
    return res.status(500).send("Internal Server Error");
  }
});

StaticRouter.get("/profile", restrictToLoggedIn, (req, res) => {
  return res.render("profile", {
    user: req.user,
  });
});

StaticRouter.get("/test", (req, res) => {
  res.render("test");
});
module.exports = StaticRouter;
