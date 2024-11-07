import Project from "../models/Project.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (err) {
    res.status(400).json({ message: "Error creating project", error: err.message });
  }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("appliedStudents submittedStudents");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("appliedStudents submittedStudents");
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update project details by ID
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project updated", project: updatedProject });
  } catch (err) {
    res.status(400).json({ message: "Error updating project", error: err.message });
  }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Apply a student to a project
export const applyStudentToProject = async (req, res) => {
  const { projectId, studentId } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.appliedStudents.length >= project.studentCapacity) {
      return res.status(400).json({ message: "Project student capacity reached" });
    }

    if (!project.appliedStudents.includes(studentId)) {
      project.appliedStudents.push(studentId);
      await project.save();
    }

    res.status(200).json({ message: "Student applied to project", project });
  } catch (err) {
    res.status(400).json({ message: "Error applying student", error: err.message });
  }
};

// Remove a student from applied students
export const removeStudentFromProject = async (req, res) => {
  const { projectId, studentId } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.appliedStudents = project.appliedStudents.filter(id => id.toString() !== studentId);
    await project.save();

    res.status(200).json({ message: "Student removed from project", project });
  } catch (err) {
    res.status(400).json({ message: "Error removing student", error: err.message });
  }
};

// Set or update project application settings (canApply, options, deadlines, etc.)
export const setProjectApplicationSettings = async (req, res) => {
  const { projectId, canApply, options, selectedOption, deadline } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (canApply) project.canApply = canApply;
    if (options) project.options = options;
    if (selectedOption) project.selectedOption = selectedOption;
    if (deadline) project.deadline = deadline;

    await project.save();
    res.status(200).json({ message: "Project application settings updated", project });
  } catch (err) {
    res.status(400).json({ message: "Error updating application settings", error: err.message });
  }
};
