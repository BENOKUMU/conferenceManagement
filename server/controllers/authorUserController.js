import AuthorUser from "../models/AuthorUser.js";


// Get a single AuthorUser by ID
export const getAuthorUserById = async (req, res) => {
  try {
    const authorUser = await AuthorUser.findById(req.params.id);
    if (!authorUser) return res.status(404).json({ message: "AuthorUser not found" });
    res.status(200).json(authorUser);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all AuthorUsers
export const getAllAuthorUsers = async (req, res) => {
  try {
    const authorUsers = await AuthorUser.find();
    res.status(200).json(authorUsers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update an AuthorUser by ID
export const updateAuthorUser = async (req, res) => {
  try {
    const updatedAuthorUser = await AuthorUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthorUser) return res.status(404).json({ message: "AuthorUser not found" });
    res.status(200).json({ message: "AuthorUser updated", authorUser: updatedAuthorUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating AuthorUser", error: err.message });
  }
};

// Delete an AuthorUser by ID
export const deleteAuthorUser = async (req, res) => {
  try {
    const deletedAuthorUser = await AuthorUser.findByIdAndDelete(req.params.id);
    if (!deletedAuthorUser) return res.status(404).json({ message: "AuthorUser not found" });
    res.status(200).json({ message: "AuthorUser deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a paper submission to an AuthorUser
export const addSubmittedPaper = async (req, res) => {
  const { fileId, userId } = req.body;
  try {
    const authorUser = await AuthorUser.findById(userId);
    if (!authorUser) return res.status(404).json({ message: "AuthorUser not found" });

    authorUser.submittedPapers.push({ fileId, userId });
    await authorUser.save();

    res.status(200).json({ message: "Paper submitted", authorUser });
  } catch (err) {
    res.status(400).json({ message: "Error adding paper", error: err.message });
  }
};

// Update paper results for an AuthorUser
export const updatePaperResults = async (req, res) => {
  const { authorUserId, paperResults } = req.body;
  try {
    const authorUser = await AuthorUser.findById(authorUserId);
    if (!authorUser) return res.status(404).json({ message: "AuthorUser not found" });

    authorUser.paperResults.push(paperResults);
    await authorUser.save();

    res.status(200).json({ message: "Paper results updated", authorUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating paper results", error: err.message });
  }
};

// Block or unblock an AuthorUser
export const toggleBlockAuthorUser = async (req, res) => {
  const { authorUserId, block, blockingReason } = req.body;
  try {
    const authorUser = await AuthorUser.findById(authorUserId);
    if (!authorUser) return res.status(404).json({ message: "AuthorUser not found" });

    authorUser.blocked = block;
    if (block) {
      authorUser.blockingReason = blockingReason;
    } else {
      authorUser.blockingReason = null;
    }

    await authorUser.save();
    res.status(200).json({ message: `AuthorUser ${block ? "blocked" : "unblocked"}`, authorUser });
  } catch (err) {
    res.status(400).json({ message: "Error toggling block status", error: err.message });
  }
};
