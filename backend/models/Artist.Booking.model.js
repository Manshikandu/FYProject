//Artist.Booking.model.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    client: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, 
    artist: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Artist", 
      required: true 
    }, 
    eventDate: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    eventType: String,
    eventDetails: String,
    notes: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "booked", "completed", "cancelled"],
      default: "pending",
    },
    // Contract related fields
    totalHours: { type: Number },                   
    wage: { type: Number },                         
    clientSignature: { type: String },               
    artistSignature: { type: String },              
    contractStatus: {
      type: String,
      enum: ["none", "draft", "signed"],
      default: "none",
    },
    contractUrl: { type: String },                    
    clientSignatureDate: { type: Date },
    artistSignatureDate: { type: Date },

   isPaid: { type: Boolean, default: false },

   advance: { type: Number },
    
    lastActionTime: {
      type: Date,
      default: Date.now,
      required: true,
    },

  },  
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
