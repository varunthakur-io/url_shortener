// services/auth.js
const sessionToUser = new Map();

function setUser(id, user) {
  sessionToUser.set(id, user);
}
function getUser(id) {
  return sessionToUser.get(id);
}

module.exports = {
  setUser,
  getUser,
};
