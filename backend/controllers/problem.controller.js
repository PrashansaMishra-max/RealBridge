import Problem from "../models/problem.model.js";
import User from "../models/user.model.js";

// ── POST PROBLEM ──────────────────────────────────────────────────────────────
// Called by: POST /api/v1/problem/post (from PostProblem.jsx)
export const postProblem = async (req, res) => {
  try {
    const { title, description, category, tags, budget } = req.body;
    const userId = req.id;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description and category are required.",
        success: false,
      });
    }

    // Only citizens (role: "user") can post problems
    const poster = await User.findById(userId);
    if (!poster || poster.role === "developer") {
      return res.status(403).json({
        message: "Only citizens can post problems.",
        success: false,
      });
    }

    // Convert "mobile app, farming, finance" → ["mobile app", "farming", "finance"]
    let parsedTags = [];
    if (tags) {
      parsedTags = typeof tags === "string"
        ? tags.split(",").map((t) => t.trim()).filter(Boolean)
        : tags;
    }

    const problem = await Problem.create({
      title,
      description,
      category,
      tags: parsedTags,
      budget: budget ? Number(budget) : undefined,
      postedBy: userId,
    });

    return res.status(201).json({
      message: "Problem posted successfully!",
      problem,
      success: true,
    });
  } catch (error) {
    console.error("Post problem error:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── GET ALL PROBLEMS ──────────────────────────────────────────────────────────
// Called by: GET /api/v1/problem/getall (from Problems.jsx, Dashboards)
export const getAllProblems = async (req, res) => {
  try {
    const { keyword, category, status } = req.query;

    // Build search filter dynamically
    const filter = {};
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },      // Case-insensitive search
        { description: { $regex: keyword, $options: "i" } },
      ];
    }
    if (category) filter.category = category;
    if (status) filter.status = status;

    const problems = await Problem.find(filter)
      .populate("postedBy", "fullname email profile")  // Get poster's name/email
      .sort({ createdAt: -1 });  // Newest first

    return res.status(200).json({ problems, success: true });
  } catch (error) {
    console.error("Get problems error:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── GET PROBLEM BY ID ─────────────────────────────────────────────────────────
// Called by: when navigating to /problems/:id (ProblemDetail.jsx)
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id)
      .populate("postedBy", "fullname email profile")
      .populate({
        path: "applications",
        populate: { path: "applicant", select: "fullname email profile" },
      });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found.", success: false });
    }

    return res.status(200).json({ problem, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── GET MY PROBLEMS (Citizen Dashboard) ───────────────────────────────────────
export const getMyProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ postedBy: req.id })
      .populate("postedBy", "fullname email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ problems, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── UPDATE PROBLEM STATUS ─────────────────────────────────────────────────────
export const updateProblemStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found.", success: false });
    }

    // Only the problem's owner can update it
    if (problem.postedBy.toString() !== req.id) {
      return res.status(403).json({ message: "Not authorized.", success: false });
    }

    if (status) problem.status = status;
    if (priority) problem.priority = priority;
    await problem.save();

    return res.status(200).json({
      message: "Problem updated.",
      problem,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── DELETE PROBLEM ────────────────────────────────────────────────────────────
export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found.", success: false });
    }
    if (problem.postedBy.toString() !== req.id) {
      return res.status(403).json({ message: "Not authorized.", success: false });
    }

    await Problem.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Problem deleted.", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};