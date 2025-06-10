import express from 'express';
import Artist from '../models/Artist.model.js';
import {UpdateArtist,
        ArtistProfile,
        upload,
        availability,
        Updateavailability
     } from '../controllers/Artist.controller.js';
const router = express.Router();

router.put('/update/:id', UpdateArtist);   //Update Artist Profile
router.get('/:id', ArtistProfile);   //get Artist profile by ID.
router.post('/upload-media', upload);   //Artist to upload media

router.get('/:id/availability', availability);  //fetch availability
router.put('/:id/availability', Updateavailability);  //Update availability


export default router;