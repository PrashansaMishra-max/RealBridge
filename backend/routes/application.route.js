import express from "express";
import {
  applyToProblem, getApplicants,
  getMyApplications, updateApplicationStatus
} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Developer applies — uses GET to match ProblemDetail.jsx exactly:
// axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`)
router.get("/apply/:id", isAuthenticated, applyToProblem);

router.get("/applicants/:id", isAuthenticated, getApplicants);
router.get("/myapplications", isAuthenticated, getMyApplications);
router.put("/status/:id/update", isAuthenticated, updateApplicationStatus);

export default router;