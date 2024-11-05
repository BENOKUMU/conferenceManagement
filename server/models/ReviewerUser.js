import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewerUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    role: { type: String, default: "ReviewerUser" },

    academicInterest: { type: Map, of: String },
    affiliation: { type: Map, of: String },
    reviewCapacity: Number,
    reviewedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

export default mongoose.model("ReviewerUser", reviewerUserSchema);
