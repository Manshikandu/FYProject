import Artist from "../models/Artist.model.js";
import mongoose from "mongoose";
export const CreateOrUpdateArtist = async(req, res) => 
{
    let { userId, name, category, style,location, bio, portfolioLinks, availability} = req.body;

    if (!userId) {
    userId = new mongoose.Types.ObjectId();
  }
    try{
        let artist = await Artist.findOne({userId});

        if(artist)
        {
            artist.set({name, category, style, location, bio, portfolioLinks, availability });
            await artist.save();
            return res.json({message: 'Updated', artist});
        }

        const newArtist =  new Artist({userId, name, category, style, location, bio, portfolioLinks, availability});
        await newArtist.save();
        res.status(201).json({message: 'Created', artist: newArtist});
    }catch(error)
    {
        res.status(500).json({error: 'Server error', details: error.message});
    }
};