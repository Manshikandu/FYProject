import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/CloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'artist_media', // your folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'mp4', 'mov'],
  },
});

const parser = multer({ storage: storage });

export default parser;
 