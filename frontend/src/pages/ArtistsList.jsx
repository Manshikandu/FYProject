// import React, { useState, useEffect } from "react";

// export default function ArtistList() {
//   const [artists, setArtists] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async ({ coords }) => {
//         try {
//           const res = await fetch(
//             `/api/artists/nearby?lat=${coords.latitude}&lon=${coords.longitude}`
//           );
//           if (!res.ok) throw new Error("Failed to fetch nearby artists");
//           const data = await res.json();
//           setArtists(data);
//         } catch (err) {
//           setError(err.message || "Failed to fetch artists");
//         } finally {
//           setLoading(false);
//         }
//       },
//       () => {
//         setError("Unable to access your location.");
//         setLoading(false);
//       }
//     );
//   }, []);

//   if (loading)
//     return (
//       <div className="p-4 text-center text-purple-700 font-semibold">Loading artists near you...</div>
//     );

//   if (error)
//     return (
//       <div className="p-4 text-center text-red-500 font-semibold">{error}</div>
//     );

//   if (artists.length === 0)
//     return (
//       <div className="p-4 text-center text-gray-600">
//         No artists found nearby.
//       </div>
//     );

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Nearby Artists</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {artists.map((artist) => (
//           <div key={artist._id} className="p-4 bg-white rounded-xl shadow">
//             <h2 className="text-xl font-semibold">{artist.username}</h2>
//             <p>Location: {artist.location || "N/A"}</p>
//             <p>Distance: {artist.distance?.toFixed(1)} km</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
