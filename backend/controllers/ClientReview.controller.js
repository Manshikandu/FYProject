export const createReview = async (req, res) => {
  try {
    const { bookingId, artistId, rating, reviewText } = req.body;
    const clientId = req.user._id; // Assuming `protectRoute` middleware sets req.user

    const newReview = new Review({
      bookingId,
      clientId,
      artistId,
      rating,
      reviewText,
    });

    await newReview.save();
    res.status(201).json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Failed to create review", error: error.message });
  }
};

// Get all reviews by the current client
export const getClientReviews = async (req, res) => {
  try {
    const clientId = req.user._id;
    const reviews = await Review.find({ clientId }).populate("artistId", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

// Get reviews for a specific artist
export const getReviewsForArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const reviews = await Review.find({ artistId }).populate("clientId", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch artist reviews", error: error.message });
  }
};