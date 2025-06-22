
// edit artist page
import React, { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { uploadMedia } from "../components/utlis/UploadMedia.js";

export default function EditArtist() {
  const { user: artist, setUser } = useUserStore();
  const navigate = useNavigate();

  // Convert portfolioLink array to a comma-separated string for easier editing
  const portfolioString = artist?.portfolioLink?.map((p) => p.url).join(", ") || "";

  const [formData, setFormData] = useState({
    username: artist?.username || "",
    location: artist?.location || "",
    category: artist?.category || "",
    portfolio: portfolioString,
    videoUrl: artist?.videoUrl || "", // optional field, keep if you want
    bio: artist?.bio || "",
    wage: artist?.wage || 1000,
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

      // Convert portfolio string back to array of objects [{url, type: 'link'}]
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
          location: formData.location,
          category: formData.category.toLowerCase(),
          bio: formData.bio,
          wage: Number(formData.wage),
          profilePicture: { url: profilePictureUrl },
          portfolioLink,
          media: [...(artist.media || []), ...mediaUrls],
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
          <Input
            label="Portfolio URLs (comma separated)"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
          />
          <Input
            label="Rate (wage)"
            name="wage"
            type="number"
            value={formData.wage}
            onChange={handleChange}
          />
          {/* Optional video URL input */}
          <Input label="Video URL" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Profile Image</label>
            <input type="file" accept="image/*" onChange={handleProfileImageUpload} />
            {artist?.profilePicture?.url && !profileImageFile && (
              <img
                src={artist.profilePicture.url}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
            {profileImageFile && (
              <img
                src={URL.createObjectURL(profileImageFile)}
                alt="New Profile Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Media</label>
            <input type="file" accept="image/*,video/*" multiple onChange={handleMediaUpload} />
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



