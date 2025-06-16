import express from "express";
import { createBooking, getMyBookings } from "../controllers/Artist.Booking.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes, user must be logged in
router.post("/", protectRoute, createBooking);
router.get("/my-bookings", protectRoute, getMyBookings);

export default router;
