
//sat location
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

// Converts tags array to vector of 0/1 based on TAGS list
const createVector = (tags) => TAGS.map(tag => tags.includes(tag.toLowerCase()) ? 1 : 0);

// Returns label string based on score thresholds
const getMatchLabel = (score) => {
  if (score >= 0.9) return "🔥 Best Match";
  if (score >= 0.75) return "💎 Excellent Match";
  if (score >= 0.5) return "👍 Good Match";
  return null;
};

const getArtistMatches = async (req, res) => {
  try {
    const { userLat, userLng, maxBudget, preferences = {}, categoryName } = req.body;
     console.log("User coordinates:", userLat, userLng);

    const categoryFilter = categoryName
      ? { category: categoryName.toLowerCase() }
      : {};

    const artists = await Artist.find(categoryFilter).lean();

    // Collect preference tags from user request
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
        console.log("Artist coordinates:", lat, lng);
        const distance = haversine(userLat, userLng, lat, lng); // in km
        const normalizedDistance = Math.min(distance / 50, 1); // normalize assuming 50km max relevance

        const wage = artist.ratePerHour || artist.wage || 0;
        const priceScore = maxBudget
          ? wage <= maxBudget
            ? 1
            : Math.max(0, 1 - (wage - maxBudget) / maxBudget)
          : 1;

        // Weighted final score
        const finalScore = 0.6 * cosineScore + 0.3 * (1 - normalizedDistance) + 0.1 * priceScore;

        return {
          ...artist,
          distance: Number(distance.toFixed(2)),
          score: Number(finalScore.toFixed(4)),
          matchLabel: getMatchLabel(finalScore)
        };
      });

    // Filter and sort final ranked list
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
