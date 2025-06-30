// import Artist from "../../models/Artist.model.js";
// import { cosineSimilarity } from "../../utils/CosineSimilarity.js";
// import { haversine } from "../../utils/haversine.js";

// const TAGS = [
//   "musician", "dj", "singer", "dancer","mc",

//   //genre
//  "pop", "rock",  "90s", "hip-hop"
// ,

// //specialitites
// "solo", "band",

// //languages
//   "english", "nepali", "newari","hindi",

// //eventtypes

//   "wedding", "corporate", "concert"
// ];

// const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);

// const getArtistMatches = async (req, res) => {
//   try {
//     console.log("Incoming body:",req.body);
//     const { userLat, userLng, maxBudget, preferences = [] } = req.body;

//     const artists = await Artist.find({});

//     const scored = artists.map((artist) => {
//       const artistTags = [
//         ...artist.artTypes,
//         ...artist.genres,
//         ...artist.specialities,
//         ...artist.languages,
//         ...artist.eventTypes,
//       ].map(t => t.toLowerCase());

//       const artistVector = createVector(artistTags);
//       const userVector = createVector(preferences.map(t => t.toLowerCase()));

//       const cosineScore = cosineSimilarity(userVector, artistVector);

//       const distance = haversine(userLat, userLng, artist.location.coordinates[1], artist.location.coordinates[0]);
//       const normalizedDistance = Math.min(distance / 50, 1); // normalize by 50km max range

//       const priceScore = maxBudget
//         ? artist.ratePerHour <= maxBudget
//           ? 1
//           : Math.max(0, 1 - (artist.ratePerHour - maxBudget) / maxBudget)
//         : 1;

//       const finalScore = (
//         0.6 * cosineScore +
//         0.3 * (1 - normalizedDistance) +
//         0.1 * priceScore
//       );

//       return {
//         ...artist._doc,
//         distance: distance.toFixed(2),
//         score: finalScore.toFixed(4),
//       };
//     });

//     const ranked = scored
//       .filter(a => a.score > 0)
//       .sort((a, b) => b.score - a.score);

//     res.status(200).json(ranked);
//   } catch (err) {
//     console.error("Match error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { getArtistMatches };



// import Artist from "../../models/Artist.model.js";
// import { cosineSimilarity } from "../../utils/CosineSimilarity.js";
// import { haversine } from "../../utils/haversine.js";

// const TAGS = [
//   "musician", "dj", "singer", "dancer", "mc",
//   "pop", "rock", "90s", "hip-hop", // genres
//   "solo", "band",                  // specialities
//   "english", "nepali", "newari", "hindi", // languages
//   "wedding", "corporate", "concert"       // event types
// ];

// const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);

// const getArtistMatches = async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body);

//     const { userLat, userLng, maxBudget, preferences = [] } = req.body;

//     const artists = await Artist.find({});

//     // Optional: warn for invalid locations
//     artists.forEach(a => {
//       if (!a.location || !Array.isArray(a.location.coordinates)) {
//         console.warn("Invalid artist location:", a._id, a.location);
//       }
//     });

//     const scored = artists
//       .filter(artist =>
//         artist.location &&
//         Array.isArray(artist.location.coordinates) &&
//         artist.location.coordinates.length === 2
//       )
//       .map((artist) => {
//         const tags = [
//           ...(artist.genres || []),
//           ...(artist.specialities || []),
//           ...(artist.languages || []),
//           ...(artist.eventTypes || []),
//           artist.category || ""
//         ].map(t => t.toLowerCase());

//         const artistVector = createVector(tags);
//         const userVector = createVector(preferences.map(t => t.toLowerCase()));

//         const cosineScore = cosineSimilarity(userVector, artistVector);

//         const [lng, lat] = artist.location.coordinates;
//         const distance = haversine(userLat, userLng, lat, lng);
//         const normalizedDistance = Math.min(distance / 50, 1); // 50km range

//         const wage = artist.ratePerHour || artist.wage || 0;
//         const priceScore = maxBudget
//           ? wage <= maxBudget
//             ? 1
//             : Math.max(0, 1 - (wage - maxBudget) / maxBudget)
//           : 1;

//         const finalScore = (
//           0.6 * cosineScore +
//           0.3 * (1 - normalizedDistance) +
//           0.1 * priceScore
//         );

//         return {
//           ...artist._doc,
//           distance: distance.toFixed(2),
//           score: finalScore.toFixed(4),
//         };
//       });

//     const ranked = scored
//       .filter(a => a.score > 0)
//       .sort((a, b) => b.score - a.score);

//     res.status(200).json(ranked);
//   } catch (err) {
//     console.error("Match error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { getArtistMatches };



//catver

// import Artist from "../../models/Artist.model.js";
// import { cosineSimilarity } from "../../utils/CosineSimilarity.js";
// import { haversine } from "../../utils/haversine.js";

// const TAGS = [
//   "musician", "dj", "singer", "dancer", "mc",
//   "pop", "rock", "90s", "hip-hop", // genres
//   "solo", "band",                  // specialties
//   "english", "nepali", "newari", "hindi", // languages
//   "wedding", "corporate", "concert"       // event types
// ];

// const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);

// const getArtistMatches = async (req, res) => {
//   try {
//     const { userLat, userLng, maxBudget, preferences = [], categoryName } = req.body;

//     const categoryFilter = categoryName
//       ? { category: categoryName.toLowerCase() }
//       : {};

//     const artists = await Artist.find(categoryFilter);

//     const scored = artists
//       .filter(a => a.location && Array.isArray(a.location.coordinates) && a.location.coordinates.length === 2)
//       .map((artist) => {
//         const tags = [
//           ...(artist.genres || []),
//           ...(artist.specialities || []),
//           ...(artist.languages || []),
//           ...(artist.eventTypes || []),
//           artist.category || ""
//         ].map(t => t.toLowerCase());

//         const artistVector = createVector(tags);
//         const userVector = createVector(preferences.map(t => t.toLowerCase()));

//         const cosineScore = cosineSimilarity(userVector, artistVector);

//         const [lng, lat] = artist.location.coordinates;
//         const distance = haversine(userLat, userLng, lat, lng);
//         const normalizedDistance = Math.min(distance / 50, 1); // normalize distance in 50km range

//         const wage = artist.ratePerHour || artist.wage || 0;
//         const priceScore = maxBudget
//           ? wage <= maxBudget
//             ? 1
//             : Math.max(0, 1 - (wage - maxBudget) / maxBudget)
//           : 1;

//         const finalScore = 0.6 * cosineScore + 0.3 * (1 - normalizedDistance) + 0.1 * priceScore;

//         return {
//           ...artist._doc,
//           distance: distance.toFixed(2),
//           score: finalScore.toFixed(4),
//         };
//       });

//     const ranked = scored.filter(a => a.score > 0).sort((a, b) => b.score - a.score);

//     res.status(200).json(ranked);
//   } catch (err) {
//     console.error("Match error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { getArtistMatches };



// import Artist from "../../models/Artist.model.js";
// import { cosineSimilarity } from "../../utils/CosineSimilarity.js";
// import { haversine } from "../../utils/haversine.js";

// const TAGS = [
//   "musician", "dj", "singer", "dancer", "mc",
//   "pop", "rock", "90s", "hip-hop",
//   "solo", "band",
//   "english", "nepali", "newari", "hindi",
//   "wedding", "corporate", "concert"
// ];

// const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);

// const getArtistMatches = async (req, res) => {
//   try {
//     const { userLat, userLng, maxBudget, preferences = {}, categoryName } = req.body;

//     const categoryFilter = categoryName
//       ? { category: categoryName.toLowerCase() }
//       : {};

//     const artists = await Artist.find(categoryFilter);

//     // Flatten preferences into tags
//     const preferenceTags = [
//       ...(preferences.genres || []),
//       ...(preferences.specialties || []), // be sure spelling matches frontend
//       ...(preferences.languages || []),
//       categoryName || ""
//     ].map(t => t.toLowerCase());

//     const userVector = createVector(preferenceTags);

//     const scored = artists
//       .filter(a => a.location?.coordinates?.length === 2)
//       .map((artist) => {
//         const tags = [
//           ...(artist.genres || []),
//           ...(artist.specialties || []), // spelling fixed here too
//           ...(artist.languages || []),
//           ...(artist.eventTypes || []),
//           artist.category || ""
//         ].map(t => t.toLowerCase());

//         const artistVector = createVector(tags);
//         const cosineScore = cosineSimilarity(userVector, artistVector);

//         const [lng, lat] = artist.location.coordinates;
//         const distance = haversine(userLat, userLng, lat, lng);
//         const normalizedDistance = Math.min(distance / 50, 1); // normalize distance in 50km range

//         const wage = artist.ratePerHour || artist.wage || 0;
//         const priceScore = maxBudget
//           ? wage <= maxBudget
//             ? 1
//             : Math.max(0, 1 - (wage - maxBudget) / maxBudget)
//           : 1;

//         const finalScore = 0.6 * cosineScore + 0.3 * (1 - normalizedDistance) + 0.1 * priceScore;

//         return {
//           ...artist._doc,
//           distance: distance.toFixed(2),
//           score: finalScore.toFixed(4),
//         };
//       });

//     const ranked = scored
//       .filter(a => a.score > 0)
//       .sort((a, b) => b.score - a.score);

//     res.status(200).json(ranked);
//   } catch (err) {
//     console.error("Match error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

//udi

// export { getArtistMatches };
// import Artist from "../../models/Artist.model.js";
// import { cosineSimilarity } from "../../utils/CosineSimilarity.js";
// import { haversine } from "../../utils/haversine.js";

// const TAGS = [
//   "musician", "dj", "singer", "dancer", "mc",
//   "pop", "rock", "90s", "hip-hop",
//   "solo", "band",
//   "english", "nepali", "newari", "hindi",
//   "wedding", "corporate", "concert"
// ];

// const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);


// const getArtistMatches = async (req, res) => {
//   try {
//     const { userLat, userLng, maxBudget, preferences = {}, categoryName } = req.body;

//     const categoryFilter = categoryName
//       ? { category: categoryName.toLowerCase() }
//       : {};

//     // Use .lean() here for faster queries and plain JS objects
//     const artists = await Artist.find(categoryFilter).lean();

//     // Flatten preferences into tags
//     const preferenceTags = [
//       ...(preferences.genres || []),
//       ...(preferences.specialties || []),
//       ...(preferences.languages || []),
//       categoryName || ""
//     ].map(t => t.toLowerCase());

//     const userVector = createVector(preferenceTags);

//     const scored = artists
//       .filter(a => a.location?.coordinates?.length === 2)
//       .map((artist) => {
//         const tags = [
//           ...(artist.genres || []),
//           ...(artist.specialties || []),
//           ...(artist.languages || []),
//           ...(artist.eventTypes || []),
//           artist.category || ""
//         ].map(t => t.toLowerCase());

//         const artistVector = createVector(tags);
//         const cosineScore = cosineSimilarity(userVector, artistVector);

//         const [lng, lat] = artist.location.coordinates;
//         const distance = haversine(userLat, userLng, lat, lng);
//         const normalizedDistance = Math.min(distance / 50, 1);

//         const wage = artist.ratePerHour || artist.wage || 0;
//         const priceScore = maxBudget
//           ? wage <= maxBudget
//             ? 1
//             : Math.max(0, 1 - (wage - maxBudget) / maxBudget)
//           : 1;

//         const finalScore = 0.6 * cosineScore + 0.3 * (1 - normalizedDistance) + 0.1 * priceScore;

//         return {
//           ...artist,
//           distance: distance.toFixed(2),
//           score: finalScore.toFixed(4),
//         };
//       });

//     const ranked = scored
//       .filter(a => a.score > 0)
//       .sort((a, b) => b.score - a.score);

//     res.status(200).json(ranked);
//   } catch (err) {
//     console.error("Match error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


//
// controller/matchArtists.js

// import Artist from "../../models/Artist.model.js";
// import { cosineSimilarity } from "../../utils/CosineSimilarity.js";
// import { haversine } from "../../utils/haversine.js";

// const TAGS = [
//   "musician", "dj", "singer", "dancer", "mc",
//   "pop", "rock", "90s", "hip-hop",
//   "solo", "band",
//   "english", "nepali", "newari", "hindi",
//   "wedding", "corporate", "concert"
// ];

// const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);

// const getArtistMatches = async (req, res) => {
//   try {
//     const { userLat, userLng, maxBudget, preferences = {}, categoryName } = req.body;

//     const categoryFilter = categoryName
//       ? { category: categoryName.toLowerCase() }
//       : {};

//     const artists = await Artist.find(categoryFilter).lean();

//     const preferenceTags = [
//       ...(preferences.genres || []),
//       ...(preferences.specialties || []),
//       ...(preferences.languages || []),
//       categoryName || ""
//     ].map(t => t.toLowerCase());

//     const userVector = createVector(preferenceTags);

//     const scored = artists
//       .filter(a => a.location?.coordinates?.length === 2)
//       .map((artist) => {
//         const tags = [
//           ...(artist.genres || []),
//           ...(artist.specialties || []),
//           ...(artist.languages || []),
//           ...(artist.eventTypes || []),
//           artist.category || ""
//         ].map(t => t.toLowerCase());

//         const artistVector = createVector(tags);
//         const cosineScore = cosineSimilarity(userVector, artistVector);

//         const [lng, lat] = artist.location.coordinates;
//         const distance = haversine(userLat, userLng, lat, lng);
//         const normalizedDistance = Math.min(distance / 50, 1);

//         const wage = artist.ratePerHour || artist.wage || 0;
//         const priceScore = maxBudget
//           ? wage <= maxBudget
//             ? 1
//             : Math.max(0, 1 - (wage - maxBudget) / maxBudget)
//           : 1;

//         const finalScore = 0.6 * cosineScore + 0.3 * (1 - normalizedDistance) + 0.1 * priceScore;

//         return {
//           ...artist,
//           distance: Number(distance.toFixed(2)),
//           score: Number(finalScore.toFixed(4))
//         };
//       });

//     // Sort by score first, then distance as secondary sort
//     const ranked = scored
//       .filter(a => a.score > 0)
//       .sort((a, b) => {
//         if (b.score !== a.score) return b.score - a.score;
//         return a.distance - b.distance;
//       });

//     res.status(200).json(ranked);
//   } catch (err) {
//     console.error("Match error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { getArtistMatches };


//sort 

// import Artist from "../../models/Artist.model.js";
// import { cosineSimilarity } from "../../utils/CosineSimilarity.js";
// import { haversine } from "../../utils/haversine.js";

// const TAGS = [
//   "musician", "dj", "singer", "dancer", "mc",
//   "pop", "rock", "90s", "hip-hop",
//   "solo", "band",
//   "english", "nepali", "newari", "hindi",
//   "wedding", "corporate", "concert"
// ];

// const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);

// const getArtistMatches = async (req, res) => {
//   try {
//     const { userLat, userLng, maxBudget, preferences = {}, categoryName } = req.body;

//     const categoryFilter = categoryName
//       ? { category: categoryName.toLowerCase() }
//       : {};

//     const artists = await Artist.find(categoryFilter).lean();

//     const preferenceTags = [
//       ...(preferences.genres || []),
//       ...(preferences.specialties || []),
//       ...(preferences.languages || []),
//       categoryName || ""
//     ].map(t => t.toLowerCase());

//     const userVector = createVector(preferenceTags);

//     const scored = artists
//       .filter(a => a.location?.coordinates?.length === 2)
//       .map((artist) => {
//         const tags = [
//           ...(artist.genres || []),
//           ...(artist.specialties || []),
//           ...(artist.languages || []),
//           ...(artist.eventTypes || []),
//           artist.category || ""
//         ].map(t => t.toLowerCase());

//         const artistVector = createVector(tags);
//         const cosineScore = cosineSimilarity(userVector, artistVector);

//         const [lng, lat] = artist.location.coordinates;
//         const distance = haversine(userLat, userLng, lat, lng);
//         const normalizedDistance = Math.min(distance / 50, 1);

//         const wage = artist.ratePerHour || artist.wage || 0;
//         const priceScore = maxBudget
//           ? wage <= maxBudget
//             ? 1
//             : Math.max(0, 1 - (wage - maxBudget) / maxBudget)
//           : 1;

//         const finalScore = 0.6 * cosineScore + 0.3 * (1 - normalizedDistance) + 0.1 * priceScore;

//         return {
//           ...artist,
//           distance: Number(distance.toFixed(2)),
//           score: Number(finalScore.toFixed(4))
//         };
//       });

//     const ranked = scored
//       .filter(a => a.score > 0 && (!maxBudget || (a.wage || a.ratePerHour || 0) <= maxBudget))
//       .sort((a, b) => {
//         if (b.score !== a.score) return b.score - a.score;
//         return a.distance - b.distance;
//       });

//     res.status(200).json(ranked);
//   } catch (err) {
//     console.error("Match error", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { getArtistMatches };


//sort and icon
import Artist from "../../models/Artist.model.js";
import { cosineSimilarity } from "../../utils/CosineSimilarity.js";
import { haversine } from "../../utils/haversine.js";

const TAGS = [
  "musician", "dj", "singer", "dancer", "mc",
  "pop", "rock", "90s", "hip-hop",
  "solo", "band",
  "english", "nepali", "newari", "hindi",
  "wedding", "corporate", "concert"
];

const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);

const getMatchLabel = (score) => {
  if (score >= 0.9) return "🔥 Best Match";
  if (score >= 0.75) return "💎 Excellent Match";
  if (score >= 0.5) return "👍 Good Match";
  return null;
};

const getArtistMatches = async (req, res) => {
  try {
    const { userLat, userLng, maxBudget, preferences = {}, categoryName } = req.body;

    const categoryFilter = categoryName
      ? { category: categoryName.toLowerCase() }
      : {};

    const artists = await Artist.find(categoryFilter).lean();

    const preferenceTags = [
      ...(preferences.genres || []),
      ...(preferences.specialties || []),
      ...(preferences.languages || []),
      categoryName || ""
    ].map(t => t.toLowerCase());

    const userVector = createVector(preferenceTags);

    const scored = artists
      .filter(a => a.location?.coordinates?.length === 2)
      .map((artist) => {
        const tags = [
          ...(artist.genres || []),
          ...(artist.specialties || []),
          ...(artist.languages || []),
          ...(artist.eventTypes || []),
          artist.category || ""
        ].map(t => t.toLowerCase());

        const artistVector = createVector(tags);
        const cosineScore = cosineSimilarity(userVector, artistVector);

        const [lng, lat] = artist.location.coordinates;
        const distance = haversine(userLat, userLng, lat, lng);
        const normalizedDistance = Math.min(distance / 50, 1);

        const wage = artist.ratePerHour || artist.wage || 0;
        const priceScore = maxBudget
          ? wage <= maxBudget
            ? 1
            : Math.max(0, 1 - (wage - maxBudget) / maxBudget)
          : 1;

        const finalScore = 0.6 * cosineScore + 0.3 * (1 - normalizedDistance) + 0.1 * priceScore;

        return {
          ...artist,
          distance: Number(distance.toFixed(2)),
          score: Number(finalScore.toFixed(4)),
          matchLabel: getMatchLabel(finalScore)
        };
      });

    const ranked = scored
      .filter(a => a.score > 0 && (!maxBudget || (a.wage || a.ratePerHour || 0) <= maxBudget))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.distance - b.distance;
      });

    res.status(200).json(ranked);
  } catch (err) {
    console.error("Match error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getArtistMatches };
