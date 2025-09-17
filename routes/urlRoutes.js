// routes/urlRoutes.js
import express from "express";
const router = express.Router();
import { shortenURL, redirectURL, deleteURL } from "../controllers/urlController.js";

// Route for shortening URL
router.post("/shorten", shortenURL);

// Route for redirecting shortened URL
router.get("/:shortURL", redirectURL);

// Route for deleting a URL
router.delete("/:id", deleteURL);

export default router;
