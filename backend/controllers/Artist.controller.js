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

// export const searchArtist = async(req,res) => {
//     try {
//         // const {name,category,location,style} = req.query;
//         const query = req.query.query?.toString().trim();

//     if (!query) {
//       return res.status(400).json({ message: "Search query is required" });
//     }

//     // if (query) {
//       const regex = new RegExp(query, 'i');
//     //   searchQuery.$or = [
//     const artists = await Artist.find({
//         $or: [
//             { name: regex },
//             { username: regex },
//             { category: regex },
//             { location: regex },
//             { style: regex }
//         ]
//     });
        
    
//     // } 
//         // if(name) 
//         // {
//         //     query.name = {$regex: name, $options: "i"};
//         // }
//         // if(category)
//         // {
//         //     query.category = {$regex: category, $options: "i"};
//         // }
//         // if(location)
//         // {
//         //     query.location = {$regex: location, $options: "i"};
//         // }
//         // if(style)
//         // {
//         //     query.style = style;
//         // }
    
//         console.log("Search query: ",query);

//         // const artists = await Artist.find(query);
//         console.log("Artists found: ",artists.length);

//         res.status(200).json(artists);
//     } catch (error) {
//         console.log("Artist search error: ", error);
//         console.error("Artist search error : ",error.message);
//         res.status(500).json({message: "Internal Server Error"});
//     }
// }


export const searchArtist = async (req, res) => {
  try {
    const query = req.query.query?.toString().trim();

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Helper to escape regex special characters
    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Split query into words & build regex list
    const words = query.split(' ').filter(Boolean);
    const regexList = words.map(word => new RegExp(escapeRegex(word), 'i'));

    // Search in all relevant fields using $or
    const artists = await Artist.find({
      $or: [
        ...regexList.map(regex => ({ name: regex })),
        ...regexList.map(regex => ({ username: regex })),
        ...regexList.map(regex => ({ category: regex })),
        ...regexList.map(regex => ({ location: regex })),
        ...regexList.map(regex => ({ style: regex })),
      ]
    });

    console.log("Search query:", query);
    console.log("Artists found:", artists.length);
    res.status(200).json(artists);
  } catch (error) {
    console.error("Artist search error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




//filter

// import { haversineDistance } from "../utils/calculateDistance.js";

// exports.getNearbyArtists = async (req, res) => {
//   const { lat, lon, maxDistance = 50 } = req.query;
//   if (!lat || !lon) return res.status(400).json({ error: "Missing coordinates" });

//   try {
//     const artists = await Artist.find({ latitude: { $ne: null }, longitude: { $ne: null } });

//     const filtered = artists
//       .map((artist) => {
//         const dist = haversineDistance(
//           parseFloat(lat),
//           parseFloat(lon),
//           artist.latitude,
//           artist.longitude
//         );
//         return { ...artist._doc, distance: dist };
//       })
//       .filter((a) => a.distance <= maxDistance)
//       .sort((a, b) => a.distance - b.distance);

//     res.json(filtered);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };



