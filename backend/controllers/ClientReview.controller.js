import Review from "../models/Review.model.js"; 
import Booking from "../models/Artist.Booking.model.js";
import { createNotificationAndEmit } from "./notification.controller.js"; 
import { updateArtistBayesianRating } from "../utils/RatingUtils.js";

export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, reviewText } = req.body;
    const clientId = req.user._id;

    // Get booking info
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found." });

    const artistId = booking.artist; 

    // Check for duplicate exact review
    const existingExact = await Review.findOne({
      clientId,
      bookingId,
      reviewText: reviewText.trim(),
    });
    if (existingExact) {
      return res.status(400).json({ message: "Duplicate review detected." });
    }

    // Check recent review (spam protection)
    const recentReview = await Review.findOne({
      clientId,
      createdAt: { $gte: new Date(Date.now() - 60 * 1000) },
    });
    if (recentReview) {
      return res.status(429).json({
        message: "You are submitting reviews too quickly. Please wait.",
      });
    }

    // Validate review length
    if (reviewText.length < 10 || reviewText.length > 1000) {
      return res.status(400).json({
        message: "Review length must be between 10 and 1000 characters.",
      });
    }

    // Check for suspicious characters
    if (/(.)\1{4,}/.test(reviewText)) {
      return res.status(400).json({
        message: "Review contains suspicious character patterns.",
      });
    }

    // Save review with correct artistId
    const newReview = new Review({
      bookingId,
      clientId,
      artistId,
      rating,
      reviewText,
      status: "confirmed", // or "pending" depending on your logic
    });

    await newReview.save();

    await updateArtistBayesianRating(artistId);

    // Send notification to artist about the new review
    await createNotificationAndEmit({
      userId: artistId,
      userType: "artist",
      type: "review",
      message: `You received a new review from a client.`,
    });


    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Failed to create review", error: error.message });
  }
};

// Get all reviews by the current client
export const getClientReviews = async (req, res) => {
  try {
    const clientId = req.user._id;
    const reviews = await Review.find({ clientId }).populate("artistId", "username");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

// Get reviews for a specific artist
export const getReviewsForArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const reviews = await Review.find({ artistId, status: "confirmed" }).populate("clientId", "username profilePicture");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch artist reviews", error: error.message });
  }
};
