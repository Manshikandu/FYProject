import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming artists are also stored in the User model
    required: true
  },
  jobPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
    required: false
  },
  eventTitle: {
    type: String,
    required: [true, "Event title is required"]
  },
  eventDate: {
    type: Date,
    required: [true, "Event date is required"]
  },
  location: {
    type: String,
    required: [true, "Event location is required"]
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending"
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"]
  },
  messages: [
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      message: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
