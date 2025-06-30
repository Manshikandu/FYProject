import express from 'express';
import { generateClientContract, signContractByArtist, getContractDetails } from '../controllers/Contract.controller.js';
import { verifytoken } from '../middleware/verifyToken.js';

const router = express.Router();

// Add verifytoken to protect these routes
router.post('/generate-client', verifytoken, generateClientContract);
router.post('/sign-artist', verifytoken, signContractByArtist);

router.get('/details/:bookingId', verifytoken, getContractDetails);

export default router;
