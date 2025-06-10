import express from 'express';
import { bookingArtist, BookingStatus, getBookingRequest } from "../controllers/Artist.Booking.controller.js";

const router = express.Router();
router.post('/request',bookingArtist);
router.get('/artist/:artistId', getBookingRequest);
router.put('/artist/:bookingId/status', BookingStatus);
export default router;