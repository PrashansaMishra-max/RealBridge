import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import problemRoute from "./routes/problem.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();  // Load .env file variables

const app = express();

// ── MIDDLEWARES ───────────────────────────────────────────────────────────────
app.use(express.json());                         // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser());                         // Parse cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,  // CRITICAL: allows cookies to be sent cross-origin
  })
);

// ── ROUTES ────────────────────────────────────────────────────────────────────
app.use("/api/v1/user", userRoute);
app.use("/api/v1/problem", problemRoute);
app.use("/api/v1/application", applicationRoute);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "RealBridge API is running 🚀", success: true });
});

// ── START SERVER ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();  // Connect to MongoDB
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});