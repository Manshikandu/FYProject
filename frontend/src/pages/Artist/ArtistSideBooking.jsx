// import React, { useEffect, useState } from "react";
// import axios from "../../lib/axios";
// import { toast } from "react-hot-toast";


// import BookingLocationMap from "../../components/BookingLocationMap"; // adjust path accordingly


// import {
//   CheckCircle,
//   Clock,
//   Calendar,
//   XCircle,
//   User,
//   MapPin,
//   Loader2,
//   Flag,
//   Mail,
//   Phone,
//   Info,
// } from "lucide-react";

// const statusStyles = {
//   pending: { color: "text-yellow-500", icon: <Clock className="w-5 h-5 mr-1" />, label: "Pending" },
//   accepted: { color: "text-blue-500", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Accepted" },
//   booked: { color: "text-green-600", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Booked" },
//   completed: { color: "text-gray-500", icon: <Flag className="w-5 h-5 mr-1" />, label: "Completed" },
//   rejected: { color: "text-red-600", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Rejected" },
//   cancelled: { color: "text-red-500", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Cancelled" },
// };

// const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

// const ArtistBookings = ({ user }) => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");

//   const [mapOpenBookingId, setMapOpenBookingId] = useState(null); //map

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("/artist/bookings/my-bookings", { withCredentials: true });
//       setBookings(res.data.bookings);
//     } catch (err) {
//       toast.error("Error loading bookings");
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`artist/bookings/${id}/status`, { status }, { withCredentials: true });
//       toast.success(`Booking ${status}`);
//       fetchBookings();
//     } catch (err) {
//       toast.error("Failed to update booking");
//     }
//   };

//   if (loading)
//     return (
//       <div className="p-6 flex justify-center items-center text-yellow-500">
//         <Loader2 className="animate-spin w-8 h-8 mr-2" />
//         Loading bookings...
//       </div>
//     );

//   const filteredBookings =
//     filterStatus === "all"
//       ? bookings
//       : bookings.filter((b) => b.status === filterStatus);

//   if (filteredBookings.length === 0)
//     return (
//       <>
//         <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
//         <p className="text-center mt-10 text-gray-500 text-lg">
//           No bookings found for "{filterStatus}" status.
//         </p>
//       </>
//     );

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Booking Requests</h2>

//       <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

//        {loading && (
//         <div className="p-6 flex justify-center items-center text-yellow-500">
//           <Loader2 className="animate-spin w-8 h-8 mr-2" />
//           Loading bookings...
//         </div>
//       )}

//       {!loading && filteredBookings.length === 0 && (
//         <p className="text-center mt-10 text-gray-500 text-lg">
//           No bookings found for "{filterStatus}" status.
//         </p>
//       )}


//       {filteredBookings.map((booking) => {
//         // Show opposite party name (assuming user role 'artist' here)
//         const bookingName = booking.client?.username || "Client";

//         const status = statusStyles[booking.status] || {
//           color: "text-gray-700",
//           icon: null,
//           label: booking.status,
//         };

//         return (
//           <div
//             key={booking._id}
//             className="border rounded-lg shadow-md p-5 mb-6 bg-white hover:shadow-lg transition-shadow duration-300"
//           >
//             <h3 className="text-xl font-semibold mb-3 flex items-center text-indigo-700">
//               <User className="w-6 h-6 mr-2" />
//               {bookingName}
//             </h3>

//             <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-3">
//               <div className="flex items-center">
//                 <Calendar className="w-5 h-5 mr-1 text-indigo-500" />
//                 {new Date(booking.eventDate).toLocaleDateString()}
//               </div>

//               <div className="flex items-center">
//                 <Clock className="w-5 h-5 mr-1 text-indigo-500" />
//                 {booking.startTime && booking.endTime
//                   ? `${new Date(booking.startTime).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })} - ${new Date(booking.endTime).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}`
//                   : "Time not set"}
//               </div>

//               {booking.location && (
//                 <div className="flex items-center">
//                   <MapPin className="w-5 h-5 mr-1 text-indigo-500" />
//                   {booking.location}
//                 </div>
//               )}

//               {/* Show contact info of client */}
//               {booking.client?.email && (
//                 <div className="flex items-center">
//                   <Mail className="w-5 h-5 mr-1 text-indigo-500" />
//                   {booking.client.email}
//                 </div>
//               )}

//               {booking.client?.phone && (
//                 <div className="flex items-center">
//                   <Phone className="w-5 h-5 mr-1 text-indigo-500" />
//                   {booking.client.phone}
//                 </div>
//               )}
//             </div>

//             {(booking.eventType || booking.eventDetails) && (
//               <div className="mb-3">
//                 <div className="flex items-center font-semibold text-indigo-600 mb-1">
//                   <Info className="w-5 h-5 mr-2" />
//                   Event Info
//                 </div>
//                 <p>
//                   <strong>Type:</strong> {booking.eventType || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Details:</strong> {booking.eventDetails || "N/A"}
//                 </p>
//               </div>
//             )}

//             {booking.notes && (
//               <p className="italic text-gray-600 mb-3">Notes: "{booking.notes}"</p>
//             )}

//             <div className={`text-lg font-semibold flex items-center ${status.color}`}>
//               {status.icon} {status.label}
//             </div>
//             {/* Location + Map Button */}
//             {booking.coordinates && (
//               <div className="flex items-center mt-3 gap-2">
//                 <MapPin className="w-5 h-5 text-indigo-500" />
//                 <span>{booking.location || "Coordinates Provided"}</span>
//                 <button
//                   onClick={() => setMapOpenBookingId(booking._id)}
//                   className="ml-auto bg-indigo-500 text-white px-2 py-1 rounded text-sm hover:bg-indigo-600"
//                 >
//                   Show Map
//                 </button>
//               </div>
//             )}

//             {/* Show the modal if this booking's map is open */}
//             {mapOpenBookingId === booking._id && (
//              <BookingLocationMap
//   isOpen={true}
//   onRequestClose={() => setMapOpenBookingId(null)}
//   bookingLocation={
//     booking.coordinates 
//       ? [booking.coordinates.lat, booking.coordinates.lng] // ✅ Correct Leaflet format
//       : undefined
//   }
// />

//             )}




//             {booking.status === "pending" && (
//               <div className="mt-3 flex gap-4">
//                 <button
//                   onClick={() => updateStatus(booking._id, "accepted")}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => updateStatus(booking._id, "rejected")}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// function StatusFilter({ filterStatus, setFilterStatus }) {
//   return (
//     <div className="mb-6 flex flex-wrap gap-3 justify-center">
//       {statusOptions.map((status) => (
//         <button
//           key={status}
//           onClick={() => setFilterStatus(status)}
//           className={`px-4 py-2 rounded-full border ${
//             filterStatus === status
//               ? "bg-indigo-600 text-white border-indigo-600"
//               : "text-indigo-600 border-indigo-600 hover:bg-indigo-100"
//           } transition`}
//         >
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default ArtistBookings;





















// import React, { useEffect, useState } from "react";
// import axios from "../../lib/axios";
// import { toast } from "react-hot-toast";

// import { Link } from "react-router-dom";

// import BookingLocationMap from "../../components/BookingLocationMap"; // adjust path accordingly

// import {
//   CheckCircle,
//   Clock,
//   Calendar,
//   XCircle,
//   User,
//   MapPin,
//   Loader2,
//   Flag,
//   Mail,
//   Phone,
//   Info,
// } from "lucide-react";

// const statusStyles = {
//   pending: { color: "text-yellow-500", icon: <Clock className="w-5 h-5 mr-1" />, label: "Pending" },
//   accepted: { color: "text-blue-500", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Accepted" },
//   booked: { color: "text-green-600", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Booked" },
//   completed: { color: "text-gray-500", icon: <Flag className="w-5 h-5 mr-1" />, label: "Completed" },
//   rejected: { color: "text-red-600", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Rejected" },
//   cancelled: { color: "text-red-500", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Cancelled" },
// };

// const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

// const ArtistBookings = ({ user }) => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");

//   const [sortOrder, setSortOrder] = useState("newest");

//   const [mapOpenBookingId, setMapOpenBookingId] = useState(null);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("/artist/bookings/my-bookings", { withCredentials: true });
//       setBookings(res.data.bookings);
//     } catch (err) {
//       toast.error("Error loading bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`artist/bookings/${id}/status`, { status }, { withCredentials: true });
//       toast.success(`Booking ${status}`);
//       fetchBookings();
//     } catch (err) {
//       toast.error("Failed to update booking");
//     }
//   };

//   if (loading)
//     return (
//       <div className="p-6 flex justify-center items-center text-yellow-500">
//         <Loader2 className="animate-spin w-8 h-8 mr-2" />
//         Loading bookings...
//       </div>
//     );

//   const filteredBookings =
//     filterStatus === "all"
//       ? bookings
//       : bookings.filter((b) => b.status === filterStatus);
      
//       const sortedBookings = mergeSortBookings(filteredBookings, sortOrder);


//   if (filteredBookings.length === 0)
//     return (
//       <>
//         <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
//         <p className="text-center mt-10 text-gray-500 text-lg">
//           No bookings found for "{filterStatus}" status.
//         </p>
//       </>
//     );

//   // Find the booking whose map modal is open
//   const activeBooking = bookings.find((b) => b._id === mapOpenBookingId);

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Booking Requests</h2>

//      <div className="sticky top-0 z-10 bg-white pb-4 pt-2 mb-4 shadow-sm">
//   <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
//   <div className="flex justify-end px-4">
//     <select
//       value={sortOrder}
//       onChange={(e) => setSortOrder(e.target.value)}
//       className="px-4 py-2 border rounded text-indigo-700 border-indigo-600"
//     >
//       <option value="newest">Sort by: Newest to Oldest</option>
//       <option value="oldest">Sort by: Oldest to Newest</option>
//     </select>
//   </div>
// </div>



//       {sortedBookings.map((booking) => {
//         const bookingName = booking.client?.username || "Client";

//         const status = statusStyles[booking.status] || {
//           color: "text-gray-700",
//           icon: null,
//           label: booking.status,
//         };

//         return (
//           <div
//             key={booking._id}
//             className="border rounded-lg shadow-md p-5 mb-6 bg-white hover:shadow-lg transition-shadow duration-300"
//           >
//             <h3 className="text-xl font-semibold mb-3 flex items-center text-indigo-700">
//               <User className="w-6 h-6 mr-2" />
//               {bookingName}
//             </h3>

//             <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-3">
//               <div className="flex items-center">
//                 <Calendar className="w-5 h-5 mr-1 text-indigo-500" />
//                 {new Date(booking.eventDate).toLocaleDateString()}
//               </div>

//               <div className="flex items-center">
//                 <Clock className="w-5 h-5 mr-1 text-indigo-500" />
//                 {booking.startTime && booking.endTime
//                   ? `${new Date(booking.startTime).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })} - ${new Date(booking.endTime).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}`: "Time not set"}
//               </div>

//               {booking.location && (
//                 <div className="flex items-center">
//                   <MapPin className="w-5 h-5 mr-1 text-indigo-500" />
//                   {booking.location}
//                 </div>
//               )}

//               {booking.client?.email && (
//                 <div className="flex items-center">
//                   <Mail className="w-5 h-5 mr-1 text-indigo-500" />
//                   {booking.client.email}
//                 </div>
//               )}

//               {booking.client?.phone && (
//                 <div className="flex items-center">
//                   <Phone className="w-5 h-5 mr-1 text-indigo-500" />
//                   {booking.client.phone}
//                 </div>
//               )}
//             </div>

//             {(booking.eventType || booking.eventDetails) && (
//               <div className="mb-3">
//                 <div className="flex items-center font-semibold text-indigo-600 mb-1">
//                   <Info className="w-5 h-5 mr-2" />
//                   Event Info
//                 </div>
//                 <p>
//                   <strong>Type:</strong> {booking.eventType || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Details:</strong> {booking.eventDetails || "N/A"}
//                 </p>
//               </div>
//             )}

//             {booking.notes && (
//               <p className="italic text-gray-600 mb-3">Notes: "{booking.notes}"</p>
//             )}

//             <div className={`text-lg font-semibold flex items-center ${status.color}`}>
//               {status.icon} {status.label}
//             </div>

//             {booking.coordinates && (
//               <div className="flex items-center mt-3 gap-2">
//                 <MapPin className="w-5 h-5 text-indigo-500" />
//                 <span>{booking.location || "Coordinates Provided"}</span>
//                 <button
//                   onClick={() => setMapOpenBookingId(booking._id)}
//                   className="ml-auto bg-indigo-500 text-white px-2 py-1 rounded text-sm hover:bg-indigo-600"
//                 >
//                   Show Map
//                 </button>
//               </div>
//             )}
//        {booking.contractUrl && (
//   <div className="mt-3 flex flex-col md:flex-row gap-4">
//     {booking.contractStatus !== "signed" ? (
//       <a
//         href={`/contracts/artist-sign/${booking._id}`}
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
//       >
//         Sign contract
//       </a>
//     ) : (
//       <a
//         href={`http://localhost:3000${booking.contractUrl}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
//       >
//         View contract
//       </a>
//     )}
//   </div>
// )}

// {/* {booking.contractUrl && (
//   <div className="mt-3 flex flex-col md:flex-row gap-4">
//     <a
//       href={`http://localhost:3000${booking.contractUrl}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-center"
//     >
//       View Contract PDF
//     </a>

//     <Link
//       to={`/contracts/artist-sign/${booking._id}`}
//       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
//     >
//       Sign as Artist
//     </Link>
//   </div>
// )} */}



//             {booking.status === "pending" && (
//               <div className="mt-3 flex gap-4">
//                 <button
//                   onClick={() => updateStatus(booking._id, "accepted")}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => updateStatus(booking._id, "rejected")}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         );
//       })}
      

//       {/* Render one BookingLocationMap modal here, outside map loop */}
//       {activeBooking && activeBooking.coordinates && (
//         <BookingLocationMap
//           isOpen={!!mapOpenBookingId}
//           onRequestClose={() => setMapOpenBookingId(null)}
//           bookingLocation={[activeBooking.coordinates.lat, activeBooking.coordinates.lng]} // lat,lng order
//         />
//       )}
//     </div>
//   );
// };

// function StatusFilter({ filterStatus, setFilterStatus }) {
//   return (
//     <div className="mb-6 flex flex-wrap gap-3 justify-center">
//       {statusOptions.map((status) => (
//         <button
//           key={status}
//           onClick={() => setFilterStatus(status)}
//           className={`px-4 py-2 rounded-full border ${
//             filterStatus === status
//               ? "bg-indigo-600 text-white border-indigo-600"
//               : "text-indigo-600 border-indigo-600 hover:bg-indigo-100"
//           } transition`}
//         >
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </button>
//       ))}
//     </div>
//   );
// }

// function mergeSortBookings(bookings, sortOrder) {
//   if (bookings.length <= 1) return bookings;

//   const mid = Math.floor(bookings.length / 2);
//   const left = mergeSortBookings(bookings.slice(0, mid), sortOrder);
//   const right = mergeSortBookings(bookings.slice(mid), sortOrder);

//   return merge(left, right, sortOrder);
// }

// function merge(left, right, sortOrder) {
//   const result = [];

//   while (left.length && right.length) {
//     const leftDate = new Date(left[0].eventDate);
//     const rightDate = new Date(right[0].eventDate);

//     const condition = sortOrder === "newest" ? leftDate > rightDate : leftDate < rightDate;

//     if (condition) {
//       result.push(left.shift());
//     } else {
//       result.push(right.shift());
//     }
//   }

//   return [...result, ...left, ...right];
// }


// export default ArtistBookings;

import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import BookingLocationMap from "../../components/BookingLocationMap";

import {
  CheckCircle,
  Clock,
  Calendar,
  XCircle,
  User,
  MapPin,
  Loader2,
  Flag,
  Mail,
  Phone,
  Info,
} from "lucide-react";

const statusStyles = {
  pending: { color: "text-yellow-500", icon: <Clock className="w-5 h-5 mr-1" />, label: "Pending" },
  accepted: { color: "text-blue-500", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Accepted" },
  booked: { color: "text-green-600", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Booked" },
  completed: { color: "text-gray-500", icon: <Flag className="w-5 h-5 mr-1" />, label: "Completed" },
  rejected: { color: "text-red-600", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Rejected" },
  cancelled: { color: "text-red-500", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Cancelled" },
};

const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

const ArtistBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedBookings, setExpandedBookings] = useState({});
  const [mapOpenBookingId, setMapOpenBookingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/artist/bookings/my-bookings", { withCredentials: true });
      setBookings(res.data.bookings);
    } catch (err) {
      toast.error("Error loading bookings");
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`artist/bookings/${id}/status`, { status }, { withCredentials: true });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to update booking");
      console.log(err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedBookings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center text-yellow-500">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        Loading bookings...
      </div>
    );

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const sortedBookings = mergeSortBookings(filteredBookings, sortOrder);

  if (filteredBookings.length === 0)
    return (
      <>
        <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <p className="text-center mt-10 text-gray-500 text-lg">
          No bookings found for "{filterStatus}" status.
        </p>
      </>
    );

  // Find the booking whose map modal is open
  const activeBooking = bookings.find((b) => b._id === mapOpenBookingId);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Booking Requests</h2>

      <div className="sticky top-0 z-10 bg-white pb-4 pt-2 mb-4 shadow-sm">
        <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <div className="flex justify-end px-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded text-indigo-700 border-indigo-600"
          >
            <option value="newest">Sort by: Newest to Oldest</option>
            <option value="oldest">Sort by: Oldest to Newest</option>
          </select>
        </div>
      </div>

      {sortedBookings.map((booking) => {
        const bookingName = booking.client?.username || "Client";
        const status = statusStyles[booking.status] || {
          color: "text-gray-700",
          icon: null,
          label: booking.status,
        };

        return (
          <div
            key={booking._id}
            className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 mb-6 "
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold flex items-center text-indigo-700">
                <User className="w-6 h-6 mr-2" />
                {bookingName}
              </h3>

              <div
                className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${status.color} border-opacity-30`}
              >
                {status.icon}
                <span className={status.color}>{status.label}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4 text-md">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                {new Date(booking.eventDate).toLocaleDateString()}
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                {booking.startTime && booking.endTime
                  ? `${new Date(booking.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} - ${new Date(booking.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Time not set"}
              </div>

             
              {booking.client?.email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-indigo-500" />
                  {booking.client.email}
                </div>
              )}

              {booking.client?.phone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-indigo-500" />
                  {booking.client.phone}
                </div>
              )}
            </div>
                      

            {/* Map & contract */}
            {booking.coordinates && (
              <div className="flex items-center mt-3 gap-2">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span>{booking.location || "Coordinates Provided"}</span>
                <button
                  onClick={() => setMapOpenBookingId(booking._id)}
                  className="ml-auto bg-indigo-500 text-white px-3 py-1 rounded text-sm hover:bg-indigo-600 transition"
                >
                  Show Map
                </button>
              </div>
            )}

             {/* Expandable extra info */}
              <div className="flex justify-between items-center pt-3">
            <button
              onClick={() => toggleExpand(booking._id)}
              className="text-indigo-600 hover:underline text-md font-medium flex items-center mb-4"
            >
              <Info className="w-4 h-4 mr-1" />
              {expandedBookings[booking._id] ? "Hide Details" : "More"}
            </button>

          
            {booking.contractUrl && (
              <div className="mt-4 flex flex-col md:flex-row justify-end">
                {booking.contractStatus !== "signed" ? (
                  <Link
                    to={`/contracts/artist-sign/${booking._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
                  >
                    Sign Contract
                  </Link>
                ) : (
                  <a
                    href={`http://localhost:3000${booking.contractUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
                  >
                    View Contract
                  </a>
                )}
              </div>
            )}
            </div>
              {expandedBookings[booking._id] && (
              <div className="mb-4 text-gray-700 text-sm space-y-2">
                {(booking.eventType || booking.eventDetails) && (
                  <div>
                    <p><strong>Type:</strong> {booking.eventType || "N/A"}</p>
                    <p><strong>Details:</strong> {booking.eventDetails || "N/A"}</p>
                  </div>
                )}

                {booking.notes && <p className="italic">Notes: "{booking.notes}"</p>}
              </div>
            )}


            {/* Accept/Reject buttons if pending */}
            {booking.status === "pending" && (
              <div className="mt-5 flex gap-4">
                <button
                  onClick={() => updateStatus(booking._id, "accepted")}
                  className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(booking._id, "rejected")}
                  className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* BookingLocationMap modal */}
      {activeBooking && activeBooking.coordinates && (
        <BookingLocationMap
          isOpen={!!mapOpenBookingId}
          onRequestClose={() => setMapOpenBookingId(null)}
          bookingLocation={[activeBooking.coordinates.lat, activeBooking.coordinates.lng]}
        />
      )}
    </div>
  );
};

function StatusFilter({ filterStatus, setFilterStatus }) {
  return (
    <div className="mb-6 flex flex-wrap gap-3 justify-center">
      {statusOptions.map((status) => (
        <button
          key={status}
          onClick={() => setFilterStatus(status)}
          className={`px-4 py-2 rounded-full border ${
            filterStatus === status
              ? "bg-indigo-600 text-white border-indigo-600"
              : "text-indigo-600 border-indigo-600 hover:bg-indigo-100"
          } transition`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}

function mergeSortBookings(bookings, sortOrder) {
  if (bookings.length <= 1) return bookings;

  const mid = Math.floor(bookings.length / 2);
  const left = mergeSortBookings(bookings.slice(0, mid), sortOrder);
  const right = mergeSortBookings(bookings.slice(mid), sortOrder);

  return merge(left, right, sortOrder);
}

function merge(left, right, sortOrder) {
  const result = [];

  while (left.length && right.length) {
    const leftDate = new Date(left[0].eventDate);
    const rightDate = new Date(right[0].eventDate);

    const condition = sortOrder === "newest" ? leftDate > rightDate : leftDate < rightDate;

    if (condition) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return [...result, ...left, ...right];
}

export default ArtistBookings;
