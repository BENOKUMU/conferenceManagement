import mongoose from "mongoose";

const { Schema } = mongoose;

const paperSubmissionSchema = new Schema(
  {
    abstract: { type: String, required: true },
    abstractApproved: { type: Boolean, default: false },
    abstractUpdated: { type: Boolean, default: false },
    adminResponseMade: { type: Boolean, default: false },
    authors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    correspondingAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: { type: String, default: null },
    fileId: { type: String, required: true },
    paperId: { type: String, required: true, unique: true },
    paperUpdateRequest: { type: Boolean, default: false },
    prevData: {
      projectId: { type: Schema.Types.ObjectId, ref: "Project" },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
  },
  { timestamps: true }
);

const PaperSubmission = mongoose.model(
  "PaperSubmission",
  paperSubmissionSchema
);

export default PaperSubmission;