import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,      // No two users can have the same email
      lowercase: true,   // Always store emails in lowercase
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,    // This will be the HASHED password
    },
    role: {
      type: String,
      enum: ["user", "developer", "admin"],  // Only these 3 values allowed
      required: true,
    },
    profile: {
      bio: { type: String, default: "" },
      skills: [{ type: String }],         // Array of skills e.g. ["React", "Node"]
      profilePhoto: { type: String, default: "" },  // Cloudinary URL
    },
  },
  { timestamps: true }  // Adds createdAt and updatedAt automatically
);

const User = mongoose.model("User", userSchema);
export default User;