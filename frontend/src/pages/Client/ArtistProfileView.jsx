
// /////////////////without review ko code////////////////////////////
// // // import React, { useState, useEffect, useRef } from "react";
// // // import DatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import { useParams, Link } from "react-router-dom";
// // // import BookedDatesCalendar from "../../components/BookedDatesCalendar";

// // // const ArtistProfileView = () => {
// // //   const { id } = useParams();
// // //   const [artist, setArtist] = useState(null);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [selectedDate, setSelectedDate] = useState(new Date());
// // //   const [bookedSlots, setBookedSlots] = useState([]);
// // //   const [activeSection, setActiveSection] = useState("bio");

// // //   const bioRef = useRef(null);
// // //   const mediaRef = useRef(null);
// // //   const reviewsRef = useRef(null);

// // //   const scrollToRef = (ref) => {
// // //     if (ref.current) {
// // //       ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const fetchArtist = async () => {
// // //       try {
// // //         const res = await fetch(`http://localhost:3000/api/client/artists/profile/${id}`);
// // //         if (!res.ok) throw new Error("Failed to fetch artist data");
// // //         const data = await res.json();
// // //         setArtist(data.artist || data);
// // //       } catch (error) {
// // //         console.error("Error fetching artist:", error);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     const fetchBookedSlots = async () => {
// // //       try {
// // //         const res = await fetch(`http://localhost:3000/api/bookings/artist/${id}/booked-slots`);
// // //         const data = await res.json();
// // //         if (data.bookedSlots) {
// // //           setBookedSlots(data.bookedSlots);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching booked slots:", error);
// // //       }
// // //     };

// // //     if (id) {
// // //       fetchArtist();
// // //       fetchBookedSlots();
// // //     }
// // //   }, [id]);

// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       const offset = 160;
// // //       const bioTop = bioRef.current?.getBoundingClientRect().top || 0;
// // //       const mediaTop = mediaRef.current?.getBoundingClientRect().top || 0;
// // //       const reviewsTop = reviewsRef.current?.getBoundingClientRect().top || 0;

// // //       if (reviewsTop - offset <= 0) {
// // //         setActiveSection("reviews");
// // //       } else if (mediaTop - offset <= 0) {
// // //         setActiveSection("media");
// // //       } else {
// // //         setActiveSection("bio");
// // //       }
// // //     };

// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   const formatTime = (time24) => {
// // //     if (!time24) return "";
// // //     const [hourStr, minuteStr] = time24.split(":");
// // //     let hour = parseInt(hourStr, 10);
// // //     const minute = minuteStr || "00";
// // //     const ampm = hour >= 12 ? "PM" : "AM";
// // //     hour = hour % 12 || 12;
// // //     return `${hour}:${minute} ${ampm}`;
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
// // //           <p className="text-purple-700 font-semibold">Loading artist profile...</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!artist) {
// // //     return <div className="text-center py-10">Artist not found.</div>;
// // //   }

// // //   const slotsForSelectedDate = bookedSlots.filter(
// // //     (slot) =>
// // //       new Date(slot.eventDate).toDateString() === selectedDate.toDateString() &&
// // //       ["booked", "accepted"].includes(slot.status)
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 p-4">
// // //       <div className="max-w-6xl mx-auto flex gap-5 bg-white rounded-xl shadow-md p-5">
// // //         {/* Sidebar */}
// // //         <div className="w-1/4 sticky top-5 h-max">
// // //           <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
// // //             <div className="text-center">
// // //               <img
// // //                 src={artist.profilePicture?.url || "https://via.placeholder.com/150"}
// // //                 alt="profile"
// // //                 className="w-24 h-24 rounded-full object-cover bg-gray-300 mx-auto"
// // //               />
// // //               <h1 className="text-xl font-bold mt-2">{artist.username}</h1>
// // //               <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mt-1 inline-block">
// // //                 {artist.category}
// // //               </span>
// // //             </div>
// // //             <div className="mt-4">
// // //               <p className="font-medium text-base">
// // //                 {artist.location?.city ||
// // //                   (artist.location?.coordinates
// // //                     ? `${artist.location.coordinates.lat}, ${artist.location.coordinates.lng}`
// // //                     : "N/A")}
// // //               </p>
// // //             </div>
// // //             <div className="mt-4">
// // //               <p className="text-gray-600 text-sm">💰 Rate</p>
// // //               <p className="font-medium text-base">{artist.wage || "N/A"}</p>
// // //             </div>
// // //             <div className="mt-4">
// // //               <p className="text-gray-600 text-sm">🖼 Portfolio</p>
// // //               {artist.portfolioLink?.length > 0 ? (
// // //                 artist.portfolioLink.map((p, i) => (
// // //                   <div key={i}>
// // //                     <a
// // //                       href={p.url}
// // //                       target="_blank"
// // //                       rel="noopener noreferrer"
// // //                       className="text-blue-600 hover:underline break-all"
// // //                     >
// // //                       {p.url.replace(/^https?:\/\//, "")}
// // //                     </a>
// // //                   </div>
// // //                 ))
// // //               ) : (
// // //                 <span className="text-gray-500">N/A</span>
// // //               )}
// // //             </div>
// // //             <div className="mt-4">
// // //               <h2 className="text-base font-semibold mb-2 text-purple-700">📅 Schedule</h2>
// // //               <div className="bg-white rounded-xl shadow p-2">
// // //                 <BookedDatesCalendar
// // //                   bookedSlots={bookedSlots}
// // //                   selectedDate={selectedDate}
// // //                   onDateChange={setSelectedDate}
// // //                   inline
// // //                 />
// // //                 <p className="text-xs text-gray-500 mt-1">🔴 Red dates are booked.</p>
// // //               </div>

// // //               <div className="mt-4 max-h-48 overflow-y-auto">
// // //                 <h3 className="text-sm font-semibold mb-2 text-purple-700">
// // //                   Booked Slots on {selectedDate.toDateString()}
// // //                 </h3>
// // //                 {slotsForSelectedDate.length === 0 ? (
// // //                   <p className="text-gray-500 text-xs">No booked slots for this date.</p>
// // //                 ) : (
// // //                   <ul className="list-disc list-inside text-sm">
// // //                     {slotsForSelectedDate.map((slot) => (
// // //                       <li
// // //                         key={slot._id}
// // //                         className={`px-2 py-1 rounded-lg my-1 ${
// // //                           slot.status === "booked"
// // //                             ? "bg-red-500 text-white"
// // //                             : "bg-yellow-300 text-black"
// // //                         }`}
// // //                       >
// // //                         {formatTime(slot.startTime)} - {formatTime(slot.endTime)} →{" "}
// // //                         <span className="capitalize font-medium">{slot.status}</span>
// // //                       </li>
// // //                     ))}
// // //                   </ul>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Main Content */}
// // //         <div className="w-3/4">
// // //           <div className="flex items-center justify-between mb-4">
// // //             <h2 className="text-2xl font-bold text-purple-700">Artist Profile</h2>
// // //             <Link to={`/book?artistId=${artist._id}`}>
// // //               <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
// // //                 Book Artist
// // //               </button>
// // //             </Link>
// // //           </div>

// // //           <div className="border-b pb-2 flex gap-6 font-semibold text-purple-700 sticky top-0 bg-white z-10">
// // //             <button
// // //               onClick={() => scrollToRef(bioRef)}
// // //               className={`hover:text-purple-900 ${
// // //                 activeSection === "bio" ? "border-b-2 border-purple-600" : ""
// // //               }`}
// // //             >
// // //               Bio
// // //             </button>
// // //             <button
// // //               onClick={() => scrollToRef(mediaRef)}
// // //               className={`hover:text-purple-900 ${
// // //                 activeSection === "media" ? "border-b-2 border-purple-600" : ""
// // //               }`}
// // //             >
// // //               Media
// // //             </button>
// // //             <button
// // //               onClick={() => scrollToRef(reviewsRef)}
// // //               className={`hover:text-purple-900 ${
// // //                 activeSection === "reviews" ? "border-b-2 border-purple-600" : ""
// // //               }`}
// // //             >
// // //               Reviews
// // //             </button>
// // //           </div>

// // //           <div className="mt-6 space-y-10">
// // //             {/* Bio */}
// // //             <div ref={bioRef} className="scroll-mt-28">
// // //               <h3 className="text-lg font-semibold mb-2 text-purple-700">Bio</h3>
// // //               <p className="text-gray-700 text-sm">
// // //                 {artist.bio || "This artist has not written a bio yet."}
// // //               </p>

// // //               {artist.genres?.length > 0 && (
// // //                 <div className="mt-4">
// // //                   <p className="text-gray-600 text-sm">🎵 Genres</p>
// // //                   <p className="font-medium text-base">{artist.genres.join(", ")}</p>
// // //                 </div>
// // //               )}

// // //               {artist.eventTypes?.length > 0 && (
// // //                 <div className="mt-4">
// // //                   <p className="text-gray-600 text-sm">🎤 Event Types</p>
// // //                   <p className="font-medium text-base">{artist.eventTypes.join(", ")}</p>
// // //                 </div>
// // //               )}

// // //               {artist.languages?.length > 0 && (
// // //                 <div className="mt-4">
// // //                   <p className="text-gray-600 text-sm">🗣️ Languages</p>
// // //                   <p className="font-medium text-base">{artist.languages.join(", ")}</p>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Media */}
// // //             <div ref={mediaRef} className="scroll-mt-28">
// // //               <h3 className="text-lg font-semibold mb-2 text-purple-700">Media</h3>
// // //               {artist.media?.some((item) => item?.type === "video") && (
// // //                 <div className="mb-4">
// // //                   <h4 className="text-sm font-semibold text-gray-600 mb-1">Videos</h4>
// // //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //                     {artist.media
// // //                       .filter((item) => item.type === "video")
// // //                       .map((video, i) => (
// // //                         <video
// // //                           key={i}
// // //                           src={video.url}
// // //                           controls
// // //                           className="rounded-xl w-full max-h-60 object-cover shadow-md"
// // //                         />
// // //                       ))}
// // //                   </div>
// // //                 </div>
// // //               )}
// // //               {artist.media?.some((item) => item?.type === "image") ? (
// // //                 <div>
// // //                   <h4 className="text-sm font-semibold text-gray-600 mb-1">Images</h4>
// // //                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
// // //                     {artist.media
// // //                       .filter((item) => item.type === "image")
// // //                       .map((image, i) => (
// // //                         <img
// // //                           key={i}
// // //                           src={image.url}
// // //                           alt={`media-${i}`}
// // //                           className="rounded-xl w-full h-40 object-cover shadow-md"
// // //                         />
// // //                       ))}
// // //                   </div>
// // //                 </div>
// // //               ) : (
// // //                 <div className="text-gray-500">No images uploaded yet.</div>
// // //               )}
// // //             </div>

// // //             {/* Reviews */}
// // //             <div ref={reviewsRef} className="scroll-mt-28">
// // //               <h3 className="text-lg font-semibold mb-2 text-purple-700">Reviews</h3>
// // //               <p className="text-gray-600 text-sm">No reviews available yet.</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ArtistProfileView;




// // import React, { useState, useEffect, useRef } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import BookedDatesCalendar from "../../components/BookedDatesCalendar";

// // // StarDisplay component to show stars based on rating (read-only)
// // function StarDisplay({ rating }) {
// //   return (
// //     <div className="flex gap-1">
// //       {[1, 2, 3, 4, 5].map((star) => (
// //         <svg
// //           key={star}
// //           xmlns="http://www.w3.org/2000/svg"
// //           fill={star <= rating ? "#facc15" : "none"}
// //           stroke="#facc15"
// //           viewBox="0 0 24 24"
// //           strokeWidth={1.5}
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //           className="w-5 h-5"
// //         >
// //           <path d="M11.48 3.499l2.36 4.766 5.265.765-3.812 3.72.9 5.246-4.713-2.475-4.713 2.475.9-5.246-3.812-3.72 5.265-.765 2.36-4.766z" />
// //         </svg>
// //       ))}
// //     </div>
// //   );
// // }

// // const ArtistProfileView = () => {
// //   const { id } = useParams();
// //   const [artist, setArtist] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [bookedSlots, setBookedSlots] = useState([]);
// //   const [reviews, setReviews] = useState([]);
// //   const [activeSection, setActiveSection] = useState("bio");

// //   const bioRef = useRef(null);
// //   const mediaRef = useRef(null);
// //   const reviewsRef = useRef(null);

// //   const scrollToRef = (ref) => {
// //     if (ref.current) {
// //       ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchArtist = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:3000/api/client/artists/profile/${id}`);
// //         if (!res.ok) throw new Error("Failed to fetch artist data");
// //         const data = await res.json();
// //         setArtist(data.artist || data);
// //       } catch (error) {
// //         console.error("Error fetching artist:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     const fetchBookedSlots = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:3000/api/bookings/artist/${id}/booked-slots`);
// //         const data = await res.json();
// //         if (data.bookedSlots) {
// //           setBookedSlots(data.bookedSlots);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching booked slots:", error);
// //       }
// //     };

// //     const fetchReviews = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:3000/api/reviews/artist/${id}`);
// //         if (!res.ok) throw new Error("Failed to fetch reviews");
// //         const data = await res.json();
        
// //         setReviews(data);
// //       } catch (error) {
// //         console.error("Error fetching reviews:", error);
// //       }
// //     };

// //     if (id) {
// //       fetchArtist();
// //       fetchBookedSlots();
// //       fetchReviews();
// //     }
// //   }, [id]);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const offset = 160;
// //       const bioTop = bioRef.current?.getBoundingClientRect().top || 0;
// //       const mediaTop = mediaRef.current?.getBoundingClientRect().top || 0;
// //       const reviewsTop = reviewsRef.current?.getBoundingClientRect().top || 0;

// //       if (reviewsTop - offset <= 0) {
// //         setActiveSection("reviews");
// //       } else if (mediaTop - offset <= 0) {
// //         setActiveSection("media");
// //       } else {
// //         setActiveSection("bio");
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const formatTime = (time24) => {
// //     if (!time24) return "";
// //     const [hourStr, minuteStr] = time24.split(":");
// //     let hour = parseInt(hourStr, 10);
// //     const minute = minuteStr || "00";
// //     const ampm = hour >= 12 ? "PM" : "AM";
// //     hour = hour % 12 || 12;
// //     return `${hour}:${minute} ${ampm}`;
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
// //           <p className="text-purple-700 font-semibold">Loading artist profile...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!artist) {
// //     return <div className="text-center py-10">Artist not found.</div>;
// //   }

// //   const slotsForSelectedDate = bookedSlots.filter(
// //     (slot) =>
// //       new Date(slot.eventDate).toDateString() === selectedDate.toDateString() &&
// //       ["booked", "accepted"].includes(slot.status)
// //   );

// //   // Calculate average rating from reviews
// //   const averageRating =
// //     reviews.length > 0
// //       ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
// //       : 0;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 p-4">
// //       <div className="max-w-6xl mx-auto flex gap-5 bg-white rounded-xl shadow-md p-5">
// //         {/* Sidebar */}
// //         <div className="w-1/4 sticky top-5 h-max">
// //           <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
// //             <div className="text-center">
// //               <img
// //                 src={artist.profilePicture?.url || "https://via.placeholder.com/150"}
// //                 alt="profile"
// //                 className="w-24 h-24 rounded-full object-cover bg-gray-300 mx-auto"
// //               />
// //               <h1 className="text-xl font-bold mt-2">{artist.username}</h1>
// //               <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mt-1 inline-block">
// //                 {artist.category}
// //               </span>
// //             </div>
// //             <div className="mt-4">
// //               <p className="font-medium text-base">
// //                 {artist.location?.city ||
// //                   (artist.location?.coordinates
// //                     ? `${artist.location.coordinates.lat}, ${artist.location.coordinates.lng}`
// //                     : "N/A")}
// //               </p>
// //             </div>
// //             <div className="mt-4">
// //               <p className="text-gray-600 text-sm">💰 Rate</p>
// //               <p className="font-medium text-base">{artist.wage || "N/A"}</p>
// //             </div>
// //             <div className="mt-4">
// //               <p className="text-gray-600 text-sm">🖼 Portfolio</p>
// //               {artist.portfolioLink?.length > 0 ? (
// //                 artist.portfolioLink.map((p, i) => (
// //                   <div key={i}>
// //                     <a
// //                       href={p.url}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="text-blue-600 hover:underline break-all"
// //                     >
// //                       {p.url.replace(/^https?:\/\//, "")}
// //                     </a>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <span className="text-gray-500">N/A</span>
// //               )}
// //             </div>
// //             <div className="mt-4">
// //               <h2 className="text-base font-semibold mb-2 text-purple-700">📅 Schedule</h2>
// //               <div className="bg-white rounded-xl shadow p-2">
// //                 <BookedDatesCalendar
// //                   bookedSlots={bookedSlots}
// //                   selectedDate={selectedDate}
// //                   onDateChange={setSelectedDate}
// //                   inline
// //                 />
// //                 <p className="text-xs text-gray-500 mt-1">🔴 Red dates are booked.</p>
// //               </div>

// //               <div className="mt-4 max-h-48 overflow-y-auto">
// //                 <h3 className="text-sm font-semibold mb-2 text-purple-700">
// //                   Booked Slots on {selectedDate.toDateString()}
// //                 </h3>
// //                 {slotsForSelectedDate.length === 0 ? (
// //                   <p className="text-gray-500 text-xs">No booked slots for this date.</p>
// //                 ) : (
// //                   <ul className="list-disc list-inside text-sm">
// //                     {slotsForSelectedDate.map((slot) => (
// //                       <li
// //                         key={slot._id}
// //                         className={`px-2 py-1 rounded-lg my-1 ${
// //                           slot.status === "booked"
// //                             ? "bg-red-500 text-white"
// //                             : "bg-yellow-300 text-black"
// //                         }`}
// //                       >
// //                         {formatTime(slot.startTime)} - {formatTime(slot.endTime)} →{" "}
// //                         <span className="capitalize font-medium">{slot.status}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="w-3/4">
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-2xl font-bold text-purple-700">Artist Profile</h2>
// //             <Link to={`/book?artistId=${artist._id}`}>
// //               <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
// //                 Book Artist
// //               </button>
// //             </Link>
// //           </div>

// //           <div className="border-b pb-2 flex gap-6 font-semibold text-purple-700 sticky top-0 bg-white z-10">
// //             <button
// //               onClick={() => scrollToRef(bioRef)}
// //               className={`hover:text-purple-900 ${
// //                 activeSection === "bio" ? "border-b-2 border-purple-600" : ""
// //               }`}
// //             >
// //               Bio
// //             </button>
// //             <button
// //               onClick={() => scrollToRef(mediaRef)}
// //               className={`hover:text-purple-900 ${
// //                 activeSection === "media" ? "border-b-2 border-purple-600" : ""
// //               }`}
// //             >
// //               Media
// //             </button>
// //             <button
// //               onClick={() => scrollToRef(reviewsRef)}
// //               className={`hover:text-purple-900 ${
// //                 activeSection === "reviews" ? "border-b-2 border-purple-600" : ""
// //               }`}
// //             >
// //               Reviews
// //             </button>
// //           </div>

// //           <div className="mt-6 space-y-10">
// //             {/* Bio */}
// //             <div ref={bioRef} className="scroll-mt-28">
// //               <h3 className="text-lg font-semibold mb-2 text-purple-700">Bio</h3>
// //               <p className="text-gray-700 text-sm">
// //                 {artist.bio || "This artist has not written a bio yet."}
// //               </p>

// //               {artist.genres?.length > 0 && (
// //                 <div className="mt-4">
// //                   <p className="text-gray-600 text-sm">🎵 Genres</p>
// //                   <p className="font-medium text-base">{artist.genres.join(", ")}</p>
// //                 </div>
// //               )}

// //               {artist.eventTypes?.length > 0 && (
// //                 <div className="mt-4">
// //                   <p className="text-gray-600 text-sm">🎤 Event Types</p>
// //                   <p className="font-medium text-base">{artist.eventTypes.join(", ")}</p>
// //                 </div>
// //               )}

// //               {artist.languages?.length > 0 && (
// //                 <div className="mt-4">
// //                   <p className="text-gray-600 text-sm">🗣️ Languages</p>
// //                   <p className="font-medium text-base">{artist.languages.join(", ")}</p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Media */}
// //             <div ref={mediaRef} className="scroll-mt-28">
// //               <h3 className="text-lg font-semibold mb-2 text-purple-700">Media</h3>
// //               {artist.media?.some((item) => item?.type === "video") && (
// //                 <div className="mb-4">
// //                   <h4 className="text-sm font-semibold text-gray-600 mb-1">Videos</h4>
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                     {artist.media
// //                       .filter((item) => item.type === "video")
// //                       .map((video, i) => (
// //                         <video
// //                           key={i}
// //                           src={video.url}
// //                           controls
// //                           className="rounded-xl w-full max-h-60 object-cover shadow-md"
// //                         />
// //                       ))}
// //                   </div>
// //                 </div>
// //               )}
// //               {artist.media?.some((item) => item?.type === "image") ? (
// //                 <div>
// //                   <h4 className="text-sm font-semibold text-gray-600 mb-1">Images</h4>
// //                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
// //                     {artist.media
// //                       .filter((item) => item.type === "image")
// //                       .map((image, i) => (
// //                         <img
// //                           key={i}
// //                           src={image.url}
// //                           alt={`media-${i}`}
// //                           className="rounded-xl w-full h-40 object-cover shadow-md"
// //                         />
// //                       ))}
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div className="text-gray-500">No images uploaded yet.</div>
// //               )}
// //             </div>

// //             {/* Reviews */}
// //             <div ref={reviewsRef} className="scroll-mt-28">
// //               <h3 className="text-lg font-semibold mb-2 text-purple-700">Reviews</h3>

// //               {reviews.length === 0 ? (
// //                 <p className="text-gray-600 text-sm">No reviews available yet.</p>
// //               ) : (
// //                 <>
// //                   <div className="flex items-center gap-2 mb-4">
// //                     <StarDisplay rating={Math.round(averageRating)} />
// //                     <span className="text-sm text-gray-700">
// //                       {averageRating} out of 5 ({reviews.length} reviews)
// //                     </span>
// //                   </div>

// //                   <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
// //                     {reviews.slice(0, 5).map((review) => (
// //                       <div
// //                         key={review._id}
// //                         className="bg-white p-4 rounded-xl shadow-sm border flex gap-3"
// //                       >
// //                         <img
// //                           src={
// //                             review.clientId?.profilePicture?.url ||
// //                             "https://via.placeholder.com/50?text=User"
// //                           }
// //                           alt={review.clientId?.username || "User"}
// //                           className="w-12 h-12 rounded-full object-cover flex-shrink-0"
// //                         />
// //                         <div>
// //                           <div className="flex items-center gap-2 mb-1">
// //                             <StarDisplay rating={review.rating} />
// //                             <span className="text-sm text-gray-500">
// //                               {new Date(review.createdAt).toLocaleDateString()}
// //                             </span>
// //                           </div>
// //                           <p className="text-gray-800 text-sm">{review.reviewText}</p>
// //                           <p className="text-xs text-gray-500 mt-1 font-medium">
// //                             By {review.clientId?.username || "Anonymous"}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ArtistProfileView;




// // /////////////////////////with review chalirako code////////////////////////////
// // import React, { useState, useEffect } from "react";
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import {ArrowLeft, MapPin, Calendar, BookOpen, Music, Globe, CalendarCog } from "lucide-react";
// // import BookedDatesCalendar from "../../components/BookedDatesCalendar";
// // import ReviewsSection from "../../components/ReviewsSection";

// // const ArtistProfileView = () => {
// //   const navigate = useNavigate();
// //   const { id } = useParams();
// //   const [artist, setArtist] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [bookedSlots, setBookedSlots] = useState([]);
// //   const [reviews, setReviews] = useState([]);
// //   const [activeSection, setActiveSection] = useState("bio");

// //   useEffect(() => {
// //     const fetchArtist = async () => {
// //       try {
// //         const res = await fetch(
// //           `http://localhost:3000/api/client/artists/profile/${id}`
// //         );
// //         if (!res.ok) throw new Error("Failed to fetch artist data");
// //         const data = await res.json();
// //         setArtist(data.artist || data);
// //       } catch (error) {
// //         console.error("Error fetching artist:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     const fetchBookedSlots = async () => {
// //       try {
// //         const res = await fetch(
// //           `http://localhost:3000/api/bookings/artist/${id}/booked-slots`
// //         );
// //         const data = await res.json();
// //         if (data.bookedSlots) {
// //           setBookedSlots(data.bookedSlots);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching booked slots:", error);
// //       }
// //     };

// //     const fetchReviews = async () => {
// //       try {
// //         const res = await fetch(`http://localhost:3000/api/reviews/artist/${id}`);
// //         if (!res.ok) throw new Error("Failed to fetch reviews");
// //         const data = await res.json();
// //         setReviews(data);
// //       } catch (error) {
// //         console.error("Error fetching reviews:", error);
// //       }
// //     };

// //     if (id) {
// //       fetchArtist();
// //       fetchBookedSlots();
// //       fetchReviews();
// //     }
// //   }, [id]);

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
// //           <p className="text-purple-700 font-semibold">Loading artist profile...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!artist) {
// //     return <div className="text-center py-10">Artist not found.</div>;
// //   }

// //   return (
    
// //     <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 p-4">
// //       <button
// //         onClick={() => navigate(-1)}
// //         className="fixed top-4 left-4 flex items-center gap-2 bg-purple-100 text-purple-600  hover:bg-purple-200 shadow-md rounded-md px-3 py-1.5 font-medium transition duration-300 ease-in-out cursor-pointer select-none" title="Back to artist page"
// //       >
// //       <ArrowLeft className="w-8 h-8" />
// //         Back 
// //       </button>
// //       <div className="max-w-6xl mx-auto flex gap-5 bg-white rounded-xl shadow-md p-5">
// //         {/* Sidebar */}
// //         <div className="w-1/3 sticky top-5 h-max">
// //           <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
// //             <div className="text-center">
// //               <img
// //                 src={artist.profilePicture?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
// //                 alt="profile"
// //                 className="w-24 h-24 rounded-full object-cover bg-gray-300 mx-auto"
// //               />
// //               <h1 className="text-xl font-bold mt-2">{artist.username}</h1>
// //               <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mt-1 inline-block">
// //                 {artist.category}
// //               </span>
// //             </div>

// //             <div className="mt-4">
// //               <p className="flex items-center gap-2">
// //                  <MapPin className="w-4 h-4 text-purple-600" />
// //                 {artist.location?.city ||
// //                   (artist.location?.coordinates
// //                     ? `${artist.location.coordinates.lat}, ${artist.location.coordinates.lng}`
// //                     : "N/A")}
// //               </p>
// //             </div>

// //             <div className="mt-4 flex items-center gap-2">
// //               <p className="text-gray-600 text-sm"> Rate:</p>
// //               <p className="font-medium text-base text-purple-600">Rs {artist.wage || "N/A"} /hr</p>
// //             </div>

// //             <div className="mt-4">
// //               <p className="text-gray-600 text-sm"> Portfolio:</p>
// //               {artist.portfolioLink?.length > 0 ? (
// //                 artist.portfolioLink.map((p, i) => (
// //                   <div key={i}>
// //                     <a
// //                       href={p.url}
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="text-blue-600 hover:underline break-all"
// //                     >
// //                       {p.url.replace(/^https?:\/\//, "")}
// //                     </a>
// //                   </div>
// //                 ))
// //               ) : (
// //                 <span className="text-gray-500">N/A</span>
// //               )}
// //             </div>

// //             <div>
// //                 <div className="flex items-center gap-2 mb-2 mt-4">
// //                   <Calendar className="w-4 h-4 text-purple-600" />
// //                   <span className="font-semibold text-purple-600">Schedule</span>
// //                 </div>
// //                 <BookedDatesCalendar
// //                   bookedSlots={bookedSlots}
// //                   selectedDate={selectedDate}
// //                   onDateChange={setSelectedDate}
// //                   inline
// //                 />
// //               </div>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="w-3/4">
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-2xl font-bold text-purple-700">Artist Profile</h2>
// //             <Link to={`/book?artistId=${artist._id}`}>
// //               <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
// //                 Book Artist
// //               </button>
// //             </Link>
// //           </div>

// //           {/* Tabs */}
// //           <div className="border-b pb-2 flex gap-6 font-semibold text-purple-700 sticky top-0 bg-white z-10">
// //             <button
// //               onClick={() => setActiveSection("bio")}
// //               className={`hover:text-purple-900 ${
// //                 activeSection === "bio" ? "border-b-2 border-purple-600" : ""
// //               }`}
// //             >
// //               Bio
// //             </button>
// //             <button
// //               onClick={() => setActiveSection("media")}
// //               className={`hover:text-purple-900 ${
// //                 activeSection === "media" ? "border-b-2 border-purple-600" : ""
// //               }`}
// //             >
// //               Media
// //             </button>
// //             <button
// //               onClick={() => setActiveSection("reviews")}
// //               className={`hover:text-purple-900 ${
// //                 activeSection === "reviews" ? "border-b-2 border-purple-600" : ""
// //               }`}
// //             >
// //               Reviews
// //             </button>
// //           </div>

// //           {/* Tab Content */}
// //           <div className="mt-6 space-y-10">
// //             {activeSection === "bio" && (
// //               <div>
// //                 <h3 className="text-lg font-semibold mb-2 text-purple-700">Bio</h3>
// //                 <p className="text-gray-700 text-sm">
// //                   {artist.bio || "This artist has not written a bio yet."}
// //                 </p>

// //                 {artist.genres?.length > 0 && (
// //                   <div className="mt-4">
// //                     <p className="text-gray-600 text-sm flex items-center gap-2"> 
// //                        <Music className="w-4 h-4" />Genres</p>
// //                     <p className="font-medium text-base">{artist.genres.join(", ")}</p>
// //                   </div>
// //                 )}

// //                 {artist.eventTypes?.length > 0 && (
// //                   <div className="mt-4">
// //                     <p className="text-gray-600 text-sm flex items-center gap-2"> 
// //                        <CalendarCog className="w-4 h-4" /> Event Types</p>
// //                     <p className="font-medium text-base">{artist.eventTypes.join(", ")}</p>
// //                   </div>
// //                 )}

// //                 {artist.languages?.length > 0 && (
// //                   <div className="mt-4">
// //                     <p className="text-gray-600 text-sm flex items-center gap-2"> 
// //                        <Globe className="w-4 h-4" />Languages</p>
// //                     <p className="font-medium text-base">{artist.languages.join(", ")}</p>
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {activeSection === "media" && (
// //               <div>
// //                 <h3 className="text-lg font-semibold mb-2 text-purple-700">Media</h3>
// //                 {artist.media?.some((item) => item?.type === "video") && (
// //                   <div className="mb-4">
// //                     <h4 className="text-sm font-semibold text-gray-600 mb-1">Videos</h4>
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                       {artist.media
// //                         .filter((item) => item.type === "video")
// //                         .map((video, i) => (
// //                           <video
// //                             key={i}
// //                             src={video.url}
// //                             controls
// //                             className="rounded-xl w-full max-h-60 object-cover shadow-md"
// //                           />
// //                         ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {artist.media?.some((item) => item?.type === "image") ? (
// //                   <div>
// //                     <h4 className="text-sm font-semibold text-gray-600 mb-1">Images</h4>
// //                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
// //                       {artist.media
// //                         .filter((item) => item.type === "image")
// //                         .map((image, i) => (
// //                           <img
// //                             key={i}
// //                             src={image.url}
// //                             alt={`media-${i}`}
// //                             className="rounded-xl w-full h-40 object-cover shadow-md"
// //                             loading="lazy"
// //                           />
// //                         ))}
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="text-gray-500">No images uploaded yet.</div>
// //                 )}
// //               </div>
// //             )}

// //             {activeSection === "reviews" && (
// //               <div>
// //                 <h3 className="text-lg font-semibold mb-4 text-purple-700">Reviews</h3>
// //                 <ReviewsSection reviews={reviews} />
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ArtistProfileView;


// /////////////////////////ui improve////////////////////////////
// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import {ArrowLeft, MapPin, Calendar, BookOpen, Music, Globe, CalendarCog } from "lucide-react";
// import BookedDatesCalendar from "../../components/BookedDatesCalendar";
// import ReviewsSection from "../../components/ReviewsSection";

// const ArtistProfileView = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [artist, setArtist] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [activeSection, setActiveSection] = useState("bio");

//   useEffect(() => {
//     const fetchArtist = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/client/artists/profile/${id}`
//         );
//         if (!res.ok) throw new Error("Failed to fetch artist data");
//         const data = await res.json();
//         setArtist(data.artist || data);
//       } catch (error) {
//         console.error("Error fetching artist:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchBookedSlots = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/bookings/artist/${id}/booked-slots`
//         );
//         const data = await res.json();
//         if (data.bookedSlots) {
//           setBookedSlots(data.bookedSlots);
//         }
//       } catch (error) {
//         console.error("Error fetching booked slots:", error);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/reviews/artist/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch reviews");
//         const data = await res.json();
//         setReviews(data);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     if (id) {
//       fetchArtist();
//       fetchBookedSlots();
//       fetchReviews();
//     }
//   }, [id]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-purple-700 font-semibold">Loading artist profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!artist) {
//     return <div className="text-center py-10">Artist not found.</div>;
//   }

//   return (
    
//     <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 p-4">
//       <button
//         onClick={() => navigate(-1)}
//         className="fixed top-4 left-4 flex items-center gap-2 bg-purple-100 text-purple-600  hover:bg-purple-200 shadow-md rounded-md px-3 py-1.5 font-medium transition duration-300 ease-in-out cursor-pointer select-none" title="Back to artist page"
//       >
//       <ArrowLeft className="w-8 h-8" />
//         Back 
//       </button>
//       <div className="max-w-6xl mx-auto flex gap-5 bg-white rounded-xl shadow-md p-5">
//         {/* Sidebar */}
//         <div className="w-1/4 sticky top-5 h-max">
//           <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
//             <div className="text-center">
//               <img
//                 src={artist.profilePicture?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//                 alt="profile"
//                 className="w-24 h-24 rounded-full object-cover bg-gray-300 mx-auto"
//               />
//               <h1 className="text-xl font-bold mt-2">{artist.username}</h1>
//               <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mt-1 inline-block">
//                 {artist.category}
//               </span>
//             </div>

           
//             <div>
//                 <div className="flex items-center gap-2 mb-2 mt-4">
//                   <Calendar className="w-4 h-4 text-purple-600" />
//                   <span className="font-semibold text-purple-600">Schedule</span>
//                 </div>
//                 <BookedDatesCalendar
//                   bookedSlots={bookedSlots}
//                   selectedDate={selectedDate}
//                   onDateChange={setSelectedDate}
//                   inline
//                 />
//               </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="w-3/4">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-bold text-purple-700">Artist Profile</h2>
//             <Link to={`/book?artistId=${artist._id}`}>
//               <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
//                 Book Artist
//               </button>
//             </Link>
//           </div>

//           {/* Tabs */}
//           <div className="border-b pb-2 flex gap-6 font-semibold text-purple-700 sticky top-0 bg-white z-10">
//             <button
//               onClick={() => setActiveSection("bio")}
//               className={`hover:text-purple-900 ${
//                 activeSection === "bio" ? "border-b-2 border-purple-600" : ""
//               }`}
//             >
//               Bio
//             </button>
//             <button
//               onClick={() => setActiveSection("media")}
//               className={`hover:text-purple-900 ${
//                 activeSection === "media" ? "border-b-2 border-purple-600" : ""
//               }`}
//             >
//               Media
//             </button>
//             <button
//               onClick={() => setActiveSection("reviews")}
//               className={`hover:text-purple-900 ${
//                 activeSection === "reviews" ? "border-b-2 border-purple-600" : ""
//               }`}
//             >
//               Reviews
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="mt-6 space-y-10">
            
//             {activeSection === "bio" && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-purple-700">Bio</h3>
//                 <p className="text-gray-700 text-sm">
//                   {artist.bio || "This artist has not written a bio yet."}
//                 </p>
//                  <div className="mt-4">
//               <p className="flex items-center gap-2">
//                  <MapPin className="w-4 h-4 text-purple-600" />
//                 {artist.location?.city ||
//                   (artist.location?.coordinates
//                     ? `${artist.location.coordinates.lat}, ${artist.location.coordinates.lng}`
//                     : "N/A")}
//               </p>
//             </div>

//             <div className="mt-4 flex items-center gap-2">
//               <p className="text-gray-600 text-sm"> Rate:</p>
//               <p className="font-medium text-base text-purple-600">Rs {artist.wage || "N/A"} /hr</p>
//             </div>

//             <div className="mt-4">
//               <p className="text-gray-600 text-sm"> Portfolio:</p>
//               {artist.portfolioLink?.length > 0 ? (
//                 artist.portfolioLink.map((p, i) => (
//                   <div key={i}>
//                     <a
//                       href={p.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline break-all"
//                     >
//                       {p.url.replace(/^https?:\/\//, "")}
//                     </a>
//                   </div>
//                 ))
//               ) : (
//                 <span className="text-gray-500">N/A</span>
//               )}
//             </div>


//                 {artist.genres?.length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-gray-600 text-sm flex items-center gap-2"> 
//                        <Music className="w-4 h-4" />Genres</p>
//                     <p className="font-medium text-base">{artist.genres.join(", ")}</p>
//                   </div>
//                 )}

//                 {artist.eventTypes?.length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-gray-600 text-sm flex items-center gap-2"> 
//                        <CalendarCog className="w-4 h-4" /> Event Types</p>
//                     <p className="font-medium text-base">{artist.eventTypes.join(", ")}</p>
//                   </div>
//                 )}

//                 {artist.languages?.length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-gray-600 text-sm flex items-center gap-2"> 
//                        <Globe className="w-4 h-4" />Languages</p>
//                     <p className="font-medium text-base">{artist.languages.join(", ")}</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeSection === "media" && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-purple-700">Media</h3>
//                 {artist.media?.some((item) => item?.type === "video") && (
//                   <div className="mb-4">
//                     <h4 className="text-sm font-semibold text-gray-600 mb-1">Videos</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       {artist.media
//                         .filter((item) => item.type === "video")
//                         .map((video, i) => (
//                           <video
//                             key={i}
//                             src={video.url}
//                             controls
//                             className="rounded-xl w-full max-h-60 object-cover shadow-md"
//                           />
//                         ))}
//                     </div>
//                   </div>
//                 )}

//                 {artist.media?.some((item) => item?.type === "image") ? (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-600 mb-1">Images</h4>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//                       {artist.media
//                         .filter((item) => item.type === "image")
//                         .map((image, i) => (
//                           <img
//                             key={i}
//                             src={image.url}
//                             alt={`media-${i}`}
//                             className="rounded-xl w-full h-40 object-cover shadow-md"
//                             loading="lazy"
//                           />
//                         ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-gray-500">No images uploaded yet.</div>
//                 )}
//               </div>
//             )}

//             {activeSection === "reviews" && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-4 text-purple-700">Reviews</h3>
//                 <ReviewsSection reviews={reviews} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtistProfileView;


////////with baysian//////
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  BookOpen,
  Music,
  Globe,
  CalendarCog,
} from "lucide-react";
import BookedDatesCalendar from "../../components/BookedDatesCalendar";
import ReviewsSection from "../../components/ReviewsSection";

const ArtistProfileView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [globalAvgRating, setGlobalAvgRating] = useState(3.5); // default fallback
  const [activeSection, setActiveSection] = useState("bio");

  useEffect(() => {
    if (!id) return;

    const fetchArtist = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/client/artists/profile/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch artist data");
        const data = await res.json();
        setArtist(data.artist || data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    const fetchBookedSlots = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/bookings/artist/${id}/booked-slots`
        );
        const data = await res.json();
        if (data.bookedSlots) setBookedSlots(data.bookedSlots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/reviews/artist/${id}`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchGlobalAvgRating = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/reviews/global-average`);
        if (!res.ok) throw new Error("Failed to fetch global average rating");
        const data = await res.json();
        if (data.globalAvgRating) setGlobalAvgRating(data.globalAvgRating);
      } catch (error) {
        console.warn("Using fallback global average rating", error);
      }
    };

    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchArtist(),
        fetchBookedSlots(),
        fetchReviews(),
        fetchGlobalAvgRating(),
      ]);
      setIsLoading(false);
    };

    fetchAllData();
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
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 flex items-center gap-2 bg-purple-100 text-purple-600  hover:bg-purple-200 shadow-md rounded-md px-3 py-1.5 font-medium transition duration-300 ease-in-out cursor-pointer select-none"
        title="Back to artist page"
      >
        <ArrowLeft className="w-8 h-8" />
        Back
      </button>

      <div className="max-w-6xl mx-auto flex gap-5 bg-white rounded-xl shadow-md p-5">
        {/* Sidebar */}
        <div className="w-1/4 sticky top-5 h-max">
          <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
            <div className="text-center">
              <img
                src={
                  artist.profilePicture?.url ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                className="w-24 h-24 rounded-full object-cover bg-gray-300 mx-auto"
              />
              <h1 className="text-xl font-bold mt-2">{artist.username}</h1>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mt-1 inline-block">
                {artist.category}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 mt-4">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-purple-600">Schedule</span>
              </div>
              <BookedDatesCalendar
                bookedSlots={bookedSlots}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                inline
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-purple-700">Artist Profile</h2>
            <Link to={`/book?artistId=${artist._id}`}>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                Book Artist
              </button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="border-b pb-2 flex gap-6 font-semibold text-purple-700 sticky top-0 bg-white z-10">
            <button
              onClick={() => setActiveSection("bio")}
              className={`hover:text-purple-900 ${
                activeSection === "bio" ? "border-b-2 border-purple-600" : ""
              }`}
            >
              Bio
            </button>
            <button
              onClick={() => setActiveSection("media")}
              className={`hover:text-purple-900 ${
                activeSection === "media" ? "border-b-2 border-purple-600" : ""
              }`}
            >
              Media
            </button>
            <button
              onClick={() => setActiveSection("reviews")}
              className={`hover:text-purple-900 ${
                activeSection === "reviews" ? "border-b-2 border-purple-600" : ""
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6 space-y-10">
            {activeSection === "bio" && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-700">Bio</h3>
                <p className="text-gray-700 text-sm">
                  {artist.bio || "This artist has not written a bio yet."}
                </p>
                <div className="mt-4">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    {artist.location?.city ||
                      (artist.location?.coordinates
                        ? `${artist.location.coordinates.lat}, ${artist.location.coordinates.lng}`
                        : "N/A")}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <p className="text-gray-600 text-sm"> Rate:</p>
                  <p className="font-medium text-base text-purple-600">
                    Rs {artist.wage || "N/A"} /hr
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 text-sm"> Portfolio:</p>
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

                {artist.genres?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      Genres
                    </p>
                    <p className="font-medium text-base">{artist.genres.join(", ")}</p>
                  </div>
                )}

                {artist.eventTypes?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <CalendarCog className="w-4 h-4" />
                      Event Types
                    </p>
                    <p className="font-medium text-base">{artist.eventTypes.join(", ")}</p>
                  </div>
                )}

                {artist.languages?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Languages
                    </p>
                    <p className="font-medium text-base">{artist.languages.join(", ")}</p>
                  </div>
                )}
              </div>
            )}

            {activeSection === "media" && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-700">Media</h3>
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
                            loading="lazy"
                          />
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">No images uploaded yet.</div>
                )}
              </div>
            )}

            {activeSection === "reviews" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-700">Reviews</h3>
                {/* Pass globalAvgRating and artist weighted rating to ReviewsSection */}
                <ReviewsSection
                  reviews={reviews}
                  globalAvgRating={globalAvgRating}
                  artistWeightedRating={artist.weightedRating}
                  artistTotalRatings={artist.totalRatings}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileView;
