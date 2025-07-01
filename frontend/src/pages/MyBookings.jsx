// // import React, { useEffect, useState } from "react";
// // import axios from "../lib/axios";
// // import { useUserStore } from "../stores/useUserStore";
// // import {
// //   CheckCircle,
// //   Clock,
// //   Calendar,
// //   XCircle,
// //   User,
// //   MapPin,
// //   Loader2,
// //   Flag,
// //   Mail,
// //   Phone,
// //   Info,
// // } from "lucide-react";

// // const statusStyles = {
// //   pending: { color: "text-yellow-500", icon: <Clock className="w-5 h-5 mr-1" />, label: "Pending" },
// //   accepted: { color: "text-blue-500", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Accepted" },
// //   booked: { color: "text-green-600", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Booked" },
// //   completed: { color: "text-gray-500", icon: <Flag className="w-5 h-5 mr-1" />, label: "Completed" },
// //     rejected: { color: "text-red-600", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Rejected" },
// //   cancelled: { color: "text-red-500", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Cancelled" },
// // };

// // const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

// // const MyBookings = () => {
// //   const { user } = useUserStore();
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filterStatus, setFilterStatus] = useState("all");
// //   const [sortOrder, setSortOrder] = useState("newest");


// //   useEffect(() => {
// //     if (!user) return;
// //     const fetchBookings = async () => {
// //       try {
// //         const res = await axios.get("/bookings/my-bookings");
// //         setBookings(res.data);
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchBookings();
// //   }, [user]);

// //   if (loading)
// //     return (
// //       <div className="p-6 flex justify-center items-center text-yellow-500">
// //         <Loader2 className="animate-spin w-8 h-8 mr-2" />
// //         Loading your bookings...
// //       </div>
// //     );

// //   // Filter bookings by status
// //   const filteredBookings =
// //     filterStatus === "all"
// //       ? bookings
// //       : bookings.filter((b) => b.status === filterStatus);

// //   if (filteredBookings.length === 0)
// //     return (
// //       <>
// //         <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
// //         <p className="text-center mt-10 text-gray-500 text-lg">No bookings found for "{filterStatus}" status.</p>
// //       </>
// //     );

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 mt-16">
// //       <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>

// //       <div className="fixed top-0 z-10 bg-white pb-4 pt-20 mb-4 ">
// //   <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
// //   <div className="flex justify-end px-4">
// //     <select
// //       value={sortOrder}
// //       onChange={(e) => setSortOrder(e.target.value)}
// //       className="px-4 py-2 border rounded text-indigo-700 border-indigo-600"
// //     >
// //       <option value="newest">Sort by: Newest to Oldest</option>
// //       <option value="oldest">Sort by: Oldest to Newest</option>
// //     </select>
// //   </div>
// // </div>



// //       {/* {filteredBookings.map((booking) => { */}
// //      {mergeSortBookings(filteredBookings, sortOrder).map((booking) => {


// //         // Show opposite party name
// //         const bookingName =
// //           user.role === "client"
// //             ? booking.artist?.username || "Artist"
// //             : booking.client?.username || "Client";

// //         const status = statusStyles[booking.status] || {
// //           color: "text-gray-700",
// //           icon: null,
// //           label: booking.status,
// //         };

// //         return (
// //           <div
// //             key={booking._id}
// //             className="border rounded-lg shadow-md p-5 mb-6 bg-white hover:shadow-lg transition-shadow duration-300"
// //           >
// //             <h3 className="text-xl font-semibold mb-3 flex items-center text-indigo-700">
// //               <User className="w-6 h-6 mr-2" />
// //               {bookingName}
// //             </h3>

// //             <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-3">
// //               <div className="flex items-center">
// //                 <Calendar className="w-5 h-5 mr-1 text-indigo-500" />
// //                 {new Date(booking.eventDate).toLocaleDateString()}
// //               </div>

// //               <div className="flex items-center">
// //                 <Clock className="w-5 h-5 mr-1 text-indigo-500" />
// //                 {booking.startTime && booking.endTime
// //                   ? `${new Date(booking.startTime).toLocaleTimeString([], {
// //                       hour: "2-digit",
// //                       minute: "2-digit",
// //                     })} - ${new Date(booking.endTime).toLocaleTimeString([], {
// //                       hour: "2-digit",
// //                       minute: "2-digit",
// //                     })}`
// //                   : "Time not set"}
// //               </div>

// //               {booking.location && (
// //                 <div className="flex items-center">
// //                   <MapPin className="w-5 h-5 mr-1 text-indigo-500" />
// //                   {booking.location}
// //                 </div>
// //               )}

// //               {/* Show contact info of the other party */}
// //               {user.role === "client" && booking.artist?.email && (
// //                 <div className="flex items-center">
// //                   <Mail className="w-5 h-5 mr-1 text-indigo-500" />
// //                   {booking.artist.email}
// //                 </div>
// //               )}

// //               {user.role === "client" && booking.artist?.phone && (
// //                 <div className="flex items-center">
// //                   <Phone className="w-5 h-5 mr-1 text-indigo-500" />
// //                   {booking.artist.phone}
// //                 </div>
// //               )}

// //               {user.role === "artist" && booking.client?.email && (
// //                 <div className="flex items-center">
// //                   <Mail className="w-5 h-5 mr-1 text-indigo-500" />
// //                   {booking.client.email}
// //                 </div>
// //               )}

// //               {user.role === "artist" && booking.client?.phone && (
// //                 <div className="flex items-center">
// //                   <Phone className="w-5 h-5 mr-1 text-indigo-500" />
// //                   {booking.client.phone}
// //                 </div>
// //               )}
// //             </div>

// //             {(booking.eventType || booking.eventDetails) && (
// //               <div className="mb-3">
// //                 <div className="flex items-center font-semibold text-indigo-600 mb-1">
// //                   <Info className="w-5 h-5 mr-2" />
// //                   Event Info
// //                 </div>
// //                 <p>
// //                   <strong>Type:</strong> {booking.eventType || "N/A"}
// //                 </p>
// //                 <p>
// //                   <strong>Details:</strong> {booking.eventDetails || "N/A"}
// //                 </p>
// //               </div>
// //             )}

// //             {booking.notes && (
// //               <p className="italic text-gray-600 mb-3">Notes: "{booking.notes}"</p>
// //             )}

// //             <div className={`text-lg font-semibold flex items-center ${status.color}`}>
// //               {status.icon} {status.label}
// //             </div>



            
// // {/* {booking.status === "accepted" && (
// //   <>
// //     {(!booking.contractStatus || booking.contractStatus === "none" || booking.contractStatus === "pending") ? (
// //       <button
// //         onClick={() => {
// //           window.location.href = `/generate-contract/${booking._id}`;
// //         }}
// //         className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
// //       >
// //         Generate Contract
// //       </button>
// //     ) : (
// //       <a
// //         href={`http://localhost:3000${booking.contractUrl || `/contracts/contract-${booking._id}-draft.pdf`}`}
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
// //       >
// //         View Contract
// //       </a>
// //     )}
// //   </>
// // )} */}
// // {booking.status === "accepted" && (
// //   <>
// //     {(!booking.contractStatus || booking.contractStatus === "none" || booking.contractStatus === "pending") ? (
// //       <button
// //         onClick={() => {
// //           window.location.href = `/generate-contract/${booking._id}`;
// //         }}
// //         className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
// //       >
// //         Generate Contract
// //       </button>
// //     ) : (
// //       <a
// //         href={`http://localhost:3000${booking.contractUrl || `/contracts/contract-${booking._id}-draft.pdf`}`}
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className={`mt-4 inline-block px-4 py-2 rounded transition
// //           ${
// //             booking.clientSignature && !booking.artistSignature
// //               ? 'bg-yellow-500 text-black hover:bg-yellow-600'  
// //               : booking.contractStatus === 'signed'
// //               ? 'bg-green-600 text-white hover:bg-green-700'    
// //               : 'bg-gray-400 cursor-not-allowed'                
// //           }
// //         `}
// //       >
// //         View Contract
// //       </a>
// //     )}
// //   </>
// // )}


// //           </div>
// //         );
// //       })}
      
// //     </div>
// //   );
// // };

// // function StatusFilter({ filterStatus, setFilterStatus }) {
// //   return (
// //     <div className="mb-6 flex flex-wrap gap-3 justify-center">
// //       {statusOptions.map((status) => (
// //         <button
// //           key={status}
// //           onClick={() => setFilterStatus(status)}
// //           className={`px-4 py-2 rounded-full border ${
// //             filterStatus === status
// //               ? "bg-indigo-600 text-white border-indigo-600"
// //               : "text-indigo-600 border-indigo-600 hover:bg-indigo-100"
// //           } transition`}
// //         >
// //           {status.charAt(0).toUpperCase() + status.slice(1)}
// //         </button>
// //       ))}
      
// //     </div>
// //   );
// // }


// // //sort added
// // function mergeSortBookings(bookings, order = "newest") {
// //   if (bookings.length <= 1) return bookings;

// //   const mid = Math.floor(bookings.length / 2);
// //   const left = mergeSortBookings(bookings.slice(0, mid), order);
// //   const right = mergeSortBookings(bookings.slice(mid), order);

// //   return merge(left, right, order);
// // }

// // function merge(left, right, order) {
// //   const result = [];

// //   while (left.length && right.length) {
// //     const leftDate = new Date(left[0].eventDate);
// //     const rightDate = new Date(right[0].eventDate);

// //     const condition =
// //       order === "newest" ? leftDate > rightDate : leftDate < rightDate;

// //     if (condition) {
// //       result.push(left.shift());
// //     } else {
// //       result.push(right.shift());
// //     }
// //   }

// //   return [...result, ...left, ...right];
// // }


// // export default MyBookings;

// import React, { useEffect, useState } from "react";
// import axios from "../lib/axios";
// import { useUserStore } from "../stores/useUserStore";
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

// const MyBookings = () => {
//   const { user } = useUserStore();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [sortOrder, setSortOrder] = useState("newest");

//   useEffect(() => {
//     if (!user) return;
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get("/bookings/my-bookings");
//         setBookings(res.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, [user]);

//   const filteredBookings =
//     filterStatus === "all"
//       ? bookings
//       : bookings.filter((b) => b.status === filterStatus);

//   if (loading)
//     return (
//       <div className="p-6 flex justify-center items-center text-yellow-500">
//         <Loader2 className="animate-spin w-8 h-8 mr-2" />
//         Loading your bookings...
//       </div>
//     );

//   return (
//     <div className="max-w-5xl mx-auto px-4 pt-24 pb-10">
//       <div className="sticky top-0 z-10 bg-white shadow-md rounded-lg mb-6 p-4">
//         <h2 className="text-3xl font-bold mb-4 text-gray-800">My Bookings</h2>
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="px-4 py-2 border rounded-md text-indigo-700 border-indigo-600 bg-white focus:outline-none"
//           >
//             <option value="newest">Sort by: Newest to Oldest</option>
//             <option value="oldest">Sort by: Oldest to Newest</option>
//           </select>
//         </div>
//       </div>

//       {filteredBookings.length === 0 ? (
//         <p className="text-center mt-10 text-gray-500 text-lg">No bookings found for "{filterStatus}" status.</p>
//       ) : (
//         mergeSortBookings(filteredBookings, sortOrder).map((booking) => {
//           const bookingName =
//             user.role === "client"
//               ? booking.artist?.username || "Artist"
//               : booking.client?.username || "Client";

//           const status = statusStyles[booking.status] || {
//             color: "text-gray-700",
//             icon: null,
//             label: booking.status,
//           };

//           return (
//             <div
//               key={booking._id}
//               className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 mb-6"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
//                   <User className="w-5 h-5 mr-2" />
//                   {bookingName}
//                 </h3>
//                 <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${status.color} border-opacity-30`}>
//                   {status.icon}
//                   <span className={`${status.color}`}>{status.label}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm mb-4">
//                 <div className="flex items-center">
//                   <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
//                   {new Date(booking.eventDate).toLocaleDateString()}
//                 </div>

//                 <div className="flex items-center">
//                   <Clock className="w-5 h-5 mr-2 text-indigo-500" />
//                   {booking.startTime && booking.endTime
//                     ? `${new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(booking.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
//                     : "Time not set"}
//                 </div>

//                 {booking.location && (
//                   <div className="flex items-center">
//                     <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
//                     {booking.location}
//                   </div>
//                 )}

//                 {user.role === "client" && booking.artist?.email && (
//                   <div className="flex items-center">
//                     <Mail className="w-5 h-5 mr-2 text-indigo-500" />
//                     {booking.artist.email}
//                   </div>
//                 )}

//                 {user.role === "client" && booking.artist?.phone && (
//                   <div className="flex items-center">
//                     <Phone className="w-5 h-5 mr-2 text-indigo-500" />
//                     {booking.artist.phone}
//                   </div>
//                 )}

//                 {user.role === "artist" && booking.client?.email && (
//                   <div className="flex items-center">
//                     <Mail className="w-5 h-5 mr-2 text-indigo-500" />
//                     {booking.client.email}
//                   </div>
//                 )}

//                 {user.role === "artist" && booking.client?.phone && (
//                   <div className="flex items-center">
//                     <Phone className="w-5 h-5 mr-2 text-indigo-500" />
//                     {booking.client.phone}
//                   </div>
//                 )}
//               </div>

//               {/* Event Info (Hidden until clicked) */}
//               {(booking.eventType || booking.eventDetails) && (
//                 <details className="mb-3 rounded-md bg-gray-50 px-4 py-3 cursor-pointer hover:bg-gray-100 transition">
//                   <summary className="flex items-center font-semibold text-indigo-600 cursor-pointer">
//                     <Info className="w-5 h-5 mr-2" />
//                     Show Event Info
//                   </summary>
//                   <div className="mt-2 text-sm text-gray-700 space-y-1">
//                     <p><strong>Type:</strong> {booking.eventType || "N/A"}</p>
//                     <p><strong>Details:</strong> {booking.eventDetails || "N/A"}</p>
//                   </div>
//                 </details>
//               )}

//               {booking.notes && (
//                 <p className="italic text-gray-600 mb-3">Notes: "{booking.notes}"</p>
//               )}

//               {booking.status === "accepted" && (
//                 <div className="pt-4">
//                   {(!booking.contractStatus || booking.contractStatus === "none" || booking.contractStatus === "pending") ? (
//                     <button
//                       onClick={() => window.location.href = `/generate-contract/${booking._id}`}
//                       className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//                     >
//                       Generate Contract
//                     </button>
//                   ) : (
//                     <a
//                       href={`http://localhost:3000${booking.contractUrl || `/contracts/contract-${booking._id}-draft.pdf`}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`inline-block px-4 py-2 rounded transition font-medium
//                         ${
//                           booking.clientSignature && !booking.artistSignature
//                             ? 'bg-yellow-500 text-black hover:bg-yellow-600'
//                             : booking.contractStatus === 'signed'
//                             ? 'bg-green-600 text-white hover:bg-green-700'
//                             : 'bg-gray-400 cursor-not-allowed text-white'
//                         }
//                       `}
//                     >
//                       View Contract
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// function StatusFilter({ filterStatus, setFilterStatus }) {
//   return (
//     <div className="flex flex-wrap gap-2 justify-center">
//       {statusOptions.map((status) => (
//         <button
//           key={status}
//           onClick={() => setFilterStatus(status)}
//           className={`px-5 py-2 rounded-full text-base font-medium border transition
//             ${
//               filterStatus === status
//                 ? "bg-indigo-600 text-white border-indigo-600"
//                 : "text-indigo-700 border-indigo-300 hover:bg-indigo-100"
//             }
//           `}
//         >
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </button>
//       ))}
//     </div>
//   );
// }

// function mergeSortBookings(bookings, order = "newest") {
//   if (bookings.length <= 1) return bookings;
//   const mid = Math.floor(bookings.length / 2);
//   const left = mergeSortBookings(bookings.slice(0, mid), order);
//   const right = mergeSortBookings(bookings.slice(mid), order);
//   return merge(left, right, order);
// }

// function merge(left, right, order) {
//   const result = [];
//   while (left.length && right.length) {
//     const leftDate = new Date(left[0].eventDate);
//     const rightDate = new Date(right[0].eventDate);
//     const condition = order === "newest" ? leftDate > rightDate : leftDate < rightDate;
//     result.push(condition ? left.shift() : right.shift());
//   }
//   return [...result, ...left, ...right];
// }

// export default MyBookings;

import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";
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

const MyBookings = () => {
  const { user } = useUserStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [expandedBookings, setExpandedBookings] = useState({});

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const toggleExpand = (id) => {
    setExpandedBookings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center text-yellow-500">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        Loading your bookings...
      </div>
    );

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

      

      {filteredBookings.length === 0 ? (
        <p className="text-center mt-10 text-gray-500 text-lg">
          No bookings found for "{filterStatus}" status.
        </p>
      ) : (
        mergeSortBookings(filteredBookings, sortOrder).map((booking) => {
          const bookingName =
            user.role === "client"
              ? booking.artist?.username || "Artist"
              : booking.client?.username || "Client";

          const status = statusStyles[booking.status] || {
            color: "text-gray-700",
            icon: null,
            label: booking.status,
          };

          return (
            <div
              key={booking._id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {bookingName}
                </h3>
                <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${status.color} border-opacity-30`}>
                  {status.icon}
                  <span className={`${status.color}`}>{status.label}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-md mb-2">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                  {new Date(booking.eventDate).toLocaleDateString()}
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                  {booking.startTime && booking.endTime
                    ? `${new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(booking.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                    : "Time not set"}
                </div>

                {booking.location && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                    {booking.location}
                  </div>
                )}

                {user.role === "client" && booking.artist?.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-indigo-500" />
                    {booking.artist.email}
                  </div>
                )}

                {user.role === "client" && booking.artist?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-indigo-500" />
                    {booking.artist.phone}
                  </div>
                )}

                {user.role === "artist" && booking.client?.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-indigo-500" />
                    {booking.client.email}
                  </div>
                )}

                {user.role === "artist" && booking.client?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-indigo-500" />
                    {booking.client.phone}
                  </div>
                )}
              </div>

              {/* More / Contract Actions */}
              <div className="flex justify-between items-center pt-3">
                <button
                  onClick={() => toggleExpand(booking._id)}
                  className="text-md text-indigo-600 hover:underline font-medium flex items-center"
                >
                  <Info className="w-4 h-4 mr-1" />
                  {expandedBookings[booking._id] ? "Hide Details" : "More"}
                </button>

                {booking.status === "accepted" && (
                  <div>
                    {(!booking.contractStatus || booking.contractStatus === "none" || booking.contractStatus === "pending") ? (
                      <button
                        onClick={() => window.location.href = `/generate-contract/${booking._id}`}
                        className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 transition text-md"
                      >
                        Generate Contract
                      </button>
                    ) : (
                      <a
                        href={`http://localhost:3000${booking.contractUrl || `/contracts/contract-${booking._id}-draft.pdf`}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block px-4 py-1.5 rounded transition text-md font-medium
                          ${
                            booking.clientSignature && !booking.artistSignature
                              ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                              : booking.contractStatus === 'signed'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-400 cursor-not-allowed text-white'
                          }
                        `}
                      >
                        View Contract
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Extra Info (only if expanded) */}
              {expandedBookings[booking._id] && (
                <>
                  {(booking.eventType || booking.eventDetails) && (
                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p><strong>Type:</strong> {booking.eventType || "N/A"}</p>
                      <p><strong>Details:</strong> {booking.eventDetails || "N/A"}</p>
                    </div>
                  )}

                  {booking.notes && (
                    <p className="italic text-gray-600 mt-2">Notes: "{booking.notes}"</p>
                  )}
                </>
              )}
            </div>
          );
        })
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

function mergeSortBookings(bookings, order = "newest") {
  if (bookings.length <= 1) return bookings;
  const mid = Math.floor(bookings.length / 2);
  const left = mergeSortBookings(bookings.slice(0, mid), order);
  const right = mergeSortBookings(bookings.slice(mid), order);
  return merge(left, right, order);
}

function merge(left, right, order) {
  const result = [];
  while (left.length && right.length) {
    const leftDate = new Date(left[0].eventDate);
    const rightDate = new Date(right[0].eventDate);
    const condition = order === "newest" ? leftDate > rightDate : leftDate < rightDate;
    result.push(condition ? left.shift() : right.shift());
  }
  return [...result, ...left, ...right];
}

export default MyBookings;
