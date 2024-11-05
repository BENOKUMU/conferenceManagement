import mongoose from "mongoose";

const { Schema } = mongoose;

const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String,
    role: { type: String, default: "AdminUser" },

    appliedStudents: [{ type: Schema.Types.ObjectId, ref: "AuthorUser" }],
    canApply: { type: Map, of: String },
    options: [String],
    selectedOption: String,
    deadline: { startDate: Date, endDate: Date },
    description: String,
    studentCapacity: Number,
    submittedStudents: [{ type: Schema.Types.ObjectId, ref: "AuthorUser" }],
    title: String,
    topic: String,
  },
  { timestamps: true }
);

export default mongoose.model("AdminUser", adminUserSchema);