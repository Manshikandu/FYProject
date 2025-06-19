// import express from "express";
// import { createBooking, getMyBookings } from "../controllers/Artist.Booking.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// // Protect routes so only logged in users can access
// router.post("/", protectRoute, createBooking);
// router.get("/my-bookings", protectRoute, getMyBookings);

// export default router;


import express from "express";
import { createBooking, getMyBookings } from "../controllers/Artist.Booking.controller.js";
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifytoken, createBooking);

router.get("/my-bookings", verifytoken, getMyBookings);

export default router;
