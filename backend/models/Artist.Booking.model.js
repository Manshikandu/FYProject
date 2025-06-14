import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // client
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // artist user
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
    eventType: { type: String },
    eventDetails: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "booked", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const bookingSchema = new mongoose.Schema({
    name:
    {
        type: string,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    },
    eventDate:{
        type: Date,
        required: true,
    },
    StartTime:{
        type: Date,
    },
    endTime:{
        type: Date,
    },
    location: 
    { 
        type: String, 
        required: true 
    },
    coordinates: 
    {
      lat: Number,
      lng: Number,
    },
    eventType: String,
    eventDetails: String,
    notes: String,

    artistId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Artist" 
    },
    clientId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }, 
    status:{
        type: String,
        // enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    
    
},
{timestamps: true});


export default mongoose.model("Booking", BookingSchema);
