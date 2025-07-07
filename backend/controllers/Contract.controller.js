//both in same

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import Booking from '../models/Artist.Booking.model.js';
import { createNotificationAndEmit } from "./Notification.controller.js";


const CONTRACT_FOLDER = 'contracts';
if (!fs.existsSync(CONTRACT_FOLDER)) fs.mkdirSync(CONTRACT_FOLDER);

export const generateClientContract = async (req, res) => {
  const { bookingId, signatureImage, paymentMethods, technicalReqs } = req.body;
  const userId = req.user._id;
  console.log('User ID:', userId);
console.log('Booking ID:', bookingId);
console.log('Request body:', req.body);

  try {
    if (!req.user || !req.user._id) {
  return res.status(401).json({ message: "Unauthorized" });
}

    const booking = await Booking.findById(bookingId).populate('artist').populate('client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

     if (booking.client._id.toString() !== userId.toString()) {
  return res.status(403).json({ message: "Only the client can generate the contract" });
}

    // Prevent regenerating contract if draft or signed exists
    if (booking.contractStatus === 'draft' || booking.contractStatus === 'signed') {
      return res.status(400).json({ message: 'Contract already generated and cannot be regenerated.' });
    }

 // Get hourly rate from artist
const hourlyRate = booking.artist.wage || ""; // fallback rate

// Calculate total hours
const totalHours = moment(booking.endTime).diff(moment(booking.startTime), 'hours', true);
const totalWage = Math.round(totalHours * hourlyRate);

// Save into booking
booking.totalHours = totalHours;
booking.wage = totalWage;
booking.advance = Math.floor(totalWage / 2);
booking.clientSignature = signatureImage;
booking.clientSignatureDate = new Date(); 
booking.paymentMethods = paymentMethods;
booking.technicalReqs = technicalReqs;
booking.contractStatus = 'draft';

booking.lastActionTime = new Date();

await booking.save();


    const fileName = `contract-${bookingId}-draft.pdf`;
    const filePath = path.join(CONTRACT_FOLDER, fileName);

    await generateContractPDF(booking, signatureImage, null, filePath);

    booking.contractUrl = `/contracts/${fileName}`;
    await booking.save();

    // Notify the artist about the new contract
    await createNotificationAndEmit({
      userId: booking.artist._id,
      userType: "Artist",
      type: "contract",
      message: `A new contract has been created for booking with ${booking.client.name}.`
      
    });


    res.json({ success: true, contractUrl: booking.contractUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating client contract' });
  }
};

export const signContractByArtist = async (req, res) => {
  const { bookingId, artistSignature } = req.body;
  const userId = req.user._id;

  try {
    const booking = await Booking.findById(bookingId).populate('artist').populate('client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
if (booking.artist._id.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Only the artist can sign the contract" });
  }

    // Set booking status to "booked"
      booking.status = 'accepted';
      booking.contractSignedAt = new Date();
      booking.artistSignature = artistSignature;
      booking.contractStatus = 'signed';

      booking.lastActionTime = new Date();

    await booking.save();

    const fileName = `contract-${bookingId}-final.pdf`;
    const filePath = path.join(CONTRACT_FOLDER, fileName);

    await generateContractPDF(booking, booking.clientSignature, artistSignature, filePath);

    booking.contractUrl = `/contracts/${fileName}`;
    await booking.save();

     // Notify client that artist signed the contract
   await createNotificationAndEmit({
  userId: booking.client._id,
  userType: "Client",
  type: "contract",
  message: `The artist ${booking.artist.name} has signed the contract.`,
});


    res.json({ success: true, contractUrl: booking.contractUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing contract' });
  }
};

export const getContractDetails = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId).populate('artist').populate('client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.json({
      bookingId: booking._id,
      client: booking.client,
      artist: booking.artist,
      wage: booking.wage,
      contractStatus: booking.contractStatus,
      clientSignature: booking.clientSignature,
      artistSignature: booking.artistSignature,
      contractUrl: booking.contractUrl,
      paymentMethods: booking.paymentMethods,
      technicalReqs: booking.technicalReqs,
      eventDate: booking.eventDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
      location: booking.location,
      eventDetails: booking.eventDetails,
      eventType: booking.eventType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching contract' });
  }
};

// Updated generateContractPDF with improvements
async function generateContractPDF(booking, clientSig, artistSig, filePath) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const eventDate = moment(booking.eventDate).format('MMMM D, YYYY');
    const startTime = moment(booking.startTime).format('hh:mm A');
    const endTime = moment(booking.endTime).format('hh:mm A');
    const totalHours = moment(booking.endTime).diff(moment(booking.startTime), 'hours', true);
    const wage = booking.wage || 0;
    const advance = Math.floor(wage / 2);

    doc.fontSize(20).text('Artist Booking Contract', { align: 'center' }).moveDown();

    const contractDate = moment().format('MMMM D, YYYY');
    doc.fontSize(12).text(`This Agreement is made on this ${contractDate}.`, { align: 'left' }).moveDown();

      doc.fontSize(14).text('Event Contact Person:', { underline: true });
      doc.fontSize(12)
        .text(`Name: ${booking.contactName || booking.client.username || 'N/A'}`)
        .text(`Phone: ${booking.contactPhone || booking.client.phone || 'N/A'}`)
        .text(`Email: ${booking.contactEmail || booking.client.email || 'N/A'}`)
        .moveDown();

    // Artist Info
    doc.fontSize(14).text('Artist/Performer:', { underline: true });
    doc.fontSize(12)
      .text(`Name: ${booking.artist.username || booking.artist.name || ''}`)
      .text(`Phone: ${booking.artist.phone || ''}`)
      .text(`Email: ${booking.artist.email || ''}`)
      .moveDown();

    // Event Details
    doc.fontSize(14).text('1. Event Details', { underline: true });
    doc.fontSize(12)
      .text('The Artist agrees to perform the services at the event.')
      .text(`- Event Date(s): ${eventDate}`)
      .text(`- Event Location: ${booking.location || 'N/A'}`)
      .text(`- Performance Time: From ${startTime} to ${endTime}`)
      .moveDown();

    // Payment
    doc.fontSize(14).text('3. Payment', { underline: true });
    doc.fontSize(12).text(`- Total Fee: Rs. ${wage} for approximately ${totalHours.toFixed(2)} hour(s)`).moveDown();

    // Payment Terms
    doc.fontSize(14).text('4. Payment Terms', { underline: true });
    doc.fontSize(12).text('Payment will be made by (check one or more):');
    const pm = booking.paymentMethods || {};
    doc.text(pm.PayPal ? '[x] PayPal' : '[ ] PayPal');
    doc.text(pm.cash ? '[x] Cash' : '[ ] Cash');
    doc.text(pm.bankTransfer ? '[x] Bank Transfer' : '[ ] Bank Transfer');
    if (pm.other) {
      doc.text(`[x] Other: ${pm.otherText || ''}`);
    } else {
      doc.text('[ ] Other: _______________________');
    }
    doc.moveDown();
    doc.text(`The Client agrees to pay a non-refundable advance payment of 50% of the total wage (Rs. ${advance || '_____'}) immediately upon the Artist's signature to confirm the booking.`)
      .moveDown();

    // Advance and Balance
    doc.fontSize(14).text('5. Advance & Remaining Balance', { underline: true });
    doc.fontSize(12).text(`Advance to be paid: Rs. ${advance}`);
    doc.fontSize(12).text(`Remaining to be paid after performance: Rs. ${wage - advance}`).moveDown();

    // Cancellation Policy
    doc.fontSize(14).text('6. Cancellation Policy', { underline: true });
    doc.fontSize(12)
      .text('- If Client cancels more than 7 days before the event, the advance payment is forfeited;')
      .text('- If Client cancels within 7 days of the event, the full wage is due.')
      .text('- If Artist cancels, the full advance will be refunded within 5 business days.')
      .moveDown();

    // Additional Requirements
    doc.fontSize(14).text('7. Additional Requirements', { underline: true });
    doc.fontSize(12).text(booking.technicalReqs || 'None specified').moveDown();

    // Liability
    doc.fontSize(14).text('8. Liability', { underline: true });
    doc.fontSize(12).text('Client agrees to provide a safe environment for the Artist. The Client assumes all responsibility for any injury or damage occurring at the event, except where caused by the Artist’s negligence.').moveDown();

    // Miscellaneous
    doc.fontSize(14).text('9. Miscellaneous', { underline: true });
    doc.fontSize(12)
      .text('This Agreement is the entire understanding between the parties.')
      .text('Any amendments must be in writing and signed by both parties.')
      .moveDown();

    // Signatures
    doc.fontSize(12).text('Client Signature:', 50, doc.y);
    doc.fontSize(12).text('Artist Signature:', 320, doc.y);
    doc.moveDown(0.5);
    const startY = doc.y; 
    if (clientSig) {
      const clientBuffer = Buffer.from(clientSig.replace(/^data:image\/png;base64,/, ''), 'base64');
      doc.image(clientBuffer, 50, doc.y, { fit: [150, 80] });
        doc.fontSize(10).text(`Date: ${moment(booking.clientSignatureDate).format("MMMM D, YYYY")}`, 50, doc.y + 85);

    } else {
      doc.text('_____________________________', 50, doc.y + 20);
    }

    if (artistSig) {
      const artistBuffer = Buffer.from(artistSig.replace(/^data:image\/png;base64,/, ''), 'base64');
      doc.image(artistBuffer, 320, doc.y, { fit: [150, 80] });
        doc.fontSize(10).text(`Date: ${moment(booking.artistSignatureDate).format("MMMM D, YYYY")}`, 320, doc.y + 85);

    } else {
      doc.text('_____________________________', 320, doc.y + 20);
    }

    doc.moveDown(5);
    doc.end();
    stream.on('finish', resolve);
  });
}
