import Artist from "../models/Artist.model.js";
import mongoose from "mongoose";

//Create Artist Profile.
export const CreateOrUpdateArtist = async(req, res) => 
{
    let { userId, name, category, style,location, bio, portfolioLinks, availability} = req.body;

    if (!userId)
    {
        userId = new mongoose.Types.ObjectId();
    }
    try
    {
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

//get Artist profile by ID.
export const ArtistProfile = async(req, res) => {
    try{
        const artist = await Artist.findById(req.params.id);
        if(!artist)
        {
            return res.status(404).json({error: 'Not found'});
        }
        res.json(artist);
    }
    catch(error)
    {
        res.status(500).json({error: 'Fetch error'});
    }
};

export const upload = async(req,res) =>
{
    try{
        const {artistId, media} = req.body;
        const artist = await Artist.findById(artistId);

        if(!artist)
        {
            return res.status(404).json({message: 'Artist not found'});
        }
        
        artist.media.push(media);
        await artist.save();

        res.status(200).json({message: 'Media uploaded', media: artist.media});
    }
    catch(error)
    {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

export const availability = async(req,res) =>
{
    try
    {
        const artist = await Artist.findById(req.params.id);

        if(!artist)
        {
            return res.status(404).json({message: "Artist not found"});
        }

        res.status(200).json(artist.availability);
    }
    catch(error)
    {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

export const Updateavailability = async(req,res) =>
{
    try 
    {
        const {availability } = req.body;

        if(!Array.isArray(availability))
        {
            return res.status(400).json({message: 'Availability must be an array.'});
        }

        const artist = await Artist.findByIdAndUpdate(
            req.params.id,
            {availability},
            {new: true}
        );

        if(!artist)
        {
            return res.status(404).json({message: "Artist not found"});
        }

        res.status(200).json({message : "Availability Updated", availability: artist.availability});
    } 
    catch (error) 
    {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

