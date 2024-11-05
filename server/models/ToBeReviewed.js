import mongoose from "mongoose";

const { Schema } = mongoose;

const toBeReviewedSchema = new Schema(
  {
    abstract: { type: String, required: true },
    abstractApproved: { type: Boolean, default: false },
    abstractUpdated: { type: Boolean, default: false },
    adminResponseMade: { type: Boolean, default: false },
    assignedReviewers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    authors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    correspondingAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: { type: String, default: null },
    fileId: { type: String, required: true },
    paperId: { type: String, required: true },
    prevData: {
      abstract: String,
      abstractApproved: Boolean,
      abstractUpdated: Boolean,
      adminResponseMade: Boolean,
      authors: [{ type: Schema.Types.ObjectId, ref: "User" }],
      correspondingAuthor: { type: Schema.Types.ObjectId, ref: "User" },
      file: { type: String, default: null },
      paperId: { type: String },
      projectId: { type: Schema.Types.ObjectId, ref: "Project" },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
    },
  },
  { timestamps: true }
);

const ToBeReviewed = mongoose.model("ToBeReviewed", toBeReviewedSchema);

export default ToBeReviewed;
