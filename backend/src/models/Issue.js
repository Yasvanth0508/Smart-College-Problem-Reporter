import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    summary: {
      type: String
    },
    category: {
      type: String,
      enum: [
        "Electrical",
        "Plumbing",
        "Cleanliness",
        "Internet",
        "Classroom",
        "Other"
      ],
      default: "Other"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium"
    },
    imageUrl: {
      type: String
    },
    status: {
      type: String,
      enum: ["unsolved", "in_progress", "solved"],
      default: "unsolved"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
