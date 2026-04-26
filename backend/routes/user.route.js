import express from "express";
import {
  register, login, logout, updateProfile, getAllUsers, getProfile
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Public (no login needed)
router.post("/register", singleUpload, register);    // Signup.jsx
router.post("/login", login);                        // Login.jsx
router.get("/logout", logout);                       // Navbar.jsx logout button

// Protected (must be logged in)
router.put("/profile/update", isAuthenticated, singleUpload, updateProfile);
router.get("/profile", isAuthenticated, getProfile);
router.get("/all", isAuthenticated, getAllUsers);

export default router;