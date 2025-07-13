
// import paypal from "../utils/paypal.js";
// import Payment from "../models/Payment.model.js";
// import Booking from "../models/Artist.Booking.model.js";
// import { createNotificationAndEmit } from "../controllers/Notification.controller.js";


// export const createPaypalOrder = async (req, res) => {
//   try {
//     const { bookingId } = req.body;
//     const booking = await Booking.findById(bookingId).populate("client artist");

//     if (!booking || booking.contractStatus !== "signed") {
//       return res.status(400).json({ success: false, message: "Booking not eligible for payment." });
//     }

//     const total = booking.advance ? booking.advance.toFixed(2) : booking.wage.toFixed(2);

//     const create_payment_json = {
//       intent: "sale",
//       payer: { payment_method: "paypal" },
//       redirect_urls: {
//         return_url: `http://localhost:3000/api/payments/paypal/capture`,
//         cancel_url: `http://localhost:5173/payment/cancel`,
//       },
//       transactions: [{
//         amount: { currency: "USD", total },
//         description: `Booking payment for event at ${booking.location}`,
//       }],
//     };

//     paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "PayPal payment creation failed." });
//       }

//       const approvalURL = paymentInfo.links.find(link => link.rel === "approval_url").href;

//       // Save bookingId and paymentId in a cookie
//       res.cookie("paypalBookingInfo", JSON.stringify({
//         bookingId: booking._id.toString(),
//         paymentId: paymentInfo.id,
//       }), {
//         httpOnly: true,
//         maxAge: 10 * 60 * 1000, // 10 minutes
//         sameSite: "Lax"
//       });

//       return res.status(200).json({ success: true, approvalURL });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// export const capturePaypalPayment = async (req, res) => {
//   try {
//     const { token, PayerID } = req.query;

//     const cookieData = req.cookies.paypalBookingInfo;
//     if (!cookieData) return res.status(400).json({ success: false, message: "Missing payment info in cookie" });

//     const { bookingId, paymentId } = JSON.parse(cookieData);
//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

//     paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, paymentDetails) => {
//       if (error) {
//         console.error(error.response);
//         return res.status(500).json({ success: false, message: "Payment execution failed." });
//       }

//       const paymentRecord = new Payment({
//         bookingId: booking._id,
//         clientId: booking.client,
//         artistId: booking.artist,
//         amount: booking.advance || booking.wage,
//         currency: "USD",
//         paymentMethod: "PayPal",
//         paymentStatus: "paid",
//         transactionId: paymentDetails.id,
//         paidAt: new Date(),
//         payerEmail: paymentDetails.payer.payer_info.email,
//         paypalDetails: paymentDetails,
//       });

//       await paymentRecord.save();
//       booking.lastActionTime = new Date();
//       booking.isPaid = true;
//       booking.status = "booked"; 
//       await booking.save();

//       const clientId = booking.client._id || booking.client; 

//       // Notify client about successful payment
//     await createNotificationAndEmit({
//       userId: clientId,
//       userType: "Client",
//       type: "payment",
//       message: `Your payment for booking ${bookingId} was successful.`,
//     });

//     // Notify artist about received payment
//     await createNotificationAndEmit({
//       userId: booking.artist,
//       userType: "Artist",
//       type: "payment",
//       message: `You have received a payment for booking ${bookingId}.`,
//     });

//       // Clear cookie after use
//       res.clearCookie("paypalBookingInfo");

//       return res.redirect("http://localhost:5173/payment/success");
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };













// /////////dubai payment sangai but no confirmCompletionPage///////////
// import paypal from "../utils/paypal.js";
// import Payment from "../models/Payment.model.js";
// import Booking from "../models/Artist.Booking.model.js";
// import { createNotificationAndEmit } from "../controllers/Notification.controller.js";

// export const createPaypalOrder = async (req, res) => {
//   try {
//     const { bookingId, type = "advance" } = req.body; // added type here
//     const booking = await Booking.findById(bookingId).populate("client artist");

//     if (!booking || booking.contractStatus !== "signed") {
//       return res.status(400).json({ success: false, message: "Booking not eligible for payment." });
//     }

//     // Prevent final payment before event ends
//     if (type === "final" && new Date() < new Date(booking.endTime)) {
//       return res.status(400).json({ success: false, message: "Final payment allowed only after event ends." });
//     }

//     let total;
//     if (type === "advance") {
//       total = booking.advance ? booking.advance.toFixed(2) : booking.wage.toFixed(2);
//     } else if (type === "final") {
//       if (!booking.advance) {
//         // no advance, so full amount should be paid in advance payment itself
//         return res.status(400).json({ success: false, message: "No final payment required." });
//       }
//       total = (booking.wage - booking.advance).toFixed(2);
//       if (total <= 0) {
//         return res.status(400).json({ success: false, message: "No remaining balance for final payment." });
//       }
//     } else {
//       return res.status(400).json({ success: false, message: "Invalid payment type." });
//     }

//     const create_payment_json = {
//       intent: "sale",
//       payer: { payment_method: "paypal" },
//       redirect_urls: {
//         return_url: `http://localhost:3000/api/payments/paypal/capture`,
//         cancel_url: `http://localhost:5173/payment/cancel`,
//       },
//       transactions: [{
//         amount: { currency: "USD", total },
//         description: `Booking ${type} payment for event at ${booking.location}`,
//       }],
//     };

//     paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "PayPal payment creation failed." });
//       }

//       const approvalURL = paymentInfo.links.find(link => link.rel === "approval_url").href;

//       // Save bookingId, paymentId, and paymentType in a cookie
//       res.cookie("paypalBookingInfo", JSON.stringify({
//         bookingId: booking._id.toString(),
//         paymentId: paymentInfo.id,
//         paymentType: type
//       }), {
//         httpOnly: true,
//         maxAge: 10 * 60 * 1000, // 10 minutes
//         sameSite: "Lax"
//       });

//       return res.status(200).json({ success: true, approvalURL });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export const capturePaypalPayment = async (req, res) => {
//   try {
//     const { token, PayerID } = req.query;

//     const cookieData = req.cookies.paypalBookingInfo;
//     if (!cookieData) return res.status(400).json({ success: false, message: "Missing payment info in cookie" });

//     const { bookingId, paymentId, paymentType } = JSON.parse(cookieData);
//     const booking = await Booking.findById(bookingId).populate("client artist");
//     if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

//     paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, paymentDetails) => {
//       if (error) {
//         console.error(error.response);
//         return res.status(500).json({ success: false, message: "Payment execution failed." });
//       }

//       let amountPaid;
//       if (paymentType === "advance") {
//         amountPaid = booking.advance ? booking.advance : booking.wage;
//       } else if (paymentType === "final") {
//         amountPaid = booking.wage - (booking.advance || 0);
//       } else {
//         return res.status(400).json({ success: false, message: "Invalid payment type on capture." });
//       }

//       const paymentRecord = new Payment({
//         bookingId: booking._id,
//         clientId: booking.client._id || booking.client,
//         artistId: booking.artist._id || booking.artist,
//         amount: amountPaid,
//         currency: "USD",
//         paymentMethod: "PayPal",
//         paymentStatus: "paid",
//         transactionId: paymentDetails.id,
//         paidAt: new Date(),
//         payerEmail: paymentDetails.payer.payer_info.email,
//         paypalDetails: paymentDetails,
//         paymentType,
//       });

//       await paymentRecord.save();

//       booking.lastActionTime = new Date();

//       // Update booking status depending on payment type
//       if (paymentType === "advance") {
//         booking.isPaid = true;
//         booking.status = "booked";
//       } else if (paymentType === "final") {
//         booking.isPaid = true;  // fully paid now
//         booking.status = "completed";
//         booking.completedAt = new Date();
//       }

//       await booking.save();

//       // Notifications
//       const clientId = booking.client._id || booking.client;
//       await createNotificationAndEmit({
//         userId: clientId,
//         userType: "Client",
//         type: "payment",
//         message: `Your ${paymentType} payment for booking ${bookingId} was successful.`,
//       });

//       await createNotificationAndEmit({
//         userId: booking.artist._id || booking.artist,
//         userType: "Artist",
//         type: "payment",
//         message: `You have received a ${paymentType} payment for booking ${bookingId}.`,
//       });

//       // Clear cookie after use
//       res.clearCookie("paypalBookingInfo");

//       return res.redirect("http://localhost:5173/payment/success");
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };



import paypal from "../utils/paypal.js";
import Payment from "../models/Payment.model.js";
import Booking from "../models/Artist.Booking.model.js";
import { createNotificationAndEmit } from "../controllers/Notification.controller.js";

export const createPaypalOrder = async (req, res) => {
  try {
    const { bookingId, paymentType } = req.body;

    const booking = await Booking.findById(bookingId).populate("client artist");

    if (!booking || booking.contractStatus !== "signed") {
      return res.status(400).json({ success: false, message: "Booking not eligible for payment." });
    }

    let totalAmount;

    if (paymentType === "advance") {
      // Advance payment
      totalAmount = booking.advance || booking.wage;

      if (booking.isPaid) {
        return res.status(400).json({ success: false, message: "Advance already paid." });
      }
    } else if (paymentType === "final") {
      // Final payment after advance
      if (!booking.isPaid) {
        return res.status(400).json({ success: false, message: "Advance payment must be done first." });
      }

      const remaining = booking.wage - (booking.advance || 0);
      if (remaining <= 0) {
        return res.status(400).json({ success: false, message: "No remaining balance to pay." });
      }
      totalAmount = remaining;

      // You may add event date check here if you want final payment only after event date has passed
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment type." });
    }

    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: `http://localhost:3000/api/payments/paypal/capture?paymentType=${paymentType}`,
        cancel_url: `http://localhost:5173/payment/cancel`,
      },
      transactions: [{
        amount: { currency: "USD", total: totalAmount.toFixed(2) },
        description: `Booking ${paymentType} payment for event at ${booking.location}`,
      }],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
       console.error("PayPal create payment error:", JSON.stringify(error, null, 2));

        return res.status(500).json({ success: false, message: "PayPal payment creation failed." });
      }

      const approvalURL = paymentInfo.links.find(link => link.rel === "approval_url").href;

      // Save bookingId, paymentId, paymentType in cookie for capture step
      res.cookie("paypalBookingInfo", JSON.stringify({
        bookingId: booking._id.toString(),
        paymentId: paymentInfo.id,
        paymentType,
      }), {
        httpOnly: true,
        maxAge: 10 * 60 * 1000, // 10 minutes
        sameSite: "Lax",
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
    const { token, PayerID, paymentType: queryPaymentType } = req.query;

    const cookieData = req.cookies.paypalBookingInfo;
    if (!cookieData) return res.status(400).json({ success: false, message: "Missing payment info in cookie" });

    const { bookingId, paymentId, paymentType: cookiePaymentType } = JSON.parse(cookieData);

    // Prefer query param paymentType if present, else from cookie
    const paymentType = queryPaymentType || cookiePaymentType;

    const booking = await Booking.findById(bookingId).populate("client", "username").populate("artist", "username");

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    paypal.payment.execute(paymentId, { payer_id: PayerID }, async (error, paymentDetails) => {
      if (error) {
        console.error(error.response);
        return res.status(500).json({ success: false, message: "Payment execution failed." });
      }

      // Determine amount paid based on paymentType
      let amountPaid;
      if (paymentType === "advance") {
        amountPaid = booking.advance || booking.wage;
      } else if (paymentType === "final") {
        amountPaid = booking.wage - (booking.advance || 0);
      } else {
        return res.status(400).json({ success: false, message: "Invalid payment type in capture." });
      }

      // Create payment record
      const paymentRecord = new Payment({
        bookingId: booking._id,
        clientId: booking.client,
        artistId: booking.artist,
        amount: amountPaid,
        currency: "USD",
        paymentMethod: "PayPal",
        paymentStatus: "paid",
        transactionId: paymentDetails.id,
        paidAt: new Date(),
        payerEmail: paymentDetails.payer.payer_info.email,
        paypalDetails: paymentDetails,
        note: paymentType === "advance" ? "Advance payment" : "Final payment",
        paymentType,
      });

      await paymentRecord.save();

      // Update booking according to payment type
      if (paymentType === "advance") {
        booking.isPaid = true; // advance paid
        booking.status = "booked"; // or as per your flow
      } else if (paymentType === "final") {
        booking.isFinalPaid = true;
        booking.status = "completed"; // mark booking completed
      }

      booking.lastActionTime = new Date();
      await booking.save();

      const clientId = booking.client._id || booking.client;

      // Notify client
      await createNotificationAndEmit({
        userId: clientId,
        userType: "Client",
        type: "payment",
        message: `You have paid the ${paymentType} payment for artist ${booking.artist.username}.`,

      });

      // Notify artist
      await createNotificationAndEmit({
        userId: booking.artist,
        userType: "Artist",
        type: "payment",
        message: `You have received a ${paymentType} payment from client ${booking.client.username}.`,
      });

      // Clear cookie
      res.clearCookie("paypalBookingInfo");

      // return res.redirect("http://localhost:5173/payment/success");
      return res.redirect(
  `http://localhost:5173/payment/success?paymentType=${paymentType}&bookingId=${bookingId}&artistId=${booking.artist}`
);

    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPaymentReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
      .populate("clientId", "username email")
      .populate("artistId", "username email")
      .populate("bookingId");

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, receipt: payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

