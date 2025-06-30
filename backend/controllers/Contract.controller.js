//both in same

import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import Booking from '../models/Artist.Booking.model.js';

const CONTRACT_FOLDER = 'contracts';
if (!fs.existsSync(CONTRACT_FOLDER)) fs.mkdirSync(CONTRACT_FOLDER);

export const generateClientContract = async (req, res) => {
  const { bookingId, wage, signatureImage, paymentMethods, technicalReqs } = req.body;
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

    booking.wage = Number(wage) || 0;
    booking.clientSignature = signatureImage;
    booking.paymentMethods = paymentMethods;
    booking.technicalReqs = technicalReqs;
    booking.contractStatus = 'draft';

    await booking.save();

    const fileName = `contract-${bookingId}-draft.pdf`;
    const filePath = path.join(CONTRACT_FOLDER, fileName);

    await generateContractPDF(booking, signatureImage, null, filePath);

    booking.contractUrl = `/contracts/${fileName}`;
    await booking.save();

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
    booking.artistSignature = artistSignature;
    booking.contractStatus = 'signed';

    await booking.save();

    const fileName = `contract-${bookingId}-final.pdf`;
    const filePath = path.join(CONTRACT_FOLDER, fileName);

    await generateContractPDF(booking, booking.clientSignature, artistSignature, filePath);

    booking.contractUrl = `/contracts/${fileName}`;
    await booking.save();

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

    // Title
    doc.fontSize(20).text('Artist Booking Contract', { align: 'center' }).moveDown();

    // Date line
    const contractDate = moment().format('MMMM D, YYYY'); // current date
doc.fontSize(12).text(`This Agreement is made on this ${contractDate}.`, { align: 'left' }).moveDown();


    // Client Info
    doc.fontSize(14).text('Client/Organizer:', { underline: true });
    doc.fontSize(12)
      .text(`Name: ${booking.client.username || booking.client.name || ''}`)
      .text(`Phone: ${booking.client.phone || ''}`)
      .text(`Email: ${booking.client.email || ''}`)
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
    doc.text(pm.check ? '[x] Check' : '[ ] Check');
    doc.text(pm.cash ? '[x] Cash' : '[ ] Cash');
    doc.text(pm.bankTransfer ? '[x] Bank Transfer' : '[ ] Bank Transfer');
    if (pm.other) {
      doc.text(`[x] Other: ${pm.otherText || ''}`);
    } else {
      doc.text('[ ] Other: _______________________');
    }
    doc.moveDown()
      .text(`The Client agrees to pay a non-refundable advance payment of 50% of the total wage (Rs. ${advance || '_____'}) to confirm the booking, which shall be paid on the day of the event prior to performance.`)
      .moveDown();

    // Cancellation Policy
    doc.fontSize(14).text('5. Cancellation Policy', { underline: true });
    doc.fontSize(12)
      .text('- If Client cancels more than 7 days before the event, the advance payment is forfeited;')
      .text('- If Client cancels within 7 days of the event, the full wage is due.')
      .text('- If Artist cancels, the full advance will be refunded within 5 business days.')
      .moveDown();

    // Additional Requirements
    doc.fontSize(14).text('6. Additional Requirements', { underline: true });
    doc.fontSize(12).text(booking.technicalReqs || 'None specified').moveDown();

    // Liability
    doc.fontSize(14).text('7. Liability', { underline: true });
    doc.fontSize(12).text(
      'Client agrees to provide a safe environment for the Artist. The Client assumes all responsibility for any injury or damage occurring at the event, except where caused by the Artist’s negligence.'
    ).moveDown();

    // Miscellaneous
    doc.fontSize(14).text('8. Miscellaneous', { underline: true });
    doc.fontSize(12)
      .text('This Agreement is the entire understanding between the parties.')
      .text('Any amendments must be in writing and signed by both parties.')
      .moveDown(2);

    // Signatures
    // doc.fontSize(14).text('Signatures', { underline: true }).moveDown();

    // if (clientSig) {
    //   doc.text('Client Signature:');
    //   const buffer = Buffer.from(clientSig.replace(/^data:image\/png;base64,/, ''), 'base64');
    //   doc.image(buffer, { fit: [150, 80] }).moveDown();
    // } else {
    //   doc.text('Client Signature: _____________________________').moveDown();
    // }

    // if (artistSig) {
    //   doc.text('Artist Signature:');
    //   const buffer = Buffer.from(artistSig.replace(/^data:image\/png;base64,/, ''), 'base64');
    //   doc.image(buffer, { fit: [150, 80] }).moveDown();
    // } else {
    //   doc.text('Artist Signature: _____________________________').moveDown();
    // }

    doc.fontSize(12).text('Client Signature:', 50, doc.y);
doc.fontSize(12).text('Artist Signature:', 320, doc.y);
doc.moveDown(0.5);

if (clientSig) {
  const clientBuffer = Buffer.from(clientSig.replace(/^data:image\/png;base64,/, ''), 'base64');
  doc.image(clientBuffer, 50, doc.y, { fit: [150, 80] });
} else {
  doc.text('_____________________________', 50, doc.y + 20);
}

if (artistSig) {
  const artistBuffer = Buffer.from(artistSig.replace(/^data:image\/png;base64,/, ''), 'base64');
  doc.image(artistBuffer, 320, doc.y, { fit: [150, 80] });
} else {
  doc.text('_____________________________', 320, doc.y + 20);
}

doc.moveDown(5);
//

    doc.end();
    stream.on('finish', resolve);
  });
}
