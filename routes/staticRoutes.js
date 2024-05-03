const express = require("express");
const StaticRouter = express.Router();
const URL = require("../models/urlModel");
const { getUser } = require("../services/auth");

StaticRouter.get("/", async (req, res) => {
  if (!req.cookies.session_id) return res.redirect("/login");
  const user = getUser(req.cookies.session_id);
  if (!user) return res.redirect("/login");

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
