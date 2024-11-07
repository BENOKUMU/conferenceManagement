import ReviewerUser from "../models/ReviewerUser.js";

// Get a single ReviewerUser by ID
export const getReviewerUserById = async (req, res) => {
  try {
    const reviewerUser = await ReviewerUser.findById(req.params.id);
    if (!reviewerUser) return res.status(404).json({ message: "ReviewerUser not found" });
    res.status(200).json(reviewerUser);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all ReviewerUsers
export const getAllReviewerUsers = async (req, res) => {
  try {
    const reviewerUsers = await ReviewerUser.find();
    res.status(200).json(reviewerUsers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a ReviewerUser by ID
export const updateReviewerUser = async (req, res) => {
  try {
    const updatedReviewerUser = await ReviewerUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReviewerUser) return res.status(404).json({ message: "ReviewerUser not found" });
    res.status(200).json({ message: "ReviewerUser updated", reviewerUser: updatedReviewerUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating ReviewerUser", error: err.message });
  }
};

// Delete a ReviewerUser by ID
export const deleteReviewerUser = async (req, res) => {
  try {
    const deletedReviewerUser = await ReviewerUser.findByIdAndDelete(req.params.id);
    if (!deletedReviewerUser) return res.status(404).json({ message: "ReviewerUser not found" });
    res.status(200).json({ message: "ReviewerUser deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a reviewed project to a ReviewerUser
export const addReviewedProject = async (req, res) => {
  const { projectId, reviewerUserId } = req.body;
  try {
    const reviewerUser = await ReviewerUser.findById(reviewerUserId);
    if (!reviewerUser) return res.status(404).json({ message: "ReviewerUser not found" });

    reviewerUser.reviewedProjects.push(projectId);
    await reviewerUser.save();

    res.status(200).json({ message: "Reviewed project added", reviewerUser });
  } catch (err) {
    res.status(400).json({ message: "Error adding reviewed project", error: err.message });
  }
};

// Update review capacity for a ReviewerUser
export const updateReviewCapacity = async (req, res) => {
  const { reviewerUserId, reviewCapacity } = req.body;
  try {
    const reviewerUser = await ReviewerUser.findById(reviewerUserId);
    if (!reviewerUser) return res.status(404).json({ message: "ReviewerUser not found" });

    reviewerUser.reviewCapacity = reviewCapacity;
    await reviewerUser.save();

    res.status(200).json({ message: "Review capacity updated", reviewerUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating review capacity", error: err.message });
  }
};
