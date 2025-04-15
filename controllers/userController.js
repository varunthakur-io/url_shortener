const bcrypt = require("bcrypt");
const User = require("../models/userModel");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = setUser(user);
    res.cookie("session_id", token);

    return res.redirect("/?status=200");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).send("Email or username already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Redirect to login page after successful signup
    res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Server error during signup");
  }
};


exports.logout = async (req, res) => {
  res.clearCookie("session_id");
  return res.redirect("/login");
};

exports.updateUser = async (req, res) => {
  const userId = req.user._id;
  const { name, email, username } = req.body;

  try {
    // Prepare the update object
    const updateData = { name, email, username };

    // Check if a new profile picture file is uploaded
    if (req.file) {
      // Strip 'public' from the beginning of the path
      const profilePicPath = req.file.path.replace(/\\/g, '/').replace(/^public\//, '');
      updateData.profilePic = profilePicPath;
    }

    // Find the user by their ID and update their details
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new token and set it in the cookie
    const token = setUser(updatedUser);
    res.cookie("session_id", token);

    // Redirect to the profile page
    res.redirect("/profile");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
