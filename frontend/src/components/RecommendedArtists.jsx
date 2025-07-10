
// import React, { useEffect, useState } from "react";
// import axios from "../lib/axios";
// import { useUserStore } from "../stores/useUserStore";
// import { MapPin } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function RecommendedArtists({ clientId }) {
//   const [artists, setArtists] = useState([]);
//   const user = useUserStore((state) => state.user);

//   useEffect(() => {
//     if (!user || user.role !== "client" || !clientId) return;

//     axios
//       .get(`/recommend/${clientId}`)
//       .then((res) => setArtists(res.data.recommended))
//       .catch(console.error);
//   }, [clientId, user]);

//   if (!user || user.role !== "client") return null;

//   return (
//     <section className="px-6 md:px-22 py-12 bg-gradient-to-b from-white to-gray-50">
//       <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
//         Recommended Artists For You
//       </h2>

//       {artists.length === 0 ? (
//         <p className="text-center text-gray-500">No recommendations yet.</p>
//       ) : (
//         <div
//           className="flex space-x-6 overflow-x-auto pb-4"
//           style={{ scrollbarWidth: "none" }}
//         >
//           {artists.slice(0, 10).map((artist) => (
//             <div
//               key={artist._id}
//               className="flex-shrink-0 w-64 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
//             >
//               <img
//                 src={artist.profilePicture?.url || "/default.jpg"}
//                 alt={artist.username}
//                 className="w-full h-60 object-cover rounded-t-2xl"
//               />

//               <div className="p-5 space-y-2">
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   {artist.username}
//                 </h3>

//                 <div className="flex items-center text-gray-600 text-sm gap-4">
//                   <span className="capitalize">{artist.category}</span>
//                   {artist.genres?.length > 0 && (
//                     <div className="flex flex-wrap gap-2">
//                       {artist.genres.slice(0, 3).map((genre, index) => (
//                         <span
//                           key={index}
//                           className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full"
//                         >
//                           {genre}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between text-gray-600 text-sm mt-1">
//                   <span>Rs. {artist.wage || "Not specified"} /hr</span>
//                   <div className="flex items-center gap-1">
//                     <MapPin size={16} />
//                     <span>{artist.location?.city || "Unknown"}</span>
//                   </div>
//                 </div>

//                 <div className="mt-5">
//                   <Link
//                     to={`/artist/${artist._id}`}
//                     className="block w-full text-center text-white bg-purple-500 hover:bg-purple-400 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
//                   >
//                     View Profile
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecommendedArtists({ clientId }) {
  const [artists, setArtists] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user || user.role !== "client" || !clientId) return;

    axios
      .get(`/recommend/${clientId}`)
      .then((res) => setArtists(res.data.recommended))
      .catch(console.error);
  }, [clientId, user]);

  if (!user || user.role !== "client") return null;

  return (
    <section className="px-6 md:px-22 py-12 bg-gradient-to-b from-white to-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Recommended Artists For You
      </h2>

      {artists.length === 0 ? (
        <p className="text-center text-gray-500">No recommendations yet.</p>
      ) : (
        <div
          className="flex space-x-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {artists.slice(0, 10).map((artist) => (
            <div
              key={artist._id}
              className="flex-shrink-0 w-[500px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.03] transition-transform transition-shadow duration-300 overflow-hidden flex cursor-pointer"
            >

              {/* Image: fixed width */}
              <img
                src={artist.profilePicture?.url || "/default.jpg"}
                alt={artist.username}
                className="w-50 h-auto object-cover rounded-l-2xl"
                style={{ minHeight: "240px" }}
              />

              {/* Details: flex-grow */}
              <div className="flex flex-col justify-between p-6 flex-grow">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {artist.username}
                  </h3>

                  <div className="flex items-center text-gray-600 text-sm gap-4 mb-3">
                    <span className="capitalize font-medium">{artist.category}</span>
                    {artist.genres?.length > 0 && (
                      <div className="flex flex-wrap gap-2 max-w-[320px]">
                        {artist.genres.slice(0, 3).map((genre, index) => (
                          <span
                            key={index}
                            className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full whitespace-nowrap"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-gray-600 text-sm gap-4">
                    <span className="font-semibold">
                      Rs. {artist.wage || "Not specified"} /hr
                    </span>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{artist.location?.city || "Unknown"}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/artist/${artist._id}`}
                  className="mt-6 inline-block bg-purple-500 hover:bg-purple-400 text-white py-2 px-6 rounded-lg text-sm font-medium text-center transition-colors duration-200"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
