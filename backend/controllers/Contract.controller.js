import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import Booking from '../models/Artist.Booking.model.js';  // updated model import

const CONTRACT_FOLDER = 'contracts';
if (!fs.existsSync(CONTRACT_FOLDER)) fs.mkdirSync(CONTRACT_FOLDER);

export const generateClientContract = async (req, res) => {
  const { bookingId, wage, signatureImage } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate('artist').populate('client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.wage = wage;
    booking.clientSignature = signatureImage;
    booking.contractStatus = 'draft';
    await booking.save();

    const fileName = `contract-${bookingId}-draft.pdf`;
    const filePath = path.join(CONTRACT_FOLDER, fileName);
    await generateContractPDF(booking, signatureImage, null, filePath);

    booking.contractUrl = `/contracts/${fileName}`;
    await booking.save();

    res.json({ success: true, contractUrl: booking.contractUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating client contract' });
  }
};

export const signContractByArtist = async (req, res) => {
  const { bookingId, artistSignature } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate('artist').populate('client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.artistSignature = artistSignature;
    booking.contractStatus = 'signed';
    await booking.save();

    const fileName = `contract-${bookingId}-final.pdf`;
    const filePath = path.join(CONTRACT_FOLDER, fileName);
    await generateContractPDF(booking, booking.clientSignature, artistSignature, filePath);

    booking.contractUrl = `/contracts/${fileName}`;
    await booking.save();

    res.json({ success: true, contractUrl: booking.contractUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error signing contract' });
  }
};

async function generateContractPDF(booking, clientSig, artistSig, filePath) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text("Artist Booking Contract", { align: 'center' }).moveDown();
    doc.fontSize(12).text(`Artist: ${booking.artist.name}`);
    doc.text(`Client: ${booking.client.name}`);
    doc.text(`Event Date: ${booking.eventDate.toDateString()}`);
    doc.text(`Location: ${booking.location}`);
    doc.text(`Wage: Rs. ${booking.wage ?? 'N/A'}`);
    doc.moveDown();

    doc.text("Signatures:", { underline: true });
    doc.moveDown();

    if (clientSig) {
      const buffer = Buffer.from(clientSig.replace(/^data:image\/png;base64,/, ''), 'base64');
      doc.text("Client Signature:").image(buffer, { fit: [150, 80] }).moveDown();
    }

    if (artistSig) {
      const buffer = Buffer.from(artistSig.replace(/^data:image\/png;base64,/, ''), 'base64');
      doc.text("Artist Signature:").image(buffer, { fit: [150, 80] }).moveDown();
    }

    doc.end();
    stream.on('finish', resolve);
  });
}
