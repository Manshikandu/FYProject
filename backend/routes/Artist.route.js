import express from 'express';
import Artist from '../models/Artist.model.js';
import {UpdateArtist,
        ArtistProfile,
        upload
        //availability
       // Updateavailability
     } from '../controllers/Artist.controller.js';
const router = express.Router();


router.patch("/profile/:id", UpdateArtist);

router.get('/:id', ArtistProfile);   //get Artist profile by ID.

router.post('/upload-media', upload);   //Artist to upload media

//router.get('/:id/availability', availability);  //fetch availability
//router.put('/:id/availability', Updateavailability);  //Update availability


export default router;