import mongoose from "mongoose";

// Function to connect to DB
async function connectDB(url) {
  return mongoose.connect(url);
}

export default connectDB;
