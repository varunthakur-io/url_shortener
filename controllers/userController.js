// /controllers/userController.js
const User = require("../models/userModel");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.redirect("/login?status=404");
  }

  const token = setUser(user);
  res.cookie("session_id", token);

  return res.redirect("/?status=200");
};

exports.signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  await User.create({
    name,
    email,
    username,
    password,
  });

  res.redirect("/");
};

exports.logout = async (req, res) => {
  res.clearCookie("session_id");
  return res.redirect("/login");
};

exports.updateUser = async (req, res) => {
  const userId = req.user._id;
  const { name, email, username } = req.body;

  try {
    // Find the user by their ID and update their name and email
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, username },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = setUser(updatedUser);
    res.cookie("session_id", token);

    res.redirect("/profile");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
