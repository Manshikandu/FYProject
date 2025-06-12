import express from 'express';
import { getAuthUrl, googleCallback, getBookedDates } from '../controllers/Calendar.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js'
const router = express.Router();

router.get("/auth",  getAuthUrl);
router.get("/callback", googleCallback)
router.get("/booked", protectRoute, getBookedDates);

// Temporary middleware
// const dummyAuth = (req, res, next) => {
//   req.user = { _id: '666abc123def456789012345' }; // Replace with a valid MongoDB ObjectId from your DB
//   next();
// };

// // Apply it before your callback
// router.get('/callback', dummyAuth, googleCallback);

export default router;