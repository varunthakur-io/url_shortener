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
