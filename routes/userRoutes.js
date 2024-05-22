const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const restrictToLoggedIn = require("../middlewares/auth");

// Route for user signup
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/logout", userController.logout);

// router.post("/profile", restrictToLoggedIn, userController.updateUser);

module.exports = router;
