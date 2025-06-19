import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Link , useNavigate} from "react-router-dom";


const ArtistProfileView = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/client/artists/profile/${id}`);
        if (!res.ok) throw new Error("Failed to fetch artist data");
        const data = await res.json();
        setArtist(data.artist || data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArtist();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-purple-700 font-semibold">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return <div className="text-center py-10">Artist not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={artist.profilePicture?.url || "https://via.placeholder.com/150"}
              alt={artist.username}
              className="w-24 h-24 rounded-full object-cover bg-gray-300"
            />
            <div>
              <h1 className="text-2xl font-bold">{artist.username}</h1>
              <div className="mt-1 flex gap-2 flex-wrap">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  {artist.category}
                </span>
              </div>
            </div>
          </div>
          <Link to={`/book?artistId=${artist._id}`}>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Book Artist
            </button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mt-5 border-b pb-2 flex gap-6 font-semibold text-purple-700 col-span-2">
          <button className="hover:text-purple-900">Bio</button>
          <button className="hover:text-purple-900">Media</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
          {/* Sidebar Info */}
          <div className="space-y-5 bg-purple-50 rounded-xl p-4 shadow-sm">
            <div>
              <p className="text-gray-600 text-sm">📍 Location</p>
              <p className="font-medium text-base">{artist.location || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">💰 Rate</p>
              <p className="font-medium text-base">{artist.wage || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">🖼 Portfolio</p>
              {artist.portfolioLink?.length > 0 ? (
                artist.portfolioLink.map((p, i) => (
                  <div key={i}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {p.url.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                ))
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold mb-2 text-purple-700">📅 Schedule</h2>
              <div className="bg-white rounded-xl shadow p-2">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2">
            <div>
              <h3 className="text-base font-semibold mb-2 text-purple-700">Bio</h3>
              <p className="text-gray-700 text-sm">
                {artist.bio || "This artist has not written a bio yet."}
              </p>
            </div>

            <div className="mt-5">
              <h3 className="text-base font-semibold mb-2 text-purple-700">Media</h3>

              {/* Videos */}
              {artist.media?.some((item) => item?.type === "video") && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Videos</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {artist.media
                      .filter((item) => item.type === "video")
                      .map((video, i) => (
                        <video
                          key={i}
                          src={video.url}
                          controls
                          className="rounded-xl w-full max-h-60 object-cover shadow-md"
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Images */}
              {artist.media?.some((item) => item?.type === "image") ? (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Images</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {artist.media
                      .filter((item) => item.type === "image")
                      .map((image, i) => (
                        <img
                          key={i}
                          src={image.url}
                          alt={`media-${i}`}
                          className="rounded-xl w-full h-40 object-cover shadow-md"
                        />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">No images uploaded yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileView;
