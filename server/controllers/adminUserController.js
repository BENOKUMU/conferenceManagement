import AdminUser from "../models/AdminUser.js";

// Get a single AdminUser by ID
export const getAdminUserById = async (req, res) => {
  try {
    const adminUser = await AdminUser.findById(req.params.id);
    if (!adminUser) return res.status(404).json({ message: "AdminUser not found" });
    res.status(200).json(adminUser);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all AdminUsers
export const getAllAdminUsers = async (req, res) => {
  try {
    const adminUsers = await AdminUser.find();
    res.status(200).json(adminUsers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update an AdminUser by ID
export const updateAdminUser = async (req, res) => {
  try {
    const updatedAdminUser = await AdminUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdminUser) return res.status(404).json({ message: "AdminUser not found" });
    res.status(200).json({ message: "AdminUser updated", adminUser: updatedAdminUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating AdminUser", error: err.message });
  }
};

// Delete an AdminUser by ID
export const deleteAdminUser = async (req, res) => {
  try {
    const deletedAdminUser = await AdminUser.findByIdAndDelete(req.params.id);
    if (!deletedAdminUser) return res.status(404).json({ message: "AdminUser not found" });
    res.status(200).json({ message: "AdminUser deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add an applied student to an AdminUser
export const addAppliedStudent = async (req, res) => {
  const { adminUserId, authorUserId } = req.body;
  try {
    const adminUser = await AdminUser.findById(adminUserId);
    if (!adminUser) return res.status(404).json({ message: "AdminUser not found" });

    adminUser.appliedStudents.push(authorUserId);
    await adminUser.save();

    res.status(200).json({ message: "Applied student added", adminUser });
  } catch (err) {
    res.status(400).json({ message: "Error adding applied student", error: err.message });
  }
};

// Update application deadline
export const updateApplicationDeadline = async (req, res) => {
  const { adminUserId, startDate, endDate } = req.body;
  try {
    const adminUser = await AdminUser.findById(adminUserId);
    if (!adminUser) return res.status(404).json({ message: "AdminUser not found" });

    adminUser.deadline = { startDate, endDate };
    await adminUser.save();

    res.status(200).json({ message: "Application deadline updated", adminUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating deadline", error: err.message });
  }
};

// Update student capacity
export const updateStudentCapacity = async (req, res) => {
  const { adminUserId, studentCapacity } = req.body;
  try {
    const adminUser = await AdminUser.findById(adminUserId);
    if (!adminUser) return res.status(404).json({ message: "AdminUser not found" });

    adminUser.studentCapacity = studentCapacity;
    await adminUser.save();

    res.status(200).json({ message: "Student capacity updated", adminUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating student capacity", error: err.message });
  }
};
