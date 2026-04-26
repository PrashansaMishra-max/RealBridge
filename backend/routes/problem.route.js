import express from "express";
import {
  postProblem, getAllProblems, getProblemById,
  getMyProblems, updateProblemStatus, deleteProblem
} from "../controllers/problem.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public
router.get("/getall", getAllProblems);    // Problems.jsx, Dashboards
router.get("/get/:id", getProblemById);  // ProblemDetail.jsx

// Protected
router.post("/post", isAuthenticated, postProblem);
router.get("/myproblems", isAuthenticated, getMyProblems);
router.put("/update/:id", isAuthenticated, updateProblemStatus);
router.delete("/delete/:id", isAuthenticated, deleteProblem);

export default router;