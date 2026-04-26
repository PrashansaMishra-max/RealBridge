import multer from "multer";

// Store files in memory (RAM) instead of disk
// We need to process them before sending to Cloudinary
const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");
// "file" must match the field name in the frontend's FormData