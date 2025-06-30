import express from "express";
import { getArtistBookings, updateBookingStatus } from "../../controllers/artistSide/Booking.controller.js";
import { verifytoken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.get("/my-bookings", verifytoken, getArtistBookings);

router.put("/:bookingId/status",verifytoken, updateBookingStatus);

export default router;
