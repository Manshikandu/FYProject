import Booking from "../../models/Artist.Booking.model.js";

export const getArtistBookings = async (req, res) => {
  try {
    if (!req.user) {
      console.log("No user in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const artistId = req.user._id;
    console.log("Artist ID:", artistId);

    const bookings = await Booking.find({ artist: artistId })
      .populate("client", "username email phone");

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error in getArtistBookings:", error); // log full error!
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
    await booking.save();

    res.status(200).json({ message: `Booking ${status}`, booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Server error updating booking status" });
  }
};
