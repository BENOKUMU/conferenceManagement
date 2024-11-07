import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    appliedStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
    canApply: { type: Map, of: String },
    options: [String],
    selectedOption: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    deadline: {
      endDate: { type: Date },
      startDate: { type: Date },
    },
    description: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    studentCapacity: { type: Number, required: true },
    submittedStudents: [{ type: Schema.Types.ObjectId, ref: "User" }],
    title: { type: String, required: true },
    topic: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
