const express = require("express");
const StaticRouter = express.Router();
const URL = require("../models/urlModel");

StaticRouter.get("/", async (req, res) => {
  const urls = await URL.find({});
  const id = req.query.id;
  return res.render("home", {
    urls: urls,
    id: id,
  });
});

StaticRouter.get("/login", (req, res) => {
  res.render("login");
});

StaticRouter.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = StaticRouter;
