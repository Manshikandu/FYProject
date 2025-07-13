// // // import React, { useEffect, useState } from "react";
// // // import axios from "../lib/axios";
// // // import { useUserStore } from "../stores/useUserStore";
// // // import {
// // //   CheckCircle,
// // //   Clock,
// // //   Calendar,
// // //   XCircle,
// // //   User,
// // //   MapPin,
// // //   Loader2,
// // //   Flag,
// // //   Mail,
// // //   Phone,
// // //   Info,
// // // } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";

// // // const statusStyles = {
// // //   pending: { color: "text-yellow-500", icon: <Clock className="w-5 h-5 mr-1" />, label: "Pending" },
// // //   accepted: { color: "text-blue-500", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Accepted" },
// // //   booked: { color: "text-green-600", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Booked" },
// // //   completed: { color: "text-gray-500", icon: <Flag className="w-5 h-5 mr-1" />, label: "Completed" },
// // //   rejected: { color: "text-red-600", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Rejected" },
// // //   cancelled: { color: "text-red-500", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Cancelled" },
// // // };

// // // const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

// // // const MyBookings = () => {
// // //   const { user } = useUserStore();
// // //   const [bookings, setBookings] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [filterStatus, setFilterStatus] = useState("all");
// // //   const [sortOrder, setSortOrder] = useState("newest");
// // //   const [expandedBookings, setExpandedBookings] = useState({});
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     if (!user) return;
// // //     const fetchBookings = async () => {
// // //       try {
// // //         const res = await axios.get("/bookings/my-bookings");
// // //         setBookings(res.data);
// // //       } catch (error) {
// // //         console.error(error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchBookings();
// // //   }, [user]);

// // //   const toggleExpand = (id) => {
// // //     setExpandedBookings((prev) => ({
// // //       ...prev,
// // //       [id]: !prev[id],
// // //     }));
// // //   };

// // //   const filteredBookings =
// // //     filterStatus === "all"
// // //       ? bookings
// // //       : bookings.filter((b) => b.status === filterStatus);

// // //   if (loading)
// // //     return (
// // //       <div className="p-6 flex justify-center items-center text-yellow-500">
// // //         <Loader2 className="animate-spin w-8 h-8 mr-2" />
// // //         Loading your bookings...
// // //       </div>
// // //     );

// // //   return (
// // //     <div className="max-w-5xl mx-auto p-6">
// // //       <h2 className="text-3xl font-bold mb-6">Booking Requests</h2>

// // //       <div className="sticky top-0 z-10 bg-white pb-4 pt-2 mb-4 shadow-sm">
// // //         <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
// // //         <div className="flex justify-end px-4">
// // //           <select
// // //             value={sortOrder}
// // //             onChange={(e) => setSortOrder(e.target.value)}
// // //             className="px-4 py-2 border rounded text-indigo-700 border-indigo-600"
// // //           >
// // //             <option value="newest">Sort by: Newest to Oldest</option>
// // //             <option value="oldest">Sort by: Oldest to Newest</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       {filteredBookings.length === 0 ? (
// // //         <p className="text-center mt-10 text-gray-500 text-lg">
// // //           No bookings found for "{filterStatus}" status.
// // //         </p>
// // //       ) : (
// // //         mergeSortBookings(filteredBookings, sortOrder).map((booking) => {
// // //           const bookingName =
// // //             user.role === "client"
// // //               ? booking.artist?.username || "Artist"
// // //               : booking.client?.username || "Client";

// // //           const status = statusStyles[booking.status] || {
// // //             color: "text-gray-700",
// // //             icon: null,
// // //             label: booking.status,
// // //           };

// // //           return (
// // //             <div
// // //               key={booking._id}
// // //               className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 mb-6"
// // //             >
// // //               <div className="flex justify-between items-center mb-4">
// // //                 <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
// // //                   <User className="w-5 h-5 mr-2" />
// // //                   {bookingName}
// // //                 </h3>
// // //                 <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${status.color} border-opacity-30`}>
// // //                   {status.icon}
// // //                   <span className={`${status.color}`}>{status.label}</span>
// // //                 </div>
// // //               </div>

// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-md mb-2">
// // //                 <div className="flex items-center">
// // //                   <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
// // //                   {new Date(booking.eventDate).toLocaleDateString()}
// // //                 </div>

// // //                 <div className="flex items-center">
// // //                   <Clock className="w-5 h-5 mr-2 text-indigo-500" />
// // //                   {booking.startTime && booking.endTime
// // //                     ? `${new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(booking.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
// // //                     : "Time not set"}
// // //                 </div>

// // //                 {booking.location && (
// // //                   <div className="flex items-center">
// // //                     <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
// // //                     {booking.location}
// // //                   </div>
// // //                 )}

// // //                 {user.role === "client" && booking.artist?.email && (
// // //                   <div className="flex items-center">
// // //                     <Mail className="w-5 h-5 mr-2 text-indigo-500" />
// // //                     {booking.artist.email}
// // //                   </div>
// // //                 )}

// // //                 {user.role === "client" && booking.artist?.phone && (
// // //                   <div className="flex items-center">
// // //                     <Phone className="w-5 h-5 mr-2 text-indigo-500" />
// // //                     {booking.artist.phone}
// // //                   </div>
// // //                 )}

// // //                 {user.role === "artist" && booking.client?.email && (
// // //                   <div className="flex items-center">
// // //                     <Mail className="w-5 h-5 mr-2 text-indigo-500" />
// // //                     {booking.client.email}
// // //                   </div>
// // //                 )}

// // //                 {user.role === "artist" && booking.client?.phone && (
// // //                   <div className="flex items-center">
// // //                     <Phone className="w-5 h-5 mr-2 text-indigo-500" />
// // //                     {booking.client.phone}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* More / Contract Actions */}
// // //               <div className="flex justify-between items-center pt-3">
// // //                 <button
// // //                   onClick={() => toggleExpand(booking._id)}
// // //                   className="text-md text-indigo-600 hover:underline font-medium flex items-center"
// // //                 >
// // //                   <Info className="w-4 h-4 mr-1" />
// // //                   {expandedBookings[booking._id] ? "Hide Details" : "More"}
// // //                 </button>

// // //                 {["accepted", "booked", "completed"].includes(booking.status) && (
// // //                   <div className="flex gap-3 items-center">
// // //                     {booking.contractStatus === "none" || !booking.contractUrl ? (
// // //                       <button
// // //                         onClick={() => navigate(`/generate-contract/${booking._id}`)}
// // //                         className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition text-md"
// // //                       >
// // //                         Generate Contract
// // //                       </button>
// // //                     ) : (
// // //                       <>
// // //                         <a
// // //                           href={`http://localhost:3000${booking.contractUrl}`}
// // //                           target="_blank"
// // //                           rel="noopener noreferrer"
// // //                           className={`inline-block px-4 py-1.5 rounded transition text-md font-medium
// // //                             ${
// // //                               booking.contractStatus === 'signed'
// // //                                 ? 'bg-blue-600 text-white hover:bg-blue-700'
// // //                                 : 'bg-yellow-500 text-black hover:bg-yellow-600'
// // //                             }
// // //                           `}
// // //                         >
// // //                           {booking.contractStatus === 'signed' ? "View Signed Contract" : "View Contract"}
// // //                         </a>

// // //                         {/* Pay Now button for client when contract signed */}
// // //                         {user.role === "client" && booking.contractStatus === "signed" && !booking.isPaid && (
// // //                           <button
// // //                             onClick={() => navigate(`/payment/${booking._id}`)}
// // //                             className="bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 transition text-md font-medium"
// // //                           >
// // //                             Pay Now
// // //                           </button>
// // //                         )}
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Extra Info (only if expanded) */}
// // //               {expandedBookings[booking._id] && (
// // //                 <>
// // //                   {(booking.eventType || booking.eventDetails) && (
// // //                     <div className="mt-3 text-sm text-gray-700 space-y-1">
// // //                       <p><strong>Type:</strong> {booking.eventType || "N/A"}</p>
// // //                       <p><strong>Details:</strong> {booking.eventDetails || "N/A"}</p>
// // //                     </div>
// // //                   )}

// // //                   {booking.notes && (
// // //                     <p className="italic text-gray-600 mt-2">Notes: "{booking.notes}"</p>
// // //                   )}
// // //                 </>
// // //               )}
// // //             </div>
// // //           );
// // //         })
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // function StatusFilter({ filterStatus, setFilterStatus }) {
// // //   return (
// // //     <div className="mb-6 flex flex-wrap gap-3 justify-center">
// // //       {statusOptions.map((status) => (
// // //         <button
// // //           key={status}
// // //           onClick={() => setFilterStatus(status)}
// // //           className={`px-4 py-2 rounded-full border ${
// // //             filterStatus === status
// // //               ? "bg-indigo-600 text-white border-indigo-600"
// // //               : "text-indigo-600 border-indigo-600 hover:bg-indigo-100"
// // //           } transition`}
// // //         >
// // //           {status.charAt(0).toUpperCase() + status.slice(1)}
// // //         </button>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // function mergeSortBookings(bookings, order = "newest") {
// // //   if (bookings.length <= 1) return bookings;
// // //   const mid = Math.floor(bookings.length / 2);
// // //   const left = mergeSortBookings(bookings.slice(0, mid), order);
// // //   const right = mergeSortBookings(bookings.slice(mid), order);
// // //   return merge(left, right, order);
// // // }

// // // function merge(left, right, order) {
// // //   const result = [];
// // //   while (left.length && right.length) {
// // //     const leftDate = new Date(left[0].eventDate);
// // //     const rightDate = new Date(right[0].eventDate);
// // //     const condition = order === "newest" ? leftDate > rightDate : leftDate < rightDate;
// // //     result.push(condition ? left.shift() : right.shift());
// // //   }
// // //   return [...result, ...left, ...right];
// // // }

// // // export default MyBookings;


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
// // import { useNavigate } from "react-router-dom";

// // const statusStyles = {
// //   pending: { color: "text-yellow-500", icon: <Clock className="w-5 h-5 mr-1" />, label: "Pending" },
// //   accepted: { color: "text-blue-500", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Accepted" },
// //   booked: { color: "text-green-600", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Booked" },
// //   completed: { color: "text-gray-500", icon: <Flag className="w-5 h-5 mr-1" />, label: "Completed" },
// //   rejected: { color: "text-red-600", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Rejected" },
// //   cancelled: { color: "text-red-500", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Cancelled" },
// // };

// // const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

// // const MyBookings = () => {
// //   const { user } = useUserStore();
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filterStatus, setFilterStatus] = useState("all");
// // const [sortOrder, setSortOrder] = useState("recentUpdated");
// //   const [expandedBookings, setExpandedBookings] = useState({});
// //   const navigate = useNavigate();

// // useEffect(() => {
// //   if (!user) return;

// //   const fetchBookings = async () => {
// //     setLoading(true);
// //     try {
// //       let sortBy = "priority";
// //       let order = "desc";

// //       if (sortOrder === "newest") sortBy = "createdAt";
// //       else if (sortOrder === "oldest") {
// //         sortBy = "createdAt";
// //         order = "asc";
// //       } else if (sortOrder === "recentUpdated") sortBy = "updatedAt";

// //       const res = await axios.get(`/bookings/my-bookings?sortBy=${sortBy}&sortOrder=${order}`);
// //       setBookings(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   fetchBookings();
// // }, [user, sortOrder]);


// //   const toggleExpand = (id) => {
// //     setExpandedBookings((prev) => ({
// //       ...prev,
// //       [id]: !prev[id],
// //     }));
// //   };

// //   const filteredBookings =
// //     filterStatus === "all"
// //       ? bookings
// //       : bookings.filter((b) => b.status === filterStatus);

// //   if (loading)
// //     return (
// //       <div className="p-6 flex justify-center items-center text-yellow-500">
// //         <Loader2 className="animate-spin w-8 h-8 mr-2" />
// //         Loading your bookings...
// //       </div>
// //     );

// //   return (
// //     <div className="max-w-5xl mx-auto p-6">
// //       <h2 className="text-3xl font-bold mb-6">Booking Requests</h2>

// //       <div className="sticky top-0 z-10 bg-white pb-4 pt-2 mb-4 shadow-sm">
// //         <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
// //         <div className="flex justify-end px-4">
// //          <select
// //   value={sortOrder}
// //   onChange={(e) => setSortOrder(e.target.value)}
// //   className="px-4 py-2 border rounded text-indigo-700 border-indigo-600"
// // >
// //   <option value="recentUpdated">Sort by: Recently Updated</option>
// //   <option value="newest">Sort by: Newest Created</option>
// //   <option value="oldest">Sort by: Oldest Created</option>
// //   <option value="priority">Sort by: Priority</option> {/* ← based on your custom logic */}
// // </select>

// //         </div>
// //       </div>

// //       {filteredBookings.length === 0 ? (
// //         <p className="text-center mt-10 text-gray-500 text-lg">
// //           No bookings found for "{filterStatus}" status.
// //         </p>
// //       ) : (
// //         filteredBookings.map((booking) => {
// //           const bookingName =
// //             user.role === "client"
// //               ? booking.artist?.username || "Artist"
// //               : booking.client?.username || "Client";

// //           const status = statusStyles[booking.status] || {
// //             color: "text-gray-700",
// //             icon: null,
// //             label: booking.status,
// //           };
          

// //           return (
// //             <div
// //               key={booking._id}
// //               className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 mb-6"
// //             >
// //               <div className="flex justify-between items-center mb-4">
// //                 <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
// //                   <User className="w-5 h-5 mr-2" />
// //                   {bookingName}
// //                 </h3>
// //                 <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${status.color} border-opacity-30`}>
// //                   {status.icon}
// //                   <span className={`${status.color}`}>{status.label}</span>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-md mb-2">
// //                 <div className="flex items-center">
// //                   <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
// //                   {new Date(booking.eventDate).toLocaleDateString()}
// //                 </div>

// //                 <div className="flex items-center">
// //                   <Clock className="w-5 h-5 mr-2 text-indigo-500" />
// //                   {booking.startTime && booking.endTime
// //                     ? `${new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(booking.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
// //                     : "Time not set"}
// //                 </div>

// //                 {booking.location && (
// //                   <div className="flex items-center">
// //                     <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.location}
// //                   </div>
// //                 )}

// //                 {user.role === "client" && booking.artist?.email && (
// //                   <div className="flex items-center">
// //                     <Mail className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.artist.email}
// //                   </div>
// //                 )}

// //                 {user.role === "client" && booking.artist?.phone && (
// //                   <div className="flex items-center">
// //                     <Phone className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.artist.phone}
// //                   </div>
// //                 )}

// //                 {user.role === "artist" && booking.client?.email && (
// //                   <div className="flex items-center">
// //                     <Mail className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.client.email}
// //                   </div>
// //                 )}

// //                 {user.role === "artist" && booking.client?.phone && (
// //                   <div className="flex items-center">
// //                     <Phone className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.client.phone}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* More / Contract Actions */}
// //               <div className="flex justify-between items-center pt-3">
// //                 <button
// //                   onClick={() => toggleExpand(booking._id)}
// //                   className="text-md text-indigo-600 hover:underline font-medium flex items-center"
// //                 >
// //                   <Info className="w-4 h-4 mr-1" />
// //                   {expandedBookings[booking._id] ? "Hide Details" : "More"}
// //                 </button>

// //                 {["accepted", "booked", "completed"].includes(booking.status) && (
// //                   <div className="flex gap-3 items-center">
// //                     {booking.contractStatus === "none" || !booking.contractUrl ? (
// //                       <button
// //                         onClick={() => navigate(`/generate-contract/${booking._id}`)}
// //                         className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition text-md"
// //                       >
// //                         Generate Contract
// //                       </button>
// //                     ) : (
// //                       <>
// //                         <a
// //                           href={`http://localhost:3000${booking.contractUrl}`}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className={`inline-block px-4 py-1.5 rounded transition text-md font-medium
// //                             ${
// //                               booking.contractStatus === 'signed'
// //                                 ? 'bg-blue-600 text-white hover:bg-blue-700'
// //                                 : 'bg-yellow-500 text-black hover:bg-yellow-600'
// //                             }
// //                           `}
// //                         >
// //                           {booking.contractStatus === 'signed' ? "View Signed Contract" : "View Contract"}
// //                         </a>

// //                         {/* Pay Now button for client when contract signed */}
// //                         {user.role === "client" && booking.contractStatus === "signed" && !booking.isPaid && (
// //                           <button
// //                             onClick={() => navigate(`/payment/${booking._id}`)}
// //                             className="bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 transition text-md font-medium"
// //                           >
// //                             Pay Now
// //                           </button>
// //                         )}
// //                       </>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Extra Info (only if expanded) */}
// //               {expandedBookings[booking._id] && (
// //                 <>
// //                   {(booking.eventType || booking.eventDetails) && (
// //                     <div className="mt-3 text-sm text-gray-700 space-y-1">
// //                       <p><strong>Type:</strong> {booking.eventType || "N/A"}</p>
// //                       <p><strong>Details:</strong> {booking.eventDetails || "N/A"}</p>
// //                     </div>
// //                   )}

// //                   {booking.notes && (
// //                     <p className="italic text-gray-600 mt-2">Notes: "{booking.notes}"</p>
// //                   )}
// //                 </>
// //               )}
// //             </div>
// //           );
// //         })
// //       )}
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

// // export default MyBookings;





// ////////////////////////////sabai mileko before ui improv//////////////////
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
// // import { useNavigate } from "react-router-dom";

// // const statusStyles = {
// //   pending: { color: "text-yellow-500", icon: <Clock className="w-5 h-5 mr-1" />, label: "Pending" },
// //   accepted: { color: "text-blue-500", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Accepted" },
// //   booked: { color: "text-green-600", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Booked" },
// //   completed: { color: "text-gray-500", icon: <Flag className="w-5 h-5 mr-1" />, label: "Completed" },
// //   rejected: { color: "text-red-600", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Rejected" },
// //   cancelled: { color: "text-red-500", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Cancelled" },
// // };

// // const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

// // const MyBookings = () => {
// //   const { user } = useUserStore();
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filterStatus, setFilterStatus] = useState("all");
// //   const [sortOrder, setSortOrder] = useState("recentUpdated");
// //   const [expandedBookings, setExpandedBookings] = useState({});
// //   const [payLoadingId, setPayLoadingId] = useState(null); // For tracking payment button loading
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!user) return;

// //     const fetchBookings = async () => {
// //       setLoading(true);
// //       try {
// //         let sortBy = "priority";
// //         let order = "desc";

// //         if (sortOrder === "newest") sortBy = "createdAt";
// //         else if (sortOrder === "oldest") {
// //           sortBy = "createdAt";
// //           order = "asc";
// //         } else if (sortOrder === "recentUpdated") sortBy = "updatedAt";

// //         const res = await axios.get(`/bookings/my-bookings?sortBy=${sortBy}&sortOrder=${order}`);
// //         setBookings(res.data);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBookings();
// //   }, [user, sortOrder]);

// //   const toggleExpand = (id) => {
// //     setExpandedBookings((prev) => ({
// //       ...prev,
// //       [id]: !prev[id],
// //     }));
// //   };

// //   const handlePayNow = async (bookingId) => {
// //     try {
// //       setPayLoadingId(bookingId);
// //       const res = await axios.post("/payments/paypal/create", { bookingId, paymentType: "advance", });
// //       if (res.data.success && res.data.approvalURL) {
// //         window.location.href = res.data.approvalURL;
// //       }
// //     } catch (error) {
// //       console.error("Payment error", error);
// //       alert("Failed to initiate payment. Please try again.");
// //     } finally {
// //       setPayLoadingId(null);
// //     }
// //   };

// // //   const handleFinalPayment = async (bookingId) => {
// // //   try {
// // //     setPayLoadingId(bookingId);
// // //     const res = await axios.post("/payments/paypal/create", {
// // //       bookingId,
// // //       type: "final",
// // //     });

// // //     if (res.data.success && res.data.approvalURL) {
// // //       window.location.href = res.data.approvalURL;
// // //     }
// // //   } catch (error) {
// // //     console.error("Final payment error", error);
// // //     alert("Failed to initiate final payment. Please try again.");
// // //   } finally {
// // //     setPayLoadingId(null);
// // //   }
// // // };


// //   const filteredBookings =
// //     filterStatus === "all"
// //       ? bookings
// //       : bookings.filter((b) => b.status === filterStatus);

// //   if (loading)
// //     return (
// //       <div className="p-6 flex justify-center items-center text-yellow-500">
// //         <Loader2 className="animate-spin w-8 h-8 mr-2" />
// //         Loading your bookings...
// //       </div>
// //     );

// // const isCompletionConfirmable = (booking) =>
// //   user.role === "client" &&
// //   booking.status === "booked" &&
// //   booking.contractStatus === "signed" &&
// //   booking.advance > 0 &&
// //   !booking.isFinalPaid && // you will track this in booking or payments later
// //   new Date() > new Date(booking.endTime);


// //   return (
// //     <div className="max-w-5xl mx-auto p-6">
// //       <h2 className="text-3xl font-bold mb-6">Booking Requests</h2>

// //       <div className="sticky top-0 z-10 bg-white pb-4 pt-2 mb-4 shadow-sm">
// //         <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
// //         <div className="flex justify-end px-4">
// //           <select
// //             value={sortOrder}
// //             onChange={(e) => setSortOrder(e.target.value)}
// //             className="px-4 py-2 border rounded text-indigo-700 border-indigo-600"
// //           >
// //             <option value="recentUpdated">Sort by: Recently Updated</option>
// //             <option value="newest">Sort by: Newest Created</option>
// //             <option value="oldest">Sort by: Oldest Created</option>
// //             <option value="priority">Sort by: Priority</option> {/* ← your custom logic */}
// //           </select>
// //         </div>
// //       </div>

// //       {filteredBookings.length === 0 ? (
// //         <p className="text-center mt-10 text-gray-500 text-lg">
// //           No bookings found for "{filterStatus}" status.
// //         </p>
// //       ) : (
// //         filteredBookings.map((booking) => {
// //           const bookingName =
// //             user.role === "client"
// //               ? booking.artist?.username || "Artist"
// //               : booking.client?.username || "Client";

// //           const status = statusStyles[booking.status] || {
// //             color: "text-gray-700",
// //             icon: null,
// //             label: booking.status,
// //           };

// //           return (
// //             <div
// //               key={booking._id}
// //               className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 mb-6"
// //             >
// //               <div className="flex justify-between items-center mb-4">
// //                 <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
// //                   <User className="w-5 h-5 mr-2" />
// //                   {bookingName}
// //                 </h3>
// //                 <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${status.color} border-opacity-30`}>
// //                   {status.icon}
// //                   <span className={`${status.color}`}>{status.label}</span>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-md mb-2">
// //                 <div className="flex items-center">
// //                   <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
// //                   {new Date(booking.eventDate).toLocaleDateString()}
// //                 </div>

// //                 <div className="flex items-center">
// //                   <Clock className="w-5 h-5 mr-2 text-indigo-500" />
// //                   {booking.startTime && booking.endTime
// //                     ? `${new Date(booking.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(booking.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
// //                     : "Time not set"}
// //                 </div>

// //                 {booking.location && (
// //                   <div className="flex items-center">
// //                     <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.location}
// //                   </div>
// //                 )}

// //                 {user.role === "client" && booking.artist?.email && (
// //                   <div className="flex items-center">
// //                     <Mail className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.artist.email}
// //                   </div>
// //                 )}

// //                 {user.role === "client" && booking.artist?.phone && (
// //                   <div className="flex items-center">
// //                     <Phone className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.artist.phone}
// //                   </div>
// //                 )}

// //                 {user.role === "artist" && booking.client?.email && (
// //                   <div className="flex items-center">
// //                     <Mail className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.client.email}
// //                   </div>
// //                 )}

// //                 {user.role === "artist" && booking.client?.phone && (
// //                   <div className="flex items-center">
// //                     <Phone className="w-5 h-5 mr-2 text-indigo-500" />
// //                     {booking.client.phone}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* More / Contract Actions */}
// //               <div className="flex justify-between items-center pt-3">
// //                 <button
// //                   onClick={() => toggleExpand(booking._id)}
// //                   className="text-md text-indigo-600 hover:underline font-medium flex items-center"
// //                 >
// //                   <Info className="w-4 h-4 mr-1" />
// //                   {expandedBookings[booking._id] ? "Hide Details" : "More"}
// //                 </button>

// //                 {["accepted", "booked", "completed"].includes(booking.status) && (
// //                   <div className="flex gap-3 items-center">
// //                     {booking.contractStatus === "none" || !booking.contractUrl ? (
// //                       <button
// //                         onClick={() => navigate(`/generate-contract/${booking._id}`)}
// //                         className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition text-md"
// //                       >
// //                         Generate Contract
// //                       </button>
// //                     ) : (
// //                       <>
// //                         <a
// //                           href={`http://localhost:3000${booking.contractUrl}`}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className={`inline-block px-4 py-1.5 rounded transition text-md font-medium
// //                             ${
// //                               booking.contractStatus === 'signed'
// //                                 ? 'bg-blue-600 text-white hover:bg-blue-700'
// //                                 : 'bg-yellow-500 text-black hover:bg-yellow-600'
// //                             }
// //                           `}
// //                         >
// //                           {booking.contractStatus === 'signed' ? "View Signed Contract" : "View Contract"}
// //                         </a>

// //                         {/* Pay Now button for client when contract signed and not paid */}
// //                         {user.role === "client" && booking.contractStatus === "signed" && !booking.isPaid && (
// //                           <button
// //                             onClick={() => handlePayNow(booking._id)}
// //                             disabled={payLoadingId === booking._id}
// //                             className={`bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 transition text-md font-medium ${payLoadingId === booking._id ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                           >
// //                             {payLoadingId === booking._id ? 'Processing...' : 'Pay Now'}
// //                           </button>
// //                         )}
                       
// //                        {isCompletionConfirmable(booking) && (
// //                           <>
// //                             <button
// //                               onClick={() => navigate(`/booking/confirm-completion/${booking._id}`)}
// //                               className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition text-md font-medium"
// //                             >
// //                               Confirm Completion
// //                             </button>
// //                             <button
// //                               onClick={() => navigate(`/booking/report-issue/${booking._id}`)}
// //                               className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 transition text-md font-medium ml-2"
// //                             >
// //                               Report Issue
// //                             </button>
// //                           </>
// //                         )}
// //                       </>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Extra Info (only if expanded) */}
// //               {expandedBookings[booking._id] && (
// //                 <>
// //                   {(booking.eventType || booking.eventDetails) && (
// //                     <div className="mt-3 text-sm text-gray-700 space-y-1">
// //                       <p><strong>Type:</strong> {booking.eventType || "N/A"}</p>
// //                       <p><strong>Details:</strong> {booking.eventDetails || "N/A"}</p>
// //                     </div>
// //                   )}

// //                   {booking.notes && (
// //                     <p className="italic text-gray-600 mt-2">Notes: "{booking.notes}"</p>
// //                   )}
// //                 </>
// //               )}
// //             </div>
// //           );
// //         })
// //       )}
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
//   ChevronDown, ChevronUp
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const statusStyles = {
//   pending: {
//     color: "bg-yellow-100 text-yellow-800",
//     icon: <Clock className="w-5 h-5 mr-1" />,
//     label: "Pending",
//   },
//   accepted: {
//     color: "bg-blue-100 text-blue-800",
//     icon: <CheckCircle className="w-5 h-5 mr-1" />,
//     label: "Accepted",
//   },
//   booked: {
//     color: "bg-green-100 text-green-800",
//     icon: <CheckCircle className="w-5 h-5 mr-1" />,
//     label: "Booked",
//   },
//   completed: {
//     color: "bg-gray-200 text-gray-800",
//     icon: <Flag className="w-5 h-5 mr-1" />,
//     label: "Completed",
//   },
//   rejected: {
//     color: "bg-red-100 text-red-800",
//     icon: <XCircle className="w-5 h-5 mr-1" />,
//     label: "Rejected",
//   },
//   cancelled: {
//     color: "bg-red-600 text-white",
//     icon: <XCircle className="w-5 h-5 mr-1" />,
//     label: "Cancelled",
//   },
// };

// const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

// const MyBookings = () => {
//   const { user } = useUserStore();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [sortOrder, setSortOrder] = useState("recentUpdated");
//   const [expandedBookings, setExpandedBookings] = useState({});
//   const [payLoadingId, setPayLoadingId] = useState(null); // For tracking payment button loading
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) return;

//     const fetchBookings = async () => {
//       setLoading(true);
//       try {
//         let sortBy = "priority";
//         let order = "desc";

//         if (sortOrder === "newest") sortBy = "createdAt";
//         else if (sortOrder === "oldest") {
//           sortBy = "createdAt";
//           order = "asc";
//         } else if (sortOrder === "recentUpdated") sortBy = "updatedAt";

//         const res = await axios.get(`/bookings/my-bookings?sortBy=${sortBy}&sortOrder=${order}`);
//         setBookings(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [user, sortOrder]);

//   const toggleExpand = (id) => {
//     setExpandedBookings((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handlePayNow = async (bookingId) => {
//     try {
//       setPayLoadingId(bookingId);
//       const res = await axios.post("/payments/paypal/create", { bookingId, paymentType: "advance", });
//       if (res.data.success && res.data.approvalURL) {
//         window.location.href = res.data.approvalURL;
//       }
//     } catch (error) {
//       console.error("Payment error", error);
//       alert("Failed to initiate payment. Please try again.");
//     } finally {
//       setPayLoadingId(null);
//     }
//   };

// //   const handleFinalPayment = async (bookingId) => {
// //   try {
// //     setPayLoadingId(bookingId);
// //     const res = await axios.post("/payments/paypal/create", {
// //       bookingId,
// //       type: "final",
// //     });

// //     if (res.data.success && res.data.approvalURL) {
// //       window.location.href = res.data.approvalURL;
// //     }
// //   } catch (error) {
// //     console.error("Final payment error", error);
// //     alert("Failed to initiate final payment. Please try again.");
// //   } finally {
// //     setPayLoadingId(null);
// //   }
// // };


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

// const isCompletionConfirmable = (booking) =>
//   user.role === "client" &&
//   booking.status === "booked" &&
//   booking.contractStatus === "signed" &&
//   booking.advance > 0 &&
//   !booking.isFinalPaid && // you will track this in booking or payments later
//   new Date() > new Date(booking.endTime);


//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Booking Requests</h2>

//       <div className="sticky top-0 z-10 bg-white pb-4 pt-2 mb-4 shadow-sm">
//         <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
//         <div className="flex justify-end px-4">
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="px-4 py-2 border rounded text-indigo-700 border-indigo-600"
//           >
//             <option value="recentUpdated">Sort by: Recently Updated</option>
//             <option value="newest">Sort by: Newest Created</option>
//             <option value="oldest">Sort by: Oldest Created</option>
//             <option value="priority">Sort by: Priority</option> {/* ← your custom logic */}
//           </select>
//         </div>
//       </div>

//     {filteredBookings.length === 0 ? (
//       <p className="text-center mt-10 text-gray-500 text-lg flex flex-col items-center">
//         <Info className="w-8 h-8 mb-2" aria-label="No bookings icon" />
//         You don’t have any {filterStatus !== 'all' ? `"${filterStatus}"` : ""} bookings yet.
//         <button
//           onClick={() => navigate("/artists")}
//           className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
//         >
//           Browse Artists
//         </button>
//       </p>
//     ) : (
//         filteredBookings.map((booking) => {
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
//               <div
//                 key={booking._id}
//                 className="bg-white shadow hover:shadow-lg transition rounded-2xl p-6 mb-6 border border-gray-100"
//               >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
//                   <img
//                     src={booking.artist.profilePicture?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//                     alt={`${bookingName}'s profile`}
//                     className="w-10 h-10 rounded-full mr-2 object-cover"
//                   />
//                   {bookingName}
//                 </h3>
//                 <div
//                   className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${status.color}`}
//                 >
//                   {status.icon}
//                   <span>{status.label}</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-md mb-2">
//                 <div className="flex items-center">
//                   <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
//                   {new Date(booking.eventDate).toLocaleDateString(undefined, {
//                     weekday: "long",
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </div>

//                 <div className="flex items-center">
//                 <Clock className="w-5 h-5 mr-2 text-indigo-500" />
//                 {booking.startTime && booking.endTime
//                   ? `${new Date(booking.startTime).toLocaleTimeString(undefined, {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })} - ${new Date(booking.endTime).toLocaleTimeString(undefined, {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })}`
//                   : "Time not set"}
//               </div>

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

//               {/* More / Contract Actions */}
//               <div className="flex justify-between items-center pt-3">
//                 <button
//                   onClick={() => toggleExpand(booking._id)}
//                   className="text-md text-indigo-600 hover:underline font-medium flex items-center"
//                 >
//                   <Info className="w-4 h-4 mr-1" aria-label="More Info" />
//                   {expandedBookings[booking._id] ? "Hide Details" : "More"}
//                   {expandedBookings[booking._id] ? (
//                     <ChevronUp className="w-4 h-4 ml-1" />
//                   ) : (
//                     <ChevronDown className="w-4 h-4 ml-1" />
//                   )}
//                 </button>

//                 {["accepted", "booked", "completed"].includes(booking.status) && (
//                   <div className="flex flex-col gap-3 items-start md:items-end">
//   <div className="flex flex-wrap gap-2">
//     {booking.contractStatus === "none" || !booking.contractUrl ? (
//       <button
//         onClick={() => navigate(`/generate-contract/${booking._id}`)}
//         className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition text-md"
//       >
//         Generate Contract
//       </button>
//     ) : (
//       <>
//         <a
//           href={`http://localhost:3000${booking.contractUrl}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className={`px-4 py-1.5 rounded text-md font-medium transition ${
//             booking.contractStatus === "signed"
//               ? "bg-blue-600 text-white hover:bg-blue-700"
//               : "bg-yellow-500 text-black hover:bg-yellow-600"
//           }`}
//         >
//           {booking.contractStatus === "signed" ? "View Signed Contract" : "View Contract"}
//         </a>

//         {user.role === "client" &&
//           booking.contractStatus === "signed" &&
//           !booking.isPaid && (
//             <button
//               onClick={() => handlePayNow(booking._id)}
//               disabled={payLoadingId === booking._id}
//               className={`bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 flex items-center ${
//                 payLoadingId === booking._id ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {payLoadingId === booking._id && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
//               {payLoadingId === booking._id ? "Processing..." : "Pay Now"}
//             </button>
//           )}

//         {booking.payments?.some((p) => p.type === "advance") && (
//           <button
//             onClick={() =>
//               navigate(`/payments/receipt/${booking.payments.find((p) => p.type === "advance")?.paymentId}`)
//             }
//             className="bg-indigo-500 text-white px-3 py-1.5 rounded hover:bg-indigo-600 text-sm font-medium"
//           >
//             View Advance Receipt
//           </button>
//         )}

//         {booking.isFinalPaid && booking.payments?.some((p) => p.type === "final") && (
//           <button
//             onClick={() =>
//               navigate(`/payments/receipt/${booking.payments.find((p) => p.type === "final")?.paymentId}`)
//             }
//             className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 text-sm font-medium"
//           >
//             View Final Receipt
//           </button>
//         )}
//       </>
//     )}
//   </div>

//   {isCompletionConfirmable(booking) && (
//     <div className="flex flex-wrap gap-2">
//       <button
//         onClick={() => navigate(`/booking/confirm-completion/${booking._id}`)}
//         className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 text-md font-medium"
//       >
//         Confirm Completion
//       </button>
//       <button
//         onClick={() => navigate(`/booking/report-issue/${booking._id}`)}
//         className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-700 text-md font-medium"
//       >
//         Report Issue
//       </button>
//     </div>
//   )}
// </div>

//                 )}
//               </div>

//               {/* Extra Info (only if expanded) */}
//               {expandedBookings[booking._id] && (
//                 <div className="mt-4 overflow-hidden transition-all duration-300 ease-in-out">
//                   {(booking.eventType || booking.eventDetails) && (
//                     <div className="text-sm text-gray-700 space-y-1">
//                       <p><strong>Type:</strong> {booking.eventType || "N/A"}</p>
//                       <p><strong>Details:</strong> {booking.eventDetails || "N/A"}</p>
//                     </div>
//                   )}
//                   {booking.notes && (
//                     <p className="italic text-gray-600 mt-2">Notes: "{booking.notes}"</p>
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

// // Improve the filter buttons for accessibility:
// function StatusFilter({ filterStatus, setFilterStatus }) {
//   return (
//     <div className="mb-6 flex flex-wrap gap-4 justify-center">
//       {statusOptions.map((status) => (
//         <button
//           key={status}
//           onClick={() => setFilterStatus(status)}
//           aria-pressed={filterStatus === status}
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="w-5 h-5 mr-1" />,
    label: "Pending",
  },
  accepted: {
    color: "bg-blue-100 text-blue-800",
    icon: <CheckCircle className="w-5 h-5 mr-1" />,
    label: "Accepted",
  },
  booked: {
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle className="w-5 h-5 mr-1" />,
    label: "Booked",
  },
  completed: {
    color: "bg-gray-200 text-gray-800",
    icon: <Flag className="w-5 h-5 mr-1" />,
    label: "Completed",
  },
  rejected: {
    color: "bg-red-100 text-red-800",
    icon: <XCircle className="w-5 h-5 mr-1" />,
    label: "Rejected",
  },
  cancelled: {
    color: "bg-red-600 text-white",
    icon: <XCircle className="w-5 h-5 mr-1" />,
    label: "Cancelled",
  },
};

const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

const MyBookings = () => {
  const { user } = useUserStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("recentUpdated");
  const [expandedBookings, setExpandedBookings] = useState({});
  const [paymentDropdown, setPaymentDropdown] = useState({});
  const [payLoadingId, setPayLoadingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        let sortBy = "priority";
        let order = "desc";

        if (sortOrder === "newest") sortBy = "createdAt";
        else if (sortOrder === "oldest") {
          sortBy = "createdAt";
          order = "asc";
        } else if (sortOrder === "recentUpdated") sortBy = "updatedAt";

        const res = await axios.get(`/bookings/my-bookings?sortBy=${sortBy}&sortOrder=${order}`);
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, sortOrder]);

  const toggleExpand = (id) => {
    setExpandedBookings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePaymentDropdown = (id) => {
    setPaymentDropdown((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePayNow = async (bookingId) => {
    try {
      setPayLoadingId(bookingId);
      const res = await axios.post("/payments/paypal/create", {
        bookingId,
        paymentType: "advance",
      });
      if (res.data.success && res.data.approvalURL) {
        window.location.href = res.data.approvalURL;
      }
    } catch (error) {
      console.error("Payment error", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setPayLoadingId(null);
    }
  };

  const isCompletionConfirmable = (booking) =>
    user.role === "client" &&
    booking.status === "booked" &&
    booking.contractStatus === "signed" &&
    booking.advance > 0 &&
    !booking.isFinalPaid &&
    new Date() > new Date(booking.endTime);

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
            <option value="recentUpdated">Sort by: Recently Updated</option>
            <option value="newest">Sort by: Newest Created</option>
            <option value="oldest">Sort by: Oldest Created</option>
            <option value="priority">Sort by: Priority</option>
          </select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-center mt-10 text-gray-500 text-lg flex flex-col items-center">
          <Info className="w-8 h-8 mb-2" />
          You don’t have any {filterStatus !== "all" ? `"${filterStatus}"` : ""} bookings yet.
          <button
            onClick={() => navigate("/artists")}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Browse Artists
          </button>
        </p>
      ) : (
        filteredBookings.map((booking) => {
          const bookingName =
            user.role === "client" ? booking.artist?.username || "Artist" : booking.client?.username || "Client";
          const status = statusStyles[booking.status] || { color: "text-gray-700", icon: null, label: booking.status };

          return (
            <div
              key={booking._id}
              className="bg-white shadow hover:shadow-lg transition rounded-2xl p-6 mb-6 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
                  <img
                    src={booking.artist.profilePicture?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={`${bookingName}'s profile`}
                    className="w-10 h-10 rounded-full mr-2 object-cover"
                  />
                  {bookingName}
                </h3>
                <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${status.color}`}>
                  {status.icon}
                  <span>{status.label}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-md mb-2">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                  {new Date(booking.eventDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                  {booking.startTime && booking.endTime
                    ? `${new Date(booking.startTime).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })} - ${new Date(booking.endTime).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}`
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

              <div className="flex justify-between items-center pt-3">
                <button
                  onClick={() => toggleExpand(booking._id)}
                  className="text-md text-indigo-600 hover:underline font-medium flex items-center"
                >
                  <Info className="w-4 h-4 mr-1" />
                  {expandedBookings[booking._id] ? "Hide Details" : "More"}
                  {expandedBookings[booking._id] ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                </button>

                {["accepted", "booked", "completed"].includes(booking.status) && (
                  <div className="flex flex-col gap-3 items-start md:items-end">
                    <div className="flex flex-wrap gap-2 relative">
                      {booking.contractStatus === "none" || !booking.contractUrl ? (
                        <button
                          onClick={() => navigate(`/generate-contract/${booking._id}`)}
                          className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
                        >
                          Generate Contract
                        </button>
                      ) : (
                        <>
                          <a
                            href={`http://localhost:3000${booking.contractUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-4 py-1.5 rounded text-md font-medium transition ${
                              booking.contractStatus === "signed"
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-yellow-500 text-black hover:bg-yellow-600"
                            }`}
                          >
                            {booking.contractStatus === "signed" ? "View Signed Contract" : "View Contract"}
                          </a>

                          {user.role === "client" && booking.contractStatus === "signed" && !booking.isPaid && (
                            <button
                              onClick={() => handlePayNow(booking._id)}
                              disabled={payLoadingId === booking._id}
                              className={`bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700 flex items-center ${
                                payLoadingId === booking._id ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            >
                              {payLoadingId === booking._id && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                              {payLoadingId === booking._id ? "Processing..." : "Pay Now"}
                            </button>
                          )}

                          {/* 🔽 NEW Payment Dropdown */}
                          {(booking.payments?.some((p) => p.type === "advance") ||
                            (booking.isFinalPaid && booking.payments?.some((p) => p.type === "final"))) && (
                            <div className="relative">
                              <button
                                onClick={() => togglePaymentDropdown(booking._id)}
                                className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 flex items-center text-sm font-medium"
                              >
                                Payment
                                {paymentDropdown[booking._id] ? (
                                  <ChevronUp className="w-4 h-4 ml-2" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 ml-2" />
                                )}
                              </button>
                              {paymentDropdown[booking._id] && (
                              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                  {booking.payments?.some((p) => p.type === "advance") && (
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/payments/receipt/${booking.payments.find((p) => p.type === "advance")?.paymentId}`
                                        )
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-100"
                                    >
                                      View Advance Receipt
                                    </button>
                                  )}
                                  <div className="border-t border-gray-200 my-1 mx-2"></div>

                                  {booking.isFinalPaid && booking.payments?.some((p) => p.type === "final") && (
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/payments/receipt/${booking.payments.find((p) => p.type === "final")?.paymentId}`
                                        )
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-100"
                                    >
                                      View Final Receipt
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {isCompletionConfirmable(booking) && (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => navigate(`/booking/confirm-completion/${booking._id}`)}
                          className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
                        >
                          Confirm Completion
                        </button>
                        <button
                          onClick={() => navigate(`/booking/report-issue/${booking._id}`)}
                          className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-700"
                        >
                          Report Issue
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {expandedBookings[booking._id] && (
                <div className="mt-4 text-sm text-gray-700 space-y-1">
                  {(booking.eventType || booking.eventDetails) && (
                    <>
                      <p><strong>Type:</strong> {booking.eventType || "N/A"}</p>
                      <p><strong>Details:</strong> {booking.eventDetails || "N/A"}</p>
                    </>
                  )}
                  {booking.notes && <p className="italic text-gray-600 mt-2">Notes: "{booking.notes}"</p>}
                </div>
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
    <div className="mb-6 flex flex-wrap gap-4 justify-center">
      {statusOptions.map((status) => (
        <button
          key={status}
          onClick={() => setFilterStatus(status)}
          aria-pressed={filterStatus === status}
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

export default MyBookings;
