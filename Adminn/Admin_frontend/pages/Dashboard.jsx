// import React, {useEffect} from "react";

// const Dashboard = () => {

//     console.log("Dashboard rendered here");
//   return (
//     <div  className=" flex-1 flex flex-col p-4 overflow-auto">
//         <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
//         <p className="text-gray-600">Overview of KalaConnect platform</p>
//     </div>
//   );
// };

// export default Dashboard;


import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [clientsCount, setClientsCount] = useState(0);
  const [artistsCount, setArtistsCount] = useState(0);
  const [latestBookings, setLatestBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/admin/dashboard-data")
        // ,{
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        // }

        setClientsCount(res.data.clientCount);
        setArtistsCount(res.data.artistCount);
        setLatestBookings(res.data.latestBookings);
        setLoading(false);
      } catch (error) {
          console.error("Failed to fetch dashboard data", error.message);
      }
    };

    fetchDashboardData();
  },[]);

  // Mock latest bookings data
  // const latestBookings = [
  //   {
  //     id: 1,
  //     clientName: "John Doe",
  //     artistName: "DJ Mike",
  //     date: "2025-06-14",
  //     status: "Confirmed",
  //   },
  //   {
  //     id: 2,
  //     clientName: "Sarah Lee",
  //     artistName: "Singer Anna",
  //     date: "2025-06-13",
  //     status: "Pending",
  //   },
  //   {
  //     id: 3,
  //     clientName: "Rajesh Thapa",
  //     artistName: "Guitarist Ram",
  //     date: "2025-06-12",
  //     status: "Completed",
  //   },
  // ];

   if (loading) return <p className="p-6">Loading dashboard...</p>;
   
  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-auto">
        {/* Clients card */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Clients</h2>
            <p className="text-4xl font-bold text-purple-700">{clientsCount}</p>
          </div>
          <button
            onClick={() => navigate("/admin/clients")}
            className="mt-4 bg-purple-400 bg-gradient-to-b hover:bg-[#3ee6e6] text-black py-2 rounded-md transition"
          >
            Manage Clients
          </button>
        </div>

        {/* Artists card */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Artists</h2>
            <p className="text-4xl font-bold text-[#3ee6e6]">{artistsCount}</p>
          </div>
          <button
            onClick={() => navigate("/admin/artists")}
            className="mt-4 bg-[#5ff7f7] hover:bg-[#3ee6e6] text-black py-2 rounded-md transition"
          >
            Manage Artists
          </button>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Bookings</h2>
        {/* {latestBookings.length === 0 ? ( <p>No recent bookings found.</p>) : ( )} */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Client</th>
              <th className="border px-4 py-2 text-left">Artist</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {latestBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/admin/bookings/${booking.id}`)}>
                <td className="border px-4 py-2">{booking.clientName}</td>
                <td className="border px-4 py-2">{booking.artistName}</td>
                <td className="border px-4 py-2">{booking.date}</td>
                <td className={`border px-4 py-2 font-semibold ${
                  booking.status === "Confirmed" ? "text-green-600" :
                  booking.status === "Pending" ? "text-yellow-600" :
                  booking.status === "Completed" ? "text-gray-600" : ""
                }`}>
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
