import Artist from "../models/Artist.model.js";
import mongoose from "mongoose";



export const UpdateArtist = async (req, res) => {
  const artistId = req.params.id;
  const updateFields = req.body;

  if (!artistId) {
    return res.status(400).json({ error: "Missing artistId" });
  }

  try {
    const artist = await Artist.findById(artistId);

    if (!artist) {
      return res.status(404).json({ message: "Artist profile not found." });
    }

    const allowedFields = [
      "username",
      "category",
      "location",
      "bio",
      "portfolioLink",
      "media",
      "imageUrl",
      "description",
      "videoUrl",
      "wage",
      "profilePicture",
    ];

    allowedFields.forEach((field) => {
      if (updateFields[field] !== undefined) {
        artist[field] = updateFields[field];
      }
    });

    await artist.save();

    res.json({ message: "Artist profile updated successfully.", artist });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// //get Artist profile by ID.
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

// export const availability = async(req,res) =>
// {
//     try
//     {
//         const artist = await Artist.findById(req.params.id);

//         if(!artist)
//         {
//             return res.status(404).json({message: "Artist not found"});
//         }

//         res.status(200).json(artist.availability);
//     }
//     catch(error)
//     {
//         res.status(500).json({message: "Server error", error: error.message});
//     }
// };

// export const Updateavailability = async(req,res) =>
// {
//     try 
//     {
//         const {availability } = req.body;

//         if(!Array.isArray(availability))
//         {
//             return res.status(400).json({message: 'Availability must be an array.'});
//         }

//         const artist = await Artist.findByIdAndUpdate(
//             req.params.id,
//             {availability},
//             {new: true}
//         );

//         if(!artist)
//         {
//             return res.status(404).json({message: "Artist not found"});
//         }

//         res.status(200).json({message : "Availability Updated", availability: artist.availability});
//     } 
//     catch (error) 
//     {
//         res.status(500).json({message: "Server error", error: error.message});
//     }
// };



