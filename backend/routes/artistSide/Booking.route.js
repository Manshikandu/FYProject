import express from "express";
import { getArtistBookings, updateBookingStatus } from "../../controllers/artistSide/Booking.controller.js";
import { verifytoken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.get("/artist/my-bookings", verifytoken, getArtistBookings);

router.put("/artist/:bookingId/status",verifytoken, updateBookingStatus);

export default router;
