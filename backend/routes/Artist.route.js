import express from 'express';
import Artist from '../models/Artist.model.js';
import {UpdateArtist,
        ArtistProfile,

        upload,
        getAllArtists
        //availability
       // Updateavailability
     } from '../controllers/Artist.controller.js';
const router = express.Router();


router.patch("/profile/:id", UpdateArtist);


router.get('/profile/:id', ArtistProfile);   //get Artist profile by ID.

// router.get('/:id', ArtistProfile);


router.post('/upload-media', upload);   //Artist to upload media

router.get("/artists", getAllArtists); // add this in your routes





export default router;