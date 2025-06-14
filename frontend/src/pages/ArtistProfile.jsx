// import React, { useState } from "react";

// export default function ArtistProfile() {
//   const [profile, setProfile] = useState({
//     name: "Artist Name",
//     location: "New York, NY",
//     category: "Music",
//     portfolio: "https://portfoliolink.com",
//     rate: "$500",
//     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     imageUrl: "https://via.placeholder.com/100" // Replace with artist image or upload
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-400 p-6 text-white">
//       <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl p-6 backdrop-blur-md">
//         <nav className="flex justify-between items-center mb-6">
//           <div className="space-x-6">
//             <button className="hover:underline">Profile</button>
//             <button className="hover:underline">Bookings</button>
//             <button className="hover:underline">Messages</button>
//           </div>
//           <div className="w-10 h-10 bg-white/20 rounded-full"></div>
//         </nav>

//         <header className="flex flex-col md:flex-row items-center gap-6 mb-6">
//           <img
//             src={profile.imageUrl}
//             alt="Artist"
//             className="w-24 h-24 rounded-full border-4 border-white"
//           />
//           <div>
//             <h1 className="text-3xl font-bold">{profile.name}</h1>
//             <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
//               Edit Profile
//             </button>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white text-black rounded-xl p-6">
//           <div>
//             <p className="text-sm text-gray-500">Location</p>
//             <p className="font-semibold">{profile.location}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Category</p>
//             <p className="font-semibold">{profile.category}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Video</p>
//             <div className="aspect-w-16 aspect-h-9">
//               <iframe
//                 className="w-full h-48 rounded-lg"
//                 src={profile.videoUrl}
//                 title="Artist video"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Portfolio</p>
//             <a
//               href={profile.portfolio}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               {profile.portfolio.replace(/^https?:\/\//, '')}
//             </a>
//             <p className="mt-4 text-sm text-gray-500">Rate</p>
//             <p className="font-semibold">{profile.rate}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


//Artist profile before editable
import React from "react";
import { useUserStore } from "../stores/useUserStore";
import { Link } from "react-router-dom";

export default function ArtistProfile() {
  const artist = useUserStore((state) => state.user);

  if (!artist) {
    return <div>Please log in to see your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 p-6 text-black">
      <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl p-6 backdrop-blur-md">
        <nav className="flex justify-between items-center mb-6">
          <div className="space-x-6">
            <button className="hover:text-[#1A237E]">Profile</button>
            {/* <button className="hover:text-[#1A237E]">Bookings</button>
            <button className="hover:text-[#1A237E]">Messages</button> */}
          </div>
          {/* <div className="w-10 h-10 bg-white/20 rounded-full"></div> */}
        </nav>

        <header className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src={artist.imageUrl || "https://via.placeholder.com/100"}
            alt="Artist"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div>
            <h1 className="text-3xl font-bold">{artist.username || artist.name}</h1>
            <Link to="/artist/edit">
             <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Edit Profile
            </button>
            </Link>
           
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white text-black rounded-xl p-6">
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold">{artist.location || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-semibold">{artist.category || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Video</p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-48 rounded-lg"
                src={artist.videoUrl || ""}
                title="Artist video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Portfolio</p>
            <a
              href={artist.portfolio || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {artist.portfolio?.replace(/^https?:\/\//, '') || "N/A"}
            </a>
            <p className="mt-4 text-sm text-gray-500">Rate</p>
            <p className="font-semibold">{artist.rate || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


//After editable

// import React, { useState } from "react";
// import { useUserStore } from "../stores/useUserStore";

// export default function ArtistProfile() {
//   const artist = useUserStore((state) => state.user);
//   const setUser = useUserStore((state) => state.setUser);
//   const updateUserField = useUserStore((state) => state.updateUserField);

//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);

//   if (!artist) return <div>Please log in to see your profile.</div>;

//   // const saveChanges = async () => {
//   //   const token = localStorage.getItem("token"); // or however you store it

//   //   const response = await fetch(`/api/artist/profile/${artist._id}`, {
//   //     method: "PATCH",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       // Optional for now: add only if using authMiddleware
//   //       // Authorization: `Bearer ${token}`,
//   //     },
//   //     body: JSON.stringify(editData),
//   //   });

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/artist/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust token method as needed
//         },
//         body: JSON.stringify(artist),
//       });

//       const updatedUser = await res.json();
//       setUser(updatedUser);
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-300 p-6 text-black">
//       <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl p-6 backdrop-blur-md">
//         <nav className="flex justify-between items-center mb-6">
//           <div className="space-x-6">
//             <button className="hover:text-[#1A237E]">Profile</button>
//             <button className="hover:text-[#1A237E]">Bookings</button>
//             <button className="hover:text-[#1A237E]">Messages</button>
//           </div>
//         </nav>

//         <header className="flex flex-col md:flex-row items-center gap-6 mb-6">
//           <img
//             src={artist.profileImageUrl || "https://via.placeholder.com/100"}
//             alt="Artist"
//             className="w-24 h-24 rounded-full border-4 border-white"
//           />
//           <div className="flex-1">
//             <input
//               type="text"
//               value={artist.username}
//               onChange={(e) => updateUserField("username", e.target.value)}
//               disabled={!editMode}
//               className={`bg-white w-full p-2 rounded ${!editMode && "bg-opacity-50"}`}
//             />
//             <textarea
//               rows="3"
//               value={artist.description || ""}
//               onChange={(e) => updateUserField("description", e.target.value)}
//               disabled={!editMode}
//               placeholder="Tell something about yourself..."
//               className={`bg-white w-full mt-2 p-2 rounded ${!editMode && "bg-opacity-50"}`}
//             />
//             <div className="mt-2 flex gap-2">
//               {editMode ? (
//                 <>
//                   <button
//                     onClick={handleSave}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     disabled={loading}
//                   >
//                     {loading ? "Saving..." : "Save Changes"}
//                   </button>
//                   <button
//                     onClick={() => setEditMode(false)}
//                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//                 >
//                   Edit Profile
//                 </button>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white text-black rounded-xl p-6">
//           <div>
//             <label className="text-sm text-gray-500">Profile Image URL</label>
//             <input
//               type="text"
//               value={artist.profileImageUrl || ""}
//               onChange={(e) => updateUserField("profileImageUrl", e.target.value)}
//               disabled={!editMode}
//               className={`w-full p-2 border rounded ${!editMode && "bg-gray-100"}`}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-500">Video URL (YouTube embed)</label>
//             <input
//               type="text"
//               value={artist.videoUrl || ""}
//               onChange={(e) => updateUserField("videoUrl", e.target.value)}
//               disabled={!editMode}
//               className={`w-full p-2 border rounded ${!editMode && "bg-gray-100"}`}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-500">Portfolio Link</label>
//             <input
//               type="text"
//               value={artist.portfolio || ""}
//               onChange={(e) => updateUserField("portfolio", e.target.value)}
//               disabled={!editMode}
//               className={`w-full p-2 border rounded ${!editMode && "bg-gray-100"}`}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-500">Rate</label>
//             <input
//               type="text"
//               value={artist.rate || ""}
//               onChange={(e) => updateUserField("rate", e.target.value)}
//               disabled={!editMode}
//               className={`w-full p-2 border rounded ${!editMode && "bg-gray-100"}`}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-500">Location</label>
//             <input
//               type="text"
//               value={artist.location || ""}
//               onChange={(e) => updateUserField("location", e.target.value)}
//               disabled={!editMode}
//               className={`w-full p-2 border rounded ${!editMode && "bg-gray-100"}`}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-500">Category</label>
//             <input
//               type="text"
//               value={artist.category || ""}
//               onChange={(e) => updateUserField("category", e.target.value)}
//               disabled={!editMode}
//               className={`w-full p-2 border rounded ${!editMode && "bg-gray-100"}`}
//             />
//           </div>
//         </div>

//         {artist.videoUrl && (
//           <div className="mt-6">
//             <iframe
//               src={artist.videoUrl}
//               title="Artist Video"
//               className="w-full h-64 rounded-lg"
//               allowFullScreen
//             ></iframe>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useUserStore } from "../stores/useUserStore";

// export default function ArtistProfile() {
//   const artist = useUserStore((state) => state.user);
//   const setUser = useUserStore((state) => state.setUser);
//   const updateUserField = useUserStore((state) => state.updateUserField);

//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState(artist?.profileImageUrl);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await fetch("/api/artist/upload-image", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       updateUserField("profileImageUrl", data.imageUrl); // store in Zustand
//       setPreviewImage(data.imageUrl);
//     } catch (err) {
//       console.error("Image upload failed", err);
//     }
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/artist/profile", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(artist),
//       });
//       const updatedUser = await res.json();
//       setUser(updatedUser);
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error saving profile", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!artist) return <div>Please log in to see your profile.</div>;

//   return (
//     <div className="min-h-screen bg-purple-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-lg">
//         <div className="flex items-center gap-6">
//           <div>
//             <img
//               src={previewImage || "https://via.placeholder.com/100"}
//               alt="Profile"
//               className="w-24 h-24 rounded-full border"
//             />
//             {editMode && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="mt-2 text-sm"
//               />
//             )}
//           </div>
//           <div className="flex-1">
//             <input
//               className={`w-full p-2 rounded border ${!editMode && "bg-gray-100"}`}
//               value={artist.username || ""}
//               disabled={!editMode}
//               onChange={(e) => updateUserField("username", e.target.value)}
//             />
//             <textarea
//               className={`w-full p-2 mt-2 rounded border ${!editMode && "bg-gray-100"}`}
//               value={artist.description || ""}
//               disabled={!editMode}
//               onChange={(e) => updateUserField("description", e.target.value)}
//               placeholder="Tell us about yourself"
//             />
//           </div>
//           <div>
//             {editMode ? (
//               <button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             ) : (
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
//         {/* Additional form fields here... */}
//       </div>
//     </div>
//   );
// }
