import mongoose from "mongoose";
import Booking from "../../models/Artist.Booking.model.js";
import { createNotificationAndEmit } from "../Notification.controller.js";
import { calculateBookingScore } from "../../utils/bookingPriority.js";
import Payment from "../../models/Payment.model.js";

export const getArtistBookings = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const artistId = req.user._id;
    const { sortBy = "priority", sortOrder = "desc" } = req.query;

    let sortField;
    let order = sortOrder === "asc" ? 1 : -1;

    switch (sortBy) {
      case "newest":
        sortField = "createdAt";
        break;
      case "oldest":
        sortField = "createdAt";

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
console.log("Bookings fetched:", bookings);

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error in getArtistBookings:", error);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};



export const updateBookingStatus = async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    const result = await session.withTransaction(async () => {
      const artistId = req.user._id;
      const { bookingId } = req.params;
      const { status } = req.body; // expected values: "accepted", "rejected"

      const booking = await Booking.findById(bookingId).session(session);
      if (!booking) {
        throw new Error("Booking not found");
      }

      if (booking.artist.toString() !== artistId.toString()) {
        throw new Error("Unauthorized");
      }
      
      // For acceptance, check for conflicts one more time atomically
      if (status === "accepted") {
        const BUFFER_MS = 15 * 60 * 1000; // 30 minutes buffer
        const newStart = new Date(booking.startTime).getTime();
        const newEnd = new Date(booking.endTime).getTime();

        const conflictingBooking = await Booking.findOne({
          _id: { $ne: booking._id }, // Exclude current booking
          artist: booking.artist,
          status: { $in: ['accepted', 'booked'] },
          $or: [
            {
              startTime: { $lte: new Date(newEnd) },
              endTime: { $gt: new Date(newStart - BUFFER_MS) }
            },
            {
              startTime: { $lt: new Date(newEnd + BUFFER_MS) },
              endTime: { $gte: new Date(newStart) }
            },
            {
              startTime: { $gte: new Date(newStart - BUFFER_MS) },
              endTime: { $lte: new Date(newEnd + BUFFER_MS) }
            }
          ]
        }).session(session);
        
        if (conflictingBooking) {
          throw new Error("Cannot accept: Time slot conflicts with another accepted/booked appointment.");
        }
      }
      
      booking.status = status;
      booking.lastActionTime = new Date();
      
      await booking.save({ session });
      return booking;
    });

    await session.endSession();

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
        userId: result.client,      
        userType: "Client",
        type: "booking",
        message,
      });
    }

    res.status(200).json({ message: `Booking ${status}`, booking: result });
    
  } catch (error) {
    await session.endSession();
    console.error("Error updating booking status:", error);
    
    if (error.message === "Booking not found") {
      return res.status(404).json({ message: error.message });
    }
    
    if (error.message === "Unauthorized") {
      return res.status(403).json({ message: error.message });
    }
    
    if (error.message.includes("Cannot accept: Time slot conflicts")) {
      return res.status(409).json({ 
        message: error.message,
        type: "CONFLICT_ERROR"
      });
    }
    
    res.status(500).json({ message: "Server error updating booking status" });
  }
};

// export const cancelBookingByArtist = async (req, res) => {
//   try {
//     const bookingId = req.params.id;
//     const userId = req.user.id; // logged-in artist id

//     const booking = await Booking.findById(bookingId)
//       .populate("client", "username email")
//       .populate("artist", "username email");

//     if (!booking) return res.status(404).json({ message: "Booking not found." });

//     if (booking.artist._id.toString() !== userId) {
//       return res.status(403).json({ message: "You can only cancel your own bookings." });
//     }

//     if (["cancelled", "completed"].includes(booking.status)) {
//       return res.status(400).json({ message: `Cannot cancel a ${booking.status} booking.` });
//     }

//     booking.status = "cancelled";
//     booking.cancelledBy = "artist";

//     const payments = await Payment.find({ bookingId: booking._id, paymentStatus: "paid" });

//     for (const payment of payments) {
//       try {
//         if (payment.paymentMethod === "PayPal" && payment.transactionId) {
//           await refundPayment(payment.transactionId);
//           payment.paymentStatus = "refunded";
//           await payment.save();
//         }
//       } catch (refundError) {
//         console.error("Refund error:", refundError.message);
//         return res.status(500).json({ message: "Refund failed", error: refundError.message });
//       }
//     }

//     await booking.save();

//     // Notify client
//     await createNotificationAndEmit({
//       userId: booking.client._id,
//       userType: "Client",
//       type: "booking",
//       message: `Booking on ${booking.eventDate.toDateString()} was cancelled by the artist.`,
//     });

//     // Notify artist
//     await createNotificationAndEmit({
//       userId: booking.artist._id,
//       userType: "Artist",
//       type: "booking",
//       message: `You cancelled the booking on ${booking.eventDate.toDateString()}.`,
//     });

//     return res.status(200).json({ message: "Booking cancelled and refunds processed if applicable." });
//   } catch (err) {
//     console.error("Artist Cancel Booking error:", err);
//     return res.status(500).json({ message: "Server error." });
//   }
// };



export const requestCancellationByArtist = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId)
      .populate("client", "username email")
      .populate("artist", "username email");

    if (!booking) return res.status(404).json({ message: "Booking not found." });

    if (booking.artist._id.toString() !== userId) {
      return res.status(403).json({ message: "You can only request cancellation for your own bookings." });
    }

    if (["cancelled", "completed", "cancellation_requested_by_client", "cancellation_requested_by_artist"].includes(booking.status)) {
      return res.status(400).json({ message: `Cannot request cancellation for a booking with status ${booking.status}.` });
    }

    booking.status = "cancellation_requested_by_artist"; // Artist requested cancellation
    booking.cancelledBy = "artist";

    await booking.save();

    // Notify client about cancellation request
    await createNotificationAndEmit({
      userId: booking.client._id,
      userType: "Client",
      type: "booking_cancellation_request",
      message: `Artist ${booking.artist.username} has requested cancellation for booking on ${booking.eventDate.toDateString()}. Please respond.`,
      bookingId: booking._id.toString(),
    });

    return res.status(200).json({ message: "Cancellation request sent to client." });
  } catch (err) {
    console.error("Artist cancellation request error:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

export const approveClientCancellationByArtist = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id; // artist ID

    const booking = await Booking.findById(bookingId)
      .populate("client")
      .populate("artist");

    if (!booking) return res.status(404).json({ message: "Booking not found." });

    if (booking.artist._id.toString() !== userId) {
      return res.status(403).json({ message: "You can only approve cancellations for your own bookings." });
    }

    if (booking.status !== "cancellation_requested_by_client") {
      return res.status(400).json({ message: "No client cancellation request pending for approval." });
    }

    booking.status = "cancelled";

    // Update payment statuses
    const payments = await Payment.find({ bookingId: booking._id, paymentStatus: "paid" });
    for (const payment of payments) {
      payment.paymentStatus = "refunded"; // or "unpaid" if refund is offline
      await payment.save();
    }

    await booking.save();

    // Notify both parties
    await createNotificationAndEmit({
      userId: booking.client._id,
      userType: "Client",
      type: "booking",
      message: `Your cancellation request for booking on ${booking.eventDate.toDateString()} was approved by the artist.`,
    });

    await createNotificationAndEmit({
      userId: booking.artist._id,
      userType: "Artist",
      type: "booking",
      message: `You approved the client's cancellation request for booking on ${booking.eventDate.toDateString()}.`,
    });

    return res.status(200).json({ message: "Client cancellation approved and booking cancelled." });
  } catch (err) {
    console.error("Artist approval error:", err);
    return res.status(500).json({ message: "Server error." });
  }
};
