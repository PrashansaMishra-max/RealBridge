import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      // Must match the categories in PostProblem.jsx
      enum: ["Technology", "Health", "Education", "Agriculture",
             "Environment", "Business", "Social", "Other"],
      required: true,
    },
    tags: [{ type: String }],          // e.g. ["mobile app", "farming"]
    budget: { type: Number },          // Optional, in Rupees
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "solved"],
      default: "open",                 // All new problems start as "open"
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",                     // Links to the User who posted it
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",            // Links to all developer applications
      },
    ],
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;