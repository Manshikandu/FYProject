// import express from "express";
// import { getMyBookings } from "../controllers/Artist.Booking.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();


// router.post("/", protectRoute, createBooking);
// router.get("/my-bookings", protectRoute, getMyBookings);

// export default router;



import express from "express";
import { createBooking, getMyBookings,getBookedSlotsForArtist, getBookingById } from "../controllers/Artist.Booking.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifytoken, createBooking);

router.get("/my-bookings", verifytoken, getMyBookings);

// Add this new route:
router.get("/artist/:artistId/booked-slots", getBookedSlotsForArtist);


// ✅ Add this line for single booking fetch
router.get("/:id", verifytoken, getBookingById);

export default router;