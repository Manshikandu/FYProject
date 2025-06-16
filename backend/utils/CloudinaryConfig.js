
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  CLOUD_NAME: 'dq5rjqhnl',    // from dashboard
  API_KEY: '383859361246575',          // from dashboard
  API_SECRET : 'aAHQjExWTV-xe_gj83HEkZtCn5w',    // from dashboard
  secure: true,
});

export default cloudinary;

