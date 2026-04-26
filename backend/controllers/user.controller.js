import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// ── REGISTER ──────────────────────────────────────────────────────────────────
// Called by: POST /api/v1/user/register (from Signup.jsx)
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Validate required fields
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all required fields.",
        success: false,
      });
    }

    // Upload profile photo to Cloudinary if provided
    let profilePhotoUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already registered.",
        success: false,
      });
    }

    // Hash password before saving (NEVER save plain text passwords)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res.status(201).json({
      message: "Account created successfully! Please login.",
      success: true,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── LOGIN ──────────────────────────────────────────────────────────────────────
// Called by: POST /api/v1/user/login (from Login.jsx)
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required.",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Compare password with stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Check that selected role matches actual role in DB
    // (prevents a developer from logging in as a citizen)
    if (role !== user.role) {
      return res.status(400).json({
        message: `You are not registered as a ${role}.`,
        success: false,
      });
    }

    // Create JWT token containing the user's ID
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }   // Token expires in 1 day
    );

    // User data to send back (never send password!)
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Set token as an HTTP-only cookie and return user data
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,  // 1 day in milliseconds
        httpOnly: true,                // JS cannot read this cookie (security)
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}!`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── LOGOUT ─────────────────────────────────────────────────────────────────────
// Called by: GET /api/v1/user/logout (from Navbar.jsx)
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })  // Clear the cookie
      .json({ message: "Logged out successfully.", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── UPDATE PROFILE ─────────────────────────────────────────────────────────────
// Called by: PUT /api/v1/user/profile/update (from Profile page)
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;  // Set by isAuthenticated middleware

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    // Upload new profile photo if provided
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    // Update fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    // Convert comma-separated skills string to array
    // e.g. "React, Node.js, MongoDB" → ["React", "Node.js", "MongoDB"]
    if (skills) {
      user.profile.skills = skills.split(",").map((s) => s.trim()).filter(Boolean);
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── GET ALL USERS (Admin only) ─────────────────────────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json({ users, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }
        return res.status(200).json({ user, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server error.", success: false });
    }
};