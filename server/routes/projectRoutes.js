import express from "express";
import {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
  applyStudentToProject,
  removeStudentFromProject,
  setProjectApplicationSettings
} from "../controllers/projectController.js";

const projectRoutes = express.Router();

// Create a new project
projectRoutes.post("/create", createProject);

// Get a single project by ID
projectRoutes.get("/:id", getProjectById);

// Get all projects
projectRoutes.get("/", getAllProjects);

// Update a project by ID
projectRoutes.put("/update/:id", updateProject);

// Delete a project by ID
projectRoutes.delete("/delete/:id", deleteProject);

// Apply a student to a project
projectRoutes.put("/apply-student", applyStudentToProject);

// Remove a student from applied students
projectRoutes.put("/remove-student", removeStudentFromProject);

// Set or update project application settings
projectRoutes.put("/set-application-settings", setProjectApplicationSettings);

export default projectRoutes;
