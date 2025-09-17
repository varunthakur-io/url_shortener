// services/auth.js
import jwt from "jsonwebtoken";
const key = `${process.env.JWT_SECRET}`;
function setUser(user) {
  return jwt.sign(JSON.stringify(user), key);
}
function getUser(user) {
  try {
    return jwt.verify(user, key);
  } catch {
    return null;
  }
}

export { setUser, getUser };
