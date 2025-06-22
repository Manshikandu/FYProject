import React, { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { Link } from "react-router-dom";

export default function ArtistDashboard() {
  //const {username} = useUserStore
  const artist = useUserStore((state) => state.user);
  const [bookings, setBookings] = useState([
    {
      type: "Wedding",
      date: "June 20, 2025",
      location: "New York",
      status: "Pending Confirmation",
    },
  ]);

  const [bookingRequests, setBookingRequests] = useState(2);
  const [earnings, setEarnings] = useState({ month: "$2,400", gigs: 8 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 p-6 text-black">
      <div className="max-w-6xl mx-auto bg-white/10 rounded-2xl p-6 backdrop-blur-md h-screen">
        <nav className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">Dashboard</div>
          <div className="space-x-16">
          <Link to="/artist-bookings" className="hover:text-[#1A237E] shadow-2xl">Bookings</Link>
          <Link to="/post" className="hover:text-[#1A237E] shadow-2xl">Posts</Link>
          <Link to="/profile" className="hover:text-[#1A237E] shadow-2xl">Profile</Link>

          </div>
          {/* <div className="w-10 h-10 bg-white/20 rounded-full"></div> */}
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl font-bold">Welcome back, {artist?.username || "Artist"}!</h1>
        </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 text-black">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">Upcoming Bookings</h2>
            <div className="border p-4 rounded-lg">
              <p className="font-semibold">{bookings[0].type}</p>
              <p>{bookings[0].date}</p>
              <p>{bookings[0].location}</p>
              <p className="text-sm text-gray-500">Status: {bookings[0].status}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 text-black">
            <h2 className="text-lg font-semibold text-orange-600 mb-2">New Booking Requests</h2>
            <div className="border p-4 rounded-lg bg-orange-100">
              <p className="font-bold text-orange-700">
                You have {bookingRequests} new booking requests
              </p>
              <p className="text-sm">awaiting your response!</p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 text-black">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Earnings Overview</h2>
            <p className="text-xl font-bold">This Month: {earnings.month}</p>
            <p>Total Gigs: {earnings.gigs}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Link to="/profile" className="bg-purple-800 text-white rounded-xl p-4 hover:bg-purple-900">View Profile</Link>
            <Link to="/availability" className="bg-purple-800 text-white rounded-xl p-4 hover:bg-purple-900">Manage Availability</Link>
            <Link to="/chat" className="bg-purple-800 text-white rounded-xl p-4 hover:bg-purple-900">Start Live Chat</Link>

          </div>
        </div>
      </div>
    </div>
  );
}
        
//       </div>
//     </div>
//   );
// }


