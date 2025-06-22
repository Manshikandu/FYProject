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

    const clientId = req.user._id;


    const artistExists = await Artist.findById(artistId);
    if (!artistExists) {
      return res.status(404).json({ message: "Artist not found" });
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
    const userId = req.user.id; //  set by verifytoken middleware

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