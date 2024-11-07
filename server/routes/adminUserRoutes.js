import express from "express";
import {
  getAdminUserById,
  getAllAdminUsers,
  updateAdminUser,
  deleteAdminUser,
  addAppliedStudent,
  updateApplicationDeadline,
  updateStudentCapacity
} from "../controllers/adminUserController.js";

const adminUserRoutes = express.Router();

// Get a single AdminUser by ID
adminUserRoutes.get("/:id", getAdminUserById);

// Get all AdminUsers
adminUserRoutes.get("/", getAllAdminUsers);

// Update an AdminUser by ID
adminUserRoutes.put("/update/:id", updateAdminUser);

// Delete an AdminUser by ID
adminUserRoutes.delete("/delete/:id", deleteAdminUser);

// Add an applied student to an AdminUser
adminUserRoutes.post("/add-applied-student", addAppliedStudent);

// Update application deadline
adminUserRoutes.put("/update-deadline", updateApplicationDeadline);

// Update student capacity
adminUserRoutes.put("/update-student-capacity", updateStudentCapacity);

export default adminUserRoutes;
