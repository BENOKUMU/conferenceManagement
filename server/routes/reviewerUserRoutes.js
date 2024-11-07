import express from "express";
import {
  getReviewerUserById,
  getAllReviewerUsers,
  updateReviewerUser,
  deleteReviewerUser,
  addReviewedProject,
  updateReviewCapacity
} from "../controllers/reviewerUserController.js";

const reviewerUserRoutes = express.Router();


// Get a single ReviewerUser by ID
reviewerUserRoutes.get("/:id", getReviewerUserById);

// Get all ReviewerUsers
reviewerUserRoutes.get("/", getAllReviewerUsers);

// Update a ReviewerUser by ID
reviewerUserRoutes.put("/update/:id", updateReviewerUser);

// Delete a ReviewerUser by ID
reviewerUserRoutes.delete("/delete/:id", deleteReviewerUser);

// Add a reviewed project to a ReviewerUser
reviewerUserRoutes.post("/add-reviewed-project", addReviewedProject);

// Update review capacity for a ReviewerUser
reviewerUserRoutes.put("/update-review-capacity", updateReviewCapacity);

export default reviewerUserRoutes;
