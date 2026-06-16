const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    jobTitle: {
      type: String,
    },

    role: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    portfolio: {
      type: String,
      trim: true,
    },

    technicalSkills: {
      type: String,
      trim: true,
    },

    softSkills: {
      type: String,
      trim: true,
    },

    coverLetter: {
      type: String,
    },

    resumeUrl: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Application", applicationSchema);
