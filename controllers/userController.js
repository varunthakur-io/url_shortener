const User = require("../models/userModel");

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

  return res.redirect("/?status=200");
};
