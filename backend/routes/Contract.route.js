import express from 'express';
import { generateClientContract, signContractByArtist } from '../controllers/Contract.controller.js';

const router = express.Router();

router.post('/generate-client', generateClientContract);
router.post('/sign-artist', signContractByArtist);

export default router;
