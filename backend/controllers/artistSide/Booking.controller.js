import Booking from "../../models/Artist.Booking.model.js";
import { createNotificationAndEmit } from "../Notification.controller.js";
import { calculateBookingScore } from "../../utils/bookingPriority.js";

export const getArtistBookings = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const artistId = req.user._id;
    const { sortBy = "priority", sortOrder = "desc" } = req.query;

    // Map frontend sortBy to backend fields
    let sortField;
    let order = sortOrder === "asc" ? 1 : -1;

    switch (sortBy) {
      case "newest":
        sortField = "createdAt";
        break;
      case "oldest":
        sortField = "createdAt";
        // if sortOrder is not explicitly passed, flip to asc for oldest
        if (!req.query.sortOrder) order = 1;
        break;
      case "recentUpdated":
        sortField = "updatedAt";
        break;
      case "priority":
        // priority sorting needs special handling below
        sortField = null;
        break;
      default:
        // fallback to updatedAt desc
        sortField = "updatedAt";
        break;
    }

    let bookings = await Booking.find({ artist: artistId })
  .populate("client", "username email phone profilePicture")
  .populate("payments"); 

    if (sortBy === "priority") {
      // Calculate score and sort in memory
      const scored = bookings.map((b) => ({
        ...b.toObject(),
        score: calculateBookingScore(b),
      }));
      bookings = scored.sort((a, b) => (order === 1 ? a.score - b.score : b.score - a.score));
    } else if (sortField) {
      bookings = bookings.sort((a, b) => {
        const aDate = new Date(a[sortField]);
        const bDate = new Date(b[sortField]);
        return order === 1 ? aDate - bDate : bDate - aDate;
      });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error in getArtistBookings:", error);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};



export const updateBookingStatus = async (req, res) => {
  try {
    const artistId = req.user._id;
    const { bookingId } = req.params;
    const { status } = req.body; // expected values: "accepted", "rejected"

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.artist.toString() !== artistId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = status;
          // Update lastActionTime to now for sorting priority
    booking.lastActionTime = new Date();
    await booking.save();

     //  Create notification for client
     const artistName = req.user?.username || "An artist";
    let message = "";
    if (status === "accepted") {
      message = `Your booking request was accepted by ${artistName}.`;
    } else if (status === "rejected") {
      message = `Your booking request was rejected by ${artistName}.`;
    }

    if (message) {
      await createNotificationAndEmit({
        userId: booking.client,       // client user ID
        userType: "Client",
        type: "booking",
        message,
      });
    }

    res.status(200).json({ message: `Booking ${status}`, booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Server error updating booking status" });
  }
};
