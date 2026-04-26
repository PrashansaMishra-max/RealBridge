import Application from "../models/application.model.js";
import Problem from "../models/problem.model.js";
import User from "../models/user.model.js";

// ── APPLY TO PROBLEM ──────────────────────────────────────────────────────────
// Called by: GET /api/v1/application/apply/:id (from ProblemDetail.jsx)
// Note: Frontend uses GET (not POST) — we match exactly
export const applyToProblem = async (req, res) => {
  try {
    const userId = req.id;
    const problemId = req.params.id;

    // Only developers can apply
    const developer = await User.findById(userId);
    if (!developer || developer.role !== "developer") {
      return res.status(403).json({
        message: "Only developers can apply to problems.",
        success: false,
      });
    }

    // Check problem exists and is still open
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found.", success: false });
    }
    if (problem.status !== "open") {
      return res.status(400).json({
        message: "This problem is no longer accepting applications.",
        success: false,
      });
    }

    // Check if developer already applied
    const alreadyApplied = await Application.findOne({
      problem: problemId,
      applicant: userId,
    });
    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied to this problem.",
        success: false,
      });
    }

    // Create the application
    const application = await Application.create({
      problem: problemId,
      applicant: userId,
    });

    // Add application ID to problem's applications array
    problem.applications.push(application._id);
    await problem.save();

    return res.status(201).json({
      message: "Application submitted successfully! 🚀",
      application,
      success: true,
    });
  } catch (error) {
    console.error("Apply error:", error);
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── GET APPLICANTS FOR A PROBLEM ──────────────────────────────────────────────
// Called by: Problem poster wants to see who applied
export const getApplicants = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found.", success: false });
    }
    if (problem.postedBy.toString() !== req.id) {
      return res.status(403).json({ message: "Not authorized.", success: false });
    }

    const applications = await Application.find({ problem: req.params.id })
      .populate("applicant", "fullname email phoneNumber profile")
      .sort({ createdAt: -1 });

    return res.status(200).json({ applications, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── GET MY APPLICATIONS (Developer view) ──────────────────────────────────────
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.id })
      .populate({
        path: "problem",
        populate: { path: "postedBy", select: "fullname email" },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ applications, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};

// ── ACCEPT OR REJECT APPLICATION ──────────────────────────────────────────────
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status.", success: false });
    }

    const application = await Application.findById(req.params.id).populate("problem");
    if (!application) {
      return res.status(404).json({ message: "Application not found.", success: false });
    }

    // Only the problem poster can accept/reject
    if (application.problem.postedBy.toString() !== req.id) {
      return res.status(403).json({ message: "Not authorized.", success: false });
    }

    application.status = status;
    await application.save();

    // If accepted, move problem to "in-progress"
    if (status === "accepted") {
      await Problem.findByIdAndUpdate(application.problem._id, {
        status: "in-progress",
      });
    }

    return res.status(200).json({
      message: `Application ${status} successfully.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", success: false });
  }
};