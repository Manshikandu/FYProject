
import paypal from "../utils/paypal.js";
import Payment from "../models/Payment.model.js";
import Booking from "../models/Artist.Booking.model.js";
import { createNotificationAndEmit } from "../controllers/Notification.controller.js";


export const createPaypalOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId).populate("client artist");

    if (!booking || booking.contractStatus !== "signed") {
      return res.status(400).json({ success: false, message: "Booking not eligible for payment." });
    }

    const total = booking.advance ? booking.advance.toFixed(2) : booking.wage.toFixed(2);

    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: `http://localhost:3000/api/payments/paypal/capture`,
        cancel_url: `http://localhost:5173/payment/cancel`,
      },
      transactions: [{
        amount: { currency: "USD", total },
        description: `Booking payment for event at ${booking.location}`,
      }],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "PayPal payment creation failed." });
      }

      const approvalURL = paymentInfo.links.find(link => link.rel === "approval_url").href;

      // Save bookingId and paymentId in a cookie
      res.cookie("paypalBookingInfo", JSON.stringify({
        bookingId: booking._id.toString(),
        paymentId: paymentInfo.id,
      }), {
        httpOnly: true,
        maxAge: 10 * 60 * 1000, // 10 minutes
        sameSite: "Lax"
      });

      return res.status(200).json({ success: true, approvalURL });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const capturePaypalPayment = async (req, res) => {
  try {
    const { token, PayerID } = req.query;

    const cookieData = req.cookies.paypalBookingInfo;
    if (!cookieData) return res.status(400).json({ success: false, message: "Missing payment info in cookie" });

    const { bookingId, paymentId } = JSON.parse(cookieData);
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, paymentDetails) => {
      if (error) {
        console.error(error.response);
        return res.status(500).json({ success: false, message: "Payment execution failed." });
      }

      const paymentRecord = new Payment({
        bookingId: booking._id,
        clientId: booking.client,
        artistId: booking.artist,
        amount: booking.advance || booking.wage,
        currency: "USD",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        transactionId: paymentDetails.id,
        paidAt: new Date(),
        payerEmail: paymentDetails.payer.payer_info.email,
        paypalDetails: paymentDetails,
      });

      await paymentRecord.save();
      booking.lastActionTime = new Date();
      booking.isPaid = true;
      booking.status = "booked"; 
      await booking.save();

      const clientId = booking.client._id || booking.client; 

      // Notify client about successful payment
    await createNotificationAndEmit({
      userId: clientId,
      userType: "Client",
      type: "payment",
      message: `Your payment for booking ${bookingId} was successful.`,
    });

    // Notify artist about received payment
    await createNotificationAndEmit({
      userId: booking.artist,
      userType: "Artist",
      type: "payment",
      message: `You have received a payment for booking ${bookingId}.`,
    });

      // Clear cookie after use
      res.clearCookie("paypalBookingInfo");

      return res.redirect("http://localhost:5173/payment/success");
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
