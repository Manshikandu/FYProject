
//with loc
import React, { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { uploadMedia } from "../components/utlis/UploadMedia.js";

const GENRE_OPTIONS = ["Pop", "Jazz", "Rock", "Hip-hop", "Classical", "Folk"];
const EVENT_OPTIONS = ["Wedding", "Concert", "Corporate", "Festival", "Private"];
const LANGUAGE_OPTIONS = ["English", "Nepali", "Hindi", "Newari"];

export default function EditArtist() {
  const { user: artist, setUser } = useUserStore();
  const navigate = useNavigate();

  const portfolioString = artist?.portfolioLink?.map((p) => p.url).join(", ") || "";

  const [formData, setFormData] = useState({
    username: artist?.username || "",
    location: artist?.location?.city || "",
    category: artist?.category || "",
    portfolio: portfolioString,
    videoUrl: artist?.videoUrl || "",
    bio: artist?.bio || "",
    wage: artist?.wage || 1000,
    genres: artist?.genres || [],
    eventTypes: artist?.eventTypes || [],
    languages: artist?.languages || [],
  });

  const [mediaFiles, setMediaFiles] = useState([]);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaUpload = (e) => {
    setMediaFiles([...e.target.files]);
  };

  const handleProfileImageUpload = (e) => {
    setProfileImageFile(e.target.files[0]);
  };

  const getCoordinates = async (city) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    }
    return [85.3240, 27.7172]; // default to Kathmandu if failed
  };

  const saveChanges = async () => {
    try {
      const mediaUrls = [];

      for (const file of mediaFiles) {
        const url = await uploadMedia(file);
        const type = file.type.startsWith("video") ? "video" : "image";
        mediaUrls.push({ url, type });
      }

      let profilePictureUrl = artist?.profilePicture?.url || "";
      if (profileImageFile) {
        profilePictureUrl = await uploadMedia(profileImageFile);
      }

      const loc = {
        type: "Point",
        coordinates: await getCoordinates(formData.location),
        city: formData.location,
      };

      const portfolioLink = formData.portfolio
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url) => ({ url, type: "link" }));

      const response = await fetch(`/api/artist/profile/${artist._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          location: loc,
          category: formData.category.toLowerCase(),
          bio: formData.bio,
          wage: Number(formData.wage),
          profilePicture: { url: profilePictureUrl },
          portfolioLink,
          media: [...(artist.media || []), ...mediaUrls],
          genres: formData.genres,
          eventTypes: formData.eventTypes,
          languages: formData.languages,
        }),
      });

      const updated = await response.json();

      if (!response.ok) {
        throw new Error(updated.details || "Update failed");
      }

      setUser(updated.artist);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update artist:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-purple-200 to-purple-100 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">Edit Artist Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Name" name="username" value={formData.username} onChange={handleChange} />
          <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <option value="">Select Category</option>
            {["dj", "musician", "mc", "dancer", "singer", "other"].map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <Input label="Portfolio URLs (comma separated)" name="portfolio" value={formData.portfolio} onChange={handleChange} />
          <Input label="Rate (wage)" name="wage" type="number" value={formData.wage} onChange={handleChange} />
          <Input label="Video URL" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Profile Image</label>
            <input type="file" accept="image/*" onChange={handleProfileImageUpload} />
            {artist?.profilePicture?.url && !profileImageFile && (
              <img src={artist.profilePicture.url} alt="Profile Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
            )}
            {profileImageFile && (
              <img src={URL.createObjectURL(profileImageFile)} alt="New Profile Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Media</label>
            <input type="file" accept="image/*,video/*" multiple onChange={handleMediaUpload} />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Genres</label>
            <div className="flex flex-wrap gap-2">
              {GENRE_OPTIONS.map((genre) => (
                <label key={genre} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(genre)}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        genres: prev.genres.includes(genre)
                          ? prev.genres.filter((g) => g !== genre)
                          : [...prev.genres, genre],
                      }));
                    }}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Event Types</label>
            <div className="flex flex-wrap gap-2">
              {EVENT_OPTIONS.map((event) => (
                <label key={event} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={formData.eventTypes.includes(event)}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        eventTypes: prev.eventTypes.includes(event)
                          ? prev.eventTypes.filter((e) => e !== event)
                          : [...prev.eventTypes, event],
                      }));
                    }}
                  />
                  <span>{event}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Languages</label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((lang) => (
                <label key={lang} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={formData.languages.includes(lang)}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        languages: prev.languages.includes(lang)
                          ? prev.languages.filter((l) => l !== lang)
                          : [...prev.languages, lang],
                      }));
                    }}
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <button
          onClick={saveChanges}
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        {...rest}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
      />
    </div>
  );
}


