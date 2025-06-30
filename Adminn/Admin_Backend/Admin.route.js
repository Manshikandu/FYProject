import express from 'express';
import { Adminlogin, refreshToken, getClientDetail, getArtistDetail ,getAdminDashboardData } from './Admin.controller.js';

const router = express.Router();

router.post('/Adminlogin', Adminlogin);
router.post('/admin/refresh-token', refreshToken);

router.get('/dashboard-data', getAdminDashboardData);
router.get('/Artists-detail', getArtistDetail);
router.get('/Clients-detail', getClientDetail);
export default router;
