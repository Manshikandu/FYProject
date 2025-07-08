import express from 'express';
import { Adminlogin, refreshToken, getClientDetail, getArtistDetail ,getAdminDashboardData , getAllBookings,getAllSignedContracts} from './Admin.controller.js';
import { adminRoute,protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/Adminlogin',  Adminlogin);
router.post('/admin/refresh-token', refreshToken);

router.get('/dashboard-data', getAdminDashboardData);
router.get('/Artists-detail', getArtistDetail);
router.get('/Clients-detail',getClientDetail);
router.get('/booking-detail',getAllBookings );
router.get('/signed-contracts',  getAllSignedContracts);

export default router;
