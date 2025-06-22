import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const locationOptions = ["Kathmandu", "Pokhara", "Lalitpur"]; // example locations
const sortOptions = [
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "None", value: "" },
];

const ArtistsList = () => {
  const { categoryName } = useParams();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters state
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  // Removed genre states
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [sort, setSort] = useState("");

  const navigate = useNavigate();

  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.append("category", categoryName);

    if (location) params.append("location", location);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    // Removed genres from query
    if (availabilityDate) params.append("availabilityDate", availabilityDate);
    if (sort) params.append("sort", sort);

    return params.toString();
  };

  const fetchArtists = async () => {
    try {
      setLoading(true);
      setError("");
      const queryString = buildQueryString();
      const res = await fetch(`http://localhost:3000/api/client/artists?${queryString}`);
      if (!res.ok) throw new Error("Failed to fetch artists.");
      const data = await res.json();
      setArtists(data.artists);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, [categoryName, location, minPrice, maxPrice, availabilityDate, sort]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 capitalize">{categoryName}</h2>

      <div className="flex gap-8">
        {/* LEFT SIDEBAR FILTERS */}
        <aside className="w-72 bg-white rounded-lg p-6 shadow-md sticky top-20 self-start">
          <h3 className="text-xl font-semibold mb-4">Filters & Sort</h3>

          {/* Location */}
          <label className="block mb-4">
            <span className="font-medium mb-1 block">Location</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All Locations</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </label>

          {/* Price Range */}
          <div className="mb-4">
            <span className="font-medium mb-1 block">Price Range (Rs/hr)</span>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 border rounded px-3 py-2"
              />
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Availability Date */}
          <label className="block mb-4">
            <span className="font-medium mb-1 block">Availability Date</span>
            <input
              type="date"
              value={availabilityDate}
              onChange={(e) => setAvailabilityDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </label>

          {/* Sort */}
          <label className="block">
            <span className="font-medium mb-1 block">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {sortOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </aside>

        {/* RIGHT SIDE: Artists Grid */}
        <main className="flex-1">
          {loading ? (
            <p className="text-center text-gray-500 text-lg">Loading artists...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : artists.length === 0 ? (
            <p className="text-center text-gray-600">No artists in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {artists.map((artist) => (
                <div
                  key={artist._id}
                  onClick={() => navigate(`/artist/${artist._id}`)}
                  className="relative group rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transform hover:scale-105 transition"
                >
                  <img
                    src={artist.profilePicture?.url || "/profilePic.jpg"}
                    alt={artist.username}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="text-xl font-semibold">{artist.username}</h3>
                    <p className="text-indigo-600 italic capitalize">{artist.category}</p>
                    <p className="text-gray-700 font-medium mt-1">
                      Rs {artist.wage?.toLocaleString() || "N/A"}/hr
                    </p>
                    <p className="flex items-center text-gray-500 text-sm gap-2 mt-1">
                      <MapPin size={16} />
                      {artist.location}
                    </p>
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