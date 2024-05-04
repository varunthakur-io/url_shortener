// middlewares/auth.js
const { getUser } = require("../services/auth");

function restrictToLoggedIn(req, res, next) {
  const token = req.cookies.session_id;
  if (!token) return res.redirect("/login");
  const user = getUser(token);

  if (!user) {
    res.clearCookie("session_id");
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

module.exports = restrictToLoggedIn;
