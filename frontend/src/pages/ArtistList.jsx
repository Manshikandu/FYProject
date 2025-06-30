


//icon
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Map, Navigation } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const locationOptions = ["Kathmandu", "Pokhara", "Lalitpur"];
const genreOptions = ["Rock", "Jazz", "Pop", "Classical", "Hip-Hop"];
const specialtyOptions = ["Solo", "Band", "DJ", "Composer"];
const languageOptions = ["English", "Nepali", "Hindi"];

const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getMatchLabel = (score) => {
  if (score >= 0.9) return "🔥 Best Match";
  if (score >= 0.75) return "💎 Excellent Match";
  if (score >= 0.5) return "👍 Good Match";
  return null;
};

const ArtistsList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [genres, setGenres] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  // Ref to track previous manual location and prevent repeated toasts
  const prevLocationRef = useRef("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        toast("Geolocation failed, using default location Kathmandu.", { icon: "⚠️" });
        setUserLocation({ lat: 27.7172, lng: 85.3240 });
      }
    );
  }, []);

  useEffect(() => {
    async function fetchArtists() {
      setLoading(true);
      setError("");

      try {
        let { lat: userLat, lng: userLng } = userLocation;

        if (location) {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
          );
          const geoData = await geoRes.json();

          if (geoData[0]) {
            userLat = parseFloat(geoData[0].lat);
            userLng = parseFloat(geoData[0].lon);

            // Show toast only if location changed manually
            if (location !== prevLocationRef.current) {
              toast.success(`Using location: ${location}`);
              prevLocationRef.current = location;
            }
          } else {
            toast.error(`Failed to resolve location: ${location}`);
          }
        } else {
          // If user switches back to "Use My Location" option, reset prevLocationRef
          prevLocationRef.current = "";
        }

        const hasFilters = genres.length || specialties.length || languages.length || maxPrice;

        if (!hasFilters) {
          const res = await fetch(`/api/artist/artists?category=${categoryName || ""}`);
          if (!res.ok) throw new Error("Simple artist fetch failed");
          const data = await res.json();

          const withDistance = data.map((artist) => {
            const coords = artist?.location?.coordinates;
            if (coords && coords.length === 2) {
              const [artistLng, artistLat] = coords;
              const distance = haversine(userLat, userLng, artistLat, artistLng);
              return { ...artist, distance };
            }
            return { ...artist, distance: null };
          });

          withDistance.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));

          setArtists(withDistance);
        } else {
          const res = await fetch("/api/match-artists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userLat,
              userLng,
              maxBudget: maxPrice ? parseInt(maxPrice) : null,
              categoryName: categoryName?.toLowerCase(),
              preferences: {
                genres,
                specialties,
                languages,
              },
            }),
          });

          if (!res.ok) throw new Error("Advanced artist fetch failed");
          const data = await res.json();

          if (data.length === 0) {
            toast.error("No artists found matching your filters.");
          }

          setArtists(data);
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
        toast.error(`Error: ${err.message || "Something went wrong."}`);
      } finally {
        setLoading(false);
      }
    }

    if (userLocation.lat && userLocation.lng) {
      fetchArtists();
    }
  }, [categoryName, location, genres, specialties, languages, maxPrice, userLocation]);

  const toggle = (val, arr, setArr) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const clear = () => {
    setLocation("");
    setMaxPrice("");
    setGenres([]);
    setSpecialties([]);
    setLanguages([]);
    prevLocationRef.current = "";
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      {/* <Toaster position="top-right" /> */}

      <h2 className="text-4xl font-bold text-center mb-10 capitalize">
        {categoryName || "All Artists"}
      </h2>

      <div className="flex gap-8">
        <aside className="w-72 bg-white p-6 rounded shadow sticky top-20 max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>

          <div className="mb-4">
            <label htmlFor="locationSelect" className="font-medium block mb-1">
              Manual Location
            </label>
            <select
              id="locationSelect"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Use My Location</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {[{ label: "Genres", options: genreOptions, state: genres, setState: setGenres },
            { label: "Specialties", options: specialtyOptions, state: specialties, setState: setSpecialties },
            { label: "Languages", options: languageOptions, state: languages, setState: setLanguages }
          ].map(({ label, options, state, setState }) => (
            <div key={label} className="mb-4">
              <span className="font-medium block mb-1">{label}</span>
              {options.map((opt) => (
                <div key={opt} className="text-sm mb-1">
                  <input
                    type="checkbox"
                    id={opt}
                    className="mr-2"
                    checked={state.includes(opt)}
                    onChange={() => toggle(opt, state, setState)}
                  />
                  <label htmlFor={opt}>{opt}</label>
                </div>
              ))}
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="maxBudget" className="font-medium block mb-1">
              Max Budget (Rs/hr)
            </label>
            <input
              id="maxBudget"
              type="number"
              min="1"
              value={maxPrice}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setMaxPrice(isNaN(val) || val <= 0 ? "" : val);
              }}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            onClick={clear}
            className="mt-4 w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </aside>

        <main className="flex-1">
          {loading ? (
            <p className="text-center text-gray-500">Loading artists…</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : artists.length === 0 && maxPrice ? (
            <p className="text-center text-red-500">No artists found within your budget.</p>
          ) : artists.length === 0 ? (
            <p className="text-center text-gray-600">No artists found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {artists.map((artist) => (
                <div
                  key={artist._id}
                  onClick={() => navigate(`/artist/${artist._id}`)}
                  className="cursor-pointer rounded shadow hover:shadow-lg overflow-hidden transition"
                >
                  <img
                    src={artist.profilePicture?.url || "/profilePic.jpg"}
                    alt={artist.username}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="text-xl font-semibold">{artist.username}</h3>
                    <p className="text-indigo-600 capitalize">{artist.category}</p>
                    <p className="mt-1">Rs {artist.wage || artist.ratePerHour}/hr</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Map size={16} />
                      {artist.location?.city || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Navigation size={14} />
                      {artist.distance ? artist.distance.toFixed(2) : "?"} km away
                    </p>
                    {artist.score && getMatchLabel(parseFloat(artist.score)) && (
                      <p className="text-xs text-purple-600 mt-1">
                        {getMatchLabel(parseFloat(artist.score))}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ArtistsList;




