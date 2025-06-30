import express from "express";
import { createBooking, getMyBookings,getBookedSlotsForArtist, getBookingById } from "../controllers/Artist.Booking.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifytoken, createBooking);

router.get("/my-bookings", verifytoken, getMyBookings);


router.get("/artist/:artistId/booked-slots", getBookedSlotsForArtist);


router.get("/:id", verifytoken, getBookingById);

export default router;