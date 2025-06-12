import JobPost from "../models/JobPost.model"
import Booking from "../models/Artist.Booking.model";


//create job post
export const createJobPost = async(req, res) => {
try{
const{title,description,location,date,time,budget,artistType} = req.body;

const clientId = req.user._id ; //Assume you are using auth middleware to set req.body;

const job = await JobPost.create({
    clientId,
    title,
    description,
    location,
    date,
    time,
    budget,
    artistType

});
res.status(201).json({
    success: true,
    message: "job created succesfully",
    data: job
});
} catch(error) {
    console.error("Error in creating job post:",error.message);
    res.status(500).json({
        success: false,
        message: "Failed to create job post"
    });
}

};
//create booking
export const createBooking = async (req, res) => {
  try {
    const {artistId,jobPostId,eventTitle,eventDate,location,totalPrice } = req.body;

    const clientId = req.user._id;  // Assume req.user is set by auth middleware

    
    const booking = await Booking.create({
      clientId,
      artistId,
      jobPostId,
      eventTitle,
      eventDate,
      location,
      totalPrice,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "Booking request sent",
      data: booking
    });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error.message
    });
  }
};


//for reviewing the artist
export const createReview = async (req, res) => {
  const { bookingId } = req.params;
  const clientId = req.user._id;
  const { rating, reviewText } = req.body;

  try {
    
    // Check if booking exists and belongs to this client
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.clientId.toString() !== clientId.toString())
      return res.status(403).json({ message: "Not authorized to review this booking" });

    if (booking.status !== "completed") {
      return res.status(400).json({ message: "Cannot review an incomplete booking" });
    }

    // Check if a review already exists for this booking
    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(400).json({ message: "Review already submitted for this booking" });
    }
    const artistId = req.user._id
    const newReview = await Review.create({
      
      bookingId,
      clientId,
      //artistId: booking.artistId,
      artistId,
      rating,
      reviewText,
    });

    return res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (err) {
    console.error("Create review error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};



