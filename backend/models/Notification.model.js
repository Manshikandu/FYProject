// const mongoose = require("mongoose");

// const notificationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   message: { type: String, required: true },
//   type: { type: String, enum: ["booking", "contract", "payment", "system"], default: "system" },
//   isRead: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Notification", notificationSchema);

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // refPath: "userType", // Dynamically reference either Client or Artist
  },
  // userType: {
  //   type: String,
  //   required: true,
  //   enum: ["Client", "Artist"], // match your model names
  // },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["booking", "contract", "payment", "system"],
    default: "system",
  },
  isRead: { type: Boolean, default: false },
 
}, {
  timestamps: true, 
});
const Notification= mongoose.model("Notification", notificationSchema);

export default Notification;