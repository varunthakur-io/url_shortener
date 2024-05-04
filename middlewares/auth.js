// middlewares/auth.js
const { getUser } = require("../services/auth");

function restrictToLoggedIn(req, res, next) {
  const session_id = req.cookies.session_id;
  if (!session_id) return res.redirect("/login");
  // console.log("hi form middleware");
  const user = getUser(session_id);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

module.exports = restrictToLoggedIn;
