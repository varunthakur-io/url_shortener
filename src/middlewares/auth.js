// middlewares/auth.js
import { getUser } from '../services/auth.js';

function restrictToLoggedIn(req, res, next) {
  const token = req.cookies.session_id;
  if (!token) return res.redirect('/login');
  const user = getUser(token);

  if (!user) {
    res.clearCookie('session_id');
    return res.redirect('/login');
  }
  req.user = user;
  next();
}

export default restrictToLoggedIn;
