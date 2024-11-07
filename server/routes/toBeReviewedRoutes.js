import express from "express";
import {
  createToBeReviewed,
  getToBeReviewedById,
  getAllToBeReviewed,
  updateToBeReviewed,
  deleteToBeReviewed,
  assignReviewers,
  setAbstractApproval,
  requestPaperUpdate
} from "../controllers/toBeReviewedController.js";

const toBeReviewedRoutes = express.Router();

// Create a new review record
toBeReviewedRoutes.post("/create", createToBeReviewed);

// Get a single review record by ID
toBeReviewedRoutes.get("/:id", getToBeReviewedById);

// Get all review records
toBeReviewedRoutes.get("/", getAllToBeReviewed);

// Update a review record by ID
toBeReviewedRoutes.put("/update/:id", updateToBeReviewed);

// Delete a review record by ID
toBeReviewedRoutes.delete("/delete/:id", deleteToBeReviewed);

// Assign reviewers to a paper for review
toBeReviewedRoutes.put("/assign-reviewers", assignReviewers);

// Approve or disapprove the abstract of a paper
toBeReviewedRoutes.put("/set-abstract-approval", setAbstractApproval);

// Request an update on the paper's abstract or other details
toBeReviewedRoutes.put("/request-update", requestPaperUpdate);

export default toBeReviewedRoutes;
