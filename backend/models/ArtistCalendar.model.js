// models/ArtistCalendar.js
import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  // Array of booked slots for that artist
  bookedSlots: [
    {
      eventDate: Date,
      startTime: Date,
      endTime: Date,
      bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    }
  ],
}, { timestamps: true });

export default mongoose.model("ArtistCalendar", calendarSchema);
