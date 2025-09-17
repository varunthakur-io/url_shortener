// Import required modules
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import staticRoute from "./routes/staticRoutes.js";
import userRoute from "./routes/userRoutes.js";
import urlRoute from "./routes/urlRoutes.js";
import cookieParser from "cookie-parser";

// Create Express app
const app = express();

// Define middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set EJS as the view engine

// Set up static files serving
app.use(express.static("./public"));

// Connect to MongoDB
mongoose
  .connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define routes
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", urlRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
