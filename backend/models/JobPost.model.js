import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: [true, "Job title is required"]
  },
  description: {
    type: String,
    required: [true, "Job description is required"]
  },
  location: {
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, default: "Nepal" }
  },
  date: {
    type: Date,
    required: [true, "Event date is required"]
  },
  time: {
    type: String,
    required: [true, "Event time is required"]
  },
  budget: {
    type: Number,
    required: [true, "Budget is required"]
  },
  artistType: {
    type: [String],
    enum: ["Musician", "Singer", "Dancer", "DJ", "MC", "Photography", "Other"],
    required: [true, "At least one artist type is required"]
  },
  status: {
    type: String,
    enum: ["open", "closed", "booked"],
    default: "open"
  }
}, {
  timestamps: true
});

const JobPost = mongoose.model("JobPost", jobPostSchema);

export default JobPost;
