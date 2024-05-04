// routes/staticRoutes.js
const express = require("express");
const StaticRouter = express.Router();
const URL = require("../models/urlModel");
require("../services/auth");
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
  res.render("signup");
});

module.exports = StaticRouter;
