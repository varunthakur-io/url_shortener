import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
const key = config.jwtSecret;

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
