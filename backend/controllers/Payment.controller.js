// controllers/Payment.controller.js
import Payment from "../models/Payment.model.js";

// Create payment record
export const createPayment = async (req, res) => {
  try {
    const { bookingId, artistId, amount, paymentMethod, transactionId } = req.body;
    const clientId = req.user._id;

    const payment = new Payment({
      bookingId,
      clientId,
      artistId,
      amount,
      paymentMethod,
      transactionId,
      status: "paid" // assuming successful for now
    });

    await payment.save();
    res.status(201).json({ message: "Payment recorded", payment });
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment", error: err.message });
  }
};

// Get payments of a client
export const getClientPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ clientId: req.user._id }).populate("artistId", "name").populate("bookingId");
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payments", error: err.message });
  }
};

// Get payments of an artist
export const getArtistPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ artistId: req.user._id }).populate("clientId", "name").populate("bookingId");
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artist payments", error: err.message });
  }
};
