import PaperSubmission from "../models/PaperSubmission.js";

export const createPaperSubmission = async (req, res) => {
  try {
    const newSubmission = new PaperSubmission(req.body);
    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePaperSubmission = async (req, res) => {
  try {
    const updatedSubmission = await PaperSubmission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSubmission)
      return res.status(404).json({ message: "Submission not found" });
    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const approveAbstract = async (req, res) => {
  try {
    const submission = await PaperSubmission.findById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    submission.abstractApproved = true;
    submission.adminResponseMade = true;
    await submission.save();

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requestPaperUpdate = async (req, res) => {
  try {
    const submission = await PaperSubmission.findById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    submission.paperUpdateRequest = true;
    await submission.save();

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaperSubmissionById = async (req, res) => {
  try {
    const submission = await PaperSubmission.findById(req.params.id)
      .populate("authors", "name email")
      .populate("correspondingAuthor", "name email");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePaperSubmission = async (req, res) => {
  try {
    const deletedSubmission = await PaperSubmission.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addAuthorToSubmission = async (req, res) => {
  try {
    const submission = await PaperSubmission.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { authors: req.body.authorId } },
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFileInSubmission = async (req, res) => {
  try {
    const { file, fileId } = req.body;
    const submission = await PaperSubmission.findByIdAndUpdate(
      req.params.id,
      { file, fileId },
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const revokePaperUpdateRequest = async (req, res) => {
  try {
    const submission = await PaperSubmission.findByIdAndUpdate(
      req.params.id,
      { paperUpdateRequest: false },
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};