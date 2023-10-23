const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  KeyResponsibilities: {
    type: [String],
    required: true,
  },
  qualifications: {
    type: [String],
    required: true,
  },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: {
    type: String,
  },
  description: {
    type: [String, String],
    required: true,
  },
  degree: String,
  datePosted: { type: Date, default: Date.now },
  jobType: {
    type: String,
    enum: ["Full Time", "Contract", "Internship", "Part Time"],
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Development",
      "Design",
      "Marketing",
      "Customer Support",
      "Product Management",
      "Human Resources",
    ],
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
