import express from 'express';
import Artist from '../models/Artist.model.js';
import { CreateOrUpdateArtist } from '../controllers/Artist.controller.js';
const router = express.Router();

router.post('/create', CreateOrUpdateArtist);

router.get('/:id', async(req, res) => {
    try{
        const artist = await Artist.findById(req.params.id);
        if(!artist)
            return res.status(404).json({error: 'Not found'});
        res.json(artist);
    }
    catch(error)
    {
        res.status(500).json({error: 'Fetch error'});
    }
});

export default router;