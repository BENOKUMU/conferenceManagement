import ToBeReviewed from "../models/ToBeReviewed.js";

// Create a new review record
export const createToBeReviewed = async (req, res) => {
  try {
    const newToBeReviewed = new ToBeReviewed(req.body);
    await newToBeReviewed.save();
    res.status(201).json({ message: "Paper submitted for review", toBeReviewed: newToBeReviewed });
  } catch (err) {
    res.status(400).json({ message: "Error submitting paper for review", error: err.message });
  }
};

// Get a review record by ID
export const getToBeReviewedById = async (req, res) => {
  try {
    const toBeReviewed = await ToBeReviewed.findById(req.params.id).populate("assignedReviewers authors correspondingAuthor");
    if (!toBeReviewed) return res.status(404).json({ message: "Review record not found" });
    res.status(200).json(toBeReviewed);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all review records
export const getAllToBeReviewed = async (req, res) => {
  try {
    const toBeReviewedList = await ToBeReviewed.find().populate("assignedReviewers authors correspondingAuthor");
    res.status(200).json(toBeReviewedList);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update review record by ID
export const updateToBeReviewed = async (req, res) => {
  try {
    const updatedToBeReviewed = await ToBeReviewed.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedToBeReviewed) return res.status(404).json({ message: "Review record not found" });
    res.status(200).json({ message: "Review record updated", toBeReviewed: updatedToBeReviewed });
  } catch (err) {
    res.status(400).json({ message: "Error updating review record", error: err.message });
  }
};

// Delete a review record by ID
export const deleteToBeReviewed = async (req, res) => {
  try {
    const deletedToBeReviewed = await ToBeReviewed.findByIdAndDelete(req.params.id);
    if (!deletedToBeReviewed) return res.status(404).json({ message: "Review record not found" });
    res.status(200).json({ message: "Review record deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Assign reviewers to a paper for review
export const assignReviewers = async (req, res) => {
  const { reviewId, reviewerIds } = req.body;
  try {
    const toBeReviewed = await ToBeReviewed.findById(reviewId);
    if (!toBeReviewed) return res.status(404).json({ message: "Review record not found" });

    toBeReviewed.assignedReviewers = reviewerIds;
    await toBeReviewed.save();

    res.status(200).json({ message: "Reviewers assigned to paper", toBeReviewed });
  } catch (err) {
    res.status(400).json({ message: "Error assigning reviewers", error: err.message });
  }
};

// Approve or disapprove the abstract of a paper
export const setAbstractApproval = async (req, res) => {
  const { reviewId, isApproved } = req.body;
  try {
    const toBeReviewed = await ToBeReviewed.findById(reviewId);
    if (!toBeReviewed) return res.status(404).json({ message: "Review record not found" });

    toBeReviewed.abstractApproved = isApproved;
    await toBeReviewed.save();

    res.status(200).json({ message: `Abstract ${isApproved ? "approved" : "disapproved"}`, toBeReviewed });
  } catch (err) {
    res.status(400).json({ message: "Error updating abstract approval", error: err.message });
  }
};

// Request an update on the paper’s abstract or other details
export const requestPaperUpdate = async (req, res) => {
  const { reviewId, updateRequest } = req.body;
  try {
    const toBeReviewed = await ToBeReviewed.findById(reviewId);
    if (!toBeReviewed) return res.status(404).json({ message: "Review record not found" });

    toBeReviewed.abstractUpdated = true;
    toBeReviewed.adminResponseMade = updateRequest;
    await toBeReviewed.save();

    res.status(200).json({ message: "Paper update requested", toBeReviewed });
  } catch (err) {
    res.status(400).json({ message: "Error requesting paper update", error: err.message });
  }
};
