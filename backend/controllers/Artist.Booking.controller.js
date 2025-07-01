import Booking from "../models/Artist.Booking.model.js";
import Artist from "../models/Artist.model.js";


export const createBooking = async (req, res) => {
  try {
    const {
      eventDate,
      startTime,
      endTime,
      location,
      coordinates,
      contactName,
      contactEmail,
      contactPhone,
      eventType,
      eventDetails,
      notes,
      artistId, 
    } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
if (!emailRegex.test(contactEmail)) {
  return res.status(400).json({ message: "Invalid email address." });
}


    const clientId = req.user._id;


    const artistExists = await Artist.findById(artistId);
    if (!artistExists) {
      return res.status(404).json({ message: "Artist not found" });
    }

//added
    const eventDateStart = new Date(eventDate);
    eventDateStart.setHours(0, 0, 0, 0);
    const eventDateEnd = new Date(eventDate);
    eventDateEnd.setHours(23, 59, 59, 999);

  
    const existingBookings = await Booking.find({
      artist: artistId,
      eventDate: { $gte: eventDateStart, $lte: eventDateEnd },
      status: { $in: ["accepted", "booked"] },
    });

    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);

    const BUFFER_MINUTES = 30;
    const BUFFER_MS = BUFFER_MINUTES * 60 * 1000;

    const isConflict = existingBookings.some(booking => {
      const existingStart = new Date(booking.startTime).getTime() - BUFFER_MS;
      const existingEnd = new Date(booking.endTime).getTime() + BUFFER_MS;
      const newStartTime = new Date(startTime).getTime();
      const newEndTime = new Date(endTime).getTime();

      return Math.max(existingStart, newStartTime) < Math.min(existingEnd, newEndTime);
    });

    if (isConflict) {
      return res.status(409).json({ message: "Booking conflict: The selected time slot is already booked." });
    }

    const newBooking = new Booking({
      client: clientId,
      artist: artistId,
      eventDate,
      startTime,
      endTime,
      location,
      coordinates,
      contactName,
      contactEmail,
      contactPhone,
      eventType,
      eventDetails,
      notes,
      status: "pending",
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking request sent successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server error while creating booking" });
  }
};


export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id; 

    let bookings;


    if (req.user.role === "client") {
      bookings = await Booking.find({ client: userId })

        .populate("artist", "username email phone")
        .sort({ createdAt: -1 });
    } else if (req.user.role === "artist") {
      bookings = await Booking.find({ "artist": userId })
        .populate("client", "username email phone")
        .sort({ createdAt: -1 });
    } else {
      return res.status(403).json({ error: "Invalid role" });
    }

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Server error while fetching bookings" });
  }
};


export const getBookedSlotsForArtist = async (req, res) => {
  try {
    const { artistId } = req.params;

    const bookings = await Booking.find({
      artist: artistId,
      status: { $in: ["accepted", "booked"] },
    }).select("eventDate startTime endTime status");  // Added status

    res.status(200).json({ bookedSlots: bookings });
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    res.status(500).json({ message: "Server error fetching booked slots" });
  }
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("artist", "username email phone category") 
      .populate("client", "username email phone");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // console.log("Logged in user ID:", req.user?._id);
    // console.log("Booking client ID:", booking.client._id.toString());
    // console.log("Booking artist ID:", booking.artist._id.toString());
    
    const userIdStr = req.user._id.toString();

    if (
  booking.client._id.toString() !== userIdStr &&
  booking.artist._id.toString() !== userIdStr
) {
  return res.status(403).json({ message: "Access denied to this booking" });
}

    res.json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Error fetching booking details" });
  }
};