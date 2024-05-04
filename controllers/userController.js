// /controllers/userController.js
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  // Redirect to home page
  res.redirect("/");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.redirect("/login?status=404");
  }

  const session_id = uuidv4();
  setUser(session_id, user);
  res.cookie("session_id", session_id);

  // Check if user is already logged in
  if (req.cookies.session_id) {
    return res.redirect("/"); // Redirect to home page if already logged in
  }

  return res.redirect("/?status=200");
};
