import express from "express";
import {
  getAuthorUserById,
  getAllAuthorUsers,
  updateAuthorUser,
  deleteAuthorUser,
  addSubmittedPaper,
  updatePaperResults,
  toggleBlockAuthorUser
} from "../controllers/authorUserController.js";

const authorUserRoutes = express.Router();

// Get a single AuthorUser by ID
authorUserRoutes.get("/:id", getAuthorUserById);

// Get all AuthorUsers
authorUserRoutes.get("/", getAllAuthorUsers);

// Update an AuthorUser by ID
authorUserRoutes.put("/update/:id", updateAuthorUser);

// Delete an AuthorUser by ID
authorUserRoutes.delete("/delete/:id", deleteAuthorUser);

// Add a submitted paper to an AuthorUser
authorUserRoutes.post("/add-submitted-paper", addSubmittedPaper);

// Update paper results for an AuthorUser
authorUserRoutes.put("/update-paper-results", updatePaperResults);

// Block or unblock an AuthorUser
authorUserRoutes.put("/toggle-block", toggleBlockAuthorUser);

export default authorUserRoutes;
