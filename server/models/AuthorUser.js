import mongoose from "mongoose";

const { Schema } = mongoose;

const authorUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    role: { type: String, default: "AuthorUser" },
    
    academicInterest: { type: Map, of: String },
    selectedOption: String,
    affiliation: { type: Map, of: String },
    appliedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    blocked: { type: Boolean, default: false },
    blockingReason: String,
    myStatus: String,
    paperResults: [
      {
        academicQuality: Number,
        academicQualityComment: String,
        contribution: Number,
        contributionComment: String,
        language: Number,
        languageComment: String,
        literatureReviewAndBibliography: Number,
        literatureReviewAndBibliographyComment: String,
        novelty: Number,
        noveltyComment: String,
        projectId: { type: Schema.Types.ObjectId, ref: "Project" },
        recommendation: String,
        styleAndFormat: Number,
        styleAndFormatComment: String,
        summary: String,
        topic: Number,
        topicComment: String,
        verificationOfResults: Number,
        verificationOfResultsComment: String,
        paperUpdated: Boolean,
      },
    ],
    submittedPapers: [
      {
        fileId: String,
        userId: { type: Schema.Types.ObjectId, ref: "AuthorUser" },
      },
    ],
    supervisor: { type: Map, of: String },
  },
  { timestamps: true }
);

export default mongoose.model("AuthorUser", authorUserSchema);
