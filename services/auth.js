// services/auth.js
const jwt = require("jsonwebtoken");
const key = `${process.env.JWT_SECRET}`;
function setUser(user) {
  return jwt.sign(JSON.stringify(user), key);
}
function getUser(user) {
  try {
    return jwt.verify(user, key);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
