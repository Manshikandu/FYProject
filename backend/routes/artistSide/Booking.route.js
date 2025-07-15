import express from "express";
import { getArtistBookings, updateBookingStatus ,requestCancellationByArtist, approveClientCancellationByArtist } from "../../controllers/artistSide/Booking.controller.js";
import { verifytoken } from "../../middleware/verifyToken.js";

const router = express.Router();

router.get("/my-bookings", verifytoken, getArtistBookings);

router.put("/:bookingId/status",verifytoken, updateBookingStatus);

// router.patch("/:id/cancel", verifytoken, cancelBookingByArtist);
router.patch("/:id/request-cancel", verifytoken, requestCancellationByArtist);
router.patch("/:id/approve-cancel", verifytoken, approveClientCancellationByArtist);


export default router;
