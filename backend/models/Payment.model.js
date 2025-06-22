import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "NPR" // or USD, etc.
  },
  paymentMethod: {
    type: String,
    enum: ["Khalti", "eSewa", "Card", "Bank Transfer", "Cash"],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending"
  },
  transactionId: {
    type: String, // From third-party payment gateway
    unique: true,
    sparse: true
  },
  paidAt: {
    type: Date
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
