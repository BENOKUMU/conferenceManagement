import express from "express";
import {
  createPaperSubmission,
  getPaperSubmissionById,
  getAllPaperSubmissions,
  updatePaperSubmission,
  deletePaperSubmission,
  setAbstractApproval,
  requestPaperUpdate,
  updatePaperFile,
  revokePaperUpdateRequest,
  updateFileInSubmission,
  addAuthorToSubmission
} from "../controllers/paperSubmissionController.js";

const paperSubmissionRoutes = express.Router();

// Create a new paper submission
paperSubmissionRoutes.post("/create", createPaperSubmission);

// Get a single paper submission by ID
paperSubmissionRoutes.get("/:id", getPaperSubmissionById);

// Get all paper submissions
paperSubmissionRoutes.get("/", getAllPaperSubmissions);

// Update a paper submission by ID
paperSubmissionRoutes.put("/update/:id", updatePaperSubmission);

// Delete a paper submission by ID
paperSubmissionRoutes.delete("/delete/:id", deletePaperSubmission);

// Approve or disapprove an abstract
paperSubmissionRoutes.put("/set-abstract-approval", setAbstractApproval);

// Request a paper update
paperSubmissionRoutes.put("/request-update", requestPaperUpdate);

// Update file for a paper submission
paperSubmissionRoutes.put("/update-file", updatePaperFile);

// Revoke a paper update request
paperSubmissionRoutes.put("/revoke-update-request", revokePaperUpdateRequest);

// Update the file in a specific submission (alternative to update-file)
paperSubmissionRoutes.put("/update-file-in-submission", updateFileInSubmission);

// Add an author to a paper submission
paperSubmissionRoutes.put("/add-author", addAuthorToSubmission);

export default paperSubmissionRoutes;
