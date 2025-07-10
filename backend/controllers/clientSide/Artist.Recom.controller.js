// import Booking from '../../models/Artist.Booking.model.js';
// import Artist from '../../models/Artist.model.js';

// export const getRecommendedArtists = async (req, res) => {
//   const clientId = req.params.clientId;

//   try {
//     // Step 1: Fetch all bookings
//     const bookings = await Booking.find().select('client artist').lean();

//     // Step 2: Build client-artist interaction matrix
//     const matrix = {}; // { clientId: { artistId: count } }

//     bookings.forEach(({ client, artist }) => {
//       const clientStr = client.toString();
//       const artistStr = artist.toString();
//       if (!matrix[clientStr]) matrix[clientStr] = {};
//       matrix[clientStr][artistStr] = (matrix[clientStr][artistStr] || 0) + 1;
//     });

//     // Step 3: Build artist-artist similarity matrix
//     const allArtistIds = new Set(bookings.map(b => b.artist.toString()));
//     const similarity = {};

//     const artistList = Array.from(allArtistIds);
//     for (let i = 0; i < artistList.length; i++) {
//       const a1 = artistList[i];
//       similarity[a1] = {};

//       for (let j = 0; j < artistList.length; j++) {
//         const a2 = artistList[j];
//         if (a1 === a2) continue;

//         let sumProduct = 0, sumA = 0, sumB = 0;

//         for (const clientId in matrix) {
//           const r1 = matrix[clientId][a1] || 0;
//           const r2 = matrix[clientId][a2] || 0;
//           sumProduct += r1 * r2;
//           sumA += r1 * r1;
//           sumB += r2 * r2;
//         }

//         similarity[a1][a2] = (sumA && sumB) ? sumProduct / (Math.sqrt(sumA) * Math.sqrt(sumB)) : 0;
//       }
//     }

//     // Step 4: Predict unseen artists for the current client
//     const userRatings = matrix[clientId] || {};
//     const predictedScores = {};

//     for (const artistId of artistList) {
//       if (userRatings[artistId]) continue; // already booked
//       let score = 0, simSum = 0;

//       for (const seenArtistId in userRatings) {
//         const sim = similarity[artistId]?.[seenArtistId] || 0;
//         score += sim * userRatings[seenArtistId];
//         simSum += Math.abs(sim);
//       }

//       if (simSum > 0) {
//         predictedScores[artistId] = score / simSum;
//       }
//     }

//     // Step 5: Sort and pick top 5
//     const recommendedIds = Object.entries(predictedScores)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5)
//       .map(([id]) => id);

//     const recommendedArtists = await Artist.find({ _id: { $in: recommendedIds } });

//     res.json({ recommended: recommendedArtists });
//   } catch (error) {
//     console.error('Recommendation Error:', error);
//     res.status(500).json({ message: 'Server Error in recommendation engine' });
//   }
// };



import Booking from '../../models/Artist.Booking.model.js';
import Artist from '../../models/Artist.model.js';

// helper to compute similarity
const computeArtistSimilarity = (a, b) => {
  let score = 0;

  if (a.category && b.category && a.category === b.category) score += 0.5;

  if (a.genres && b.genres) {
    const overlap = a.genres.filter(g => b.genres.includes(g)).length;
    score += 0.1 * overlap;
  }

  if (a.location?.city && b.location?.city && a.location.city === b.location.city) {
    score += 0.3;
  }

  return score;
};

export const getArtistRecommendationsForClient = async (req, res) => {
  const clientId = req.params.clientId;

  try {
    // 1. Get artist IDs booked by the client
    const clientBookings = await Booking.find({ client: clientId }).select('artist').lean();
    const bookedArtistIds = [...new Set(clientBookings.map(b => b.artist.toString()))];

    if (bookedArtistIds.length === 0) {
      return res.json({ recommended: [] }); // No past data = no recommendation
    }

    // 2. Fetch booked artists' details
    const bookedArtists = await Artist.find({ _id: { $in: bookedArtistIds } }).lean();

    // 3. Fetch all other (not yet booked) artists
    const otherArtists = await Artist.find({ _id: { $nin: bookedArtistIds } }).lean();

    const scores = [];

    // 4. Compare each unbooked artist with all booked ones
    for (const other of otherArtists) {
      let totalScore = 0;

      for (const booked of bookedArtists) {
        totalScore += computeArtistSimilarity(booked, other);
      }

      scores.push({ artist: other, score: totalScore });
    }

    // 5. Sort by score and return top 5
    scores.sort((a, b) => b.score - a.score);
    const topArtists = scores.slice(0, 5).map(s => s.artist);

    return res.json({ recommended: topArtists });
  } catch (error) {
    console.error('Error in getArtistRecommendationsForClient:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
