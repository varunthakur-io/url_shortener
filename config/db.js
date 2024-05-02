const mongoose = require("mongoose");

// Function to connect to DB
async function connectDB(url) {
  return mongoose.connect(url);
}

module.exports = connectDB;
