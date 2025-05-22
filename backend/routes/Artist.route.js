import express from 'express';
import Artist from '../models/Artist.model.js';
import { ArtistProfile, CreateOrUpdateArtist } from '../controllers/Artist.controller.js';
const router = express.Router();

router.post('/create', CreateOrUpdateArtist);   //Create Artist Profile
router.get('/:id', ArtistProfile);   //get Artist profile by ID.

export default router;