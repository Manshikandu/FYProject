import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      name, email, phone,
      date, startTime, endTime,
      location, coordinates,
      eventType, eventDetails, notes,
       artistId,
    } = req.body;
   const clientId = req.user.id;


    if (!name || !email || !date || !location) {
      return res.status(400).json({ error: "Name, email, date, and location are required." });
    }

    const newBooking = new Booking({
      name,
      email,
      phone,
      date,
      startTime,
      endTime,
      location,
      coordinates,
      eventType,
      eventDetails,
      notes,
      clientId,
      artistId,
      status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "contract_generated"],
    default: "pending",
  },
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });

  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};