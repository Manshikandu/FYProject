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

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center text-yellow-500">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        Loading your bookings...
      </div>
    );

  // Filter bookings by status
  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  if (filteredBookings.length === 0)
    return (
      <>
        <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <p className="text-center mt-10 text-gray-500 text-lg">No bookings found for "{filterStatus}" status.</p>
      </>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>

      <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

      {filteredBookings.map((booking) => {
        // Show opposite party name
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
            className="border rounded-lg shadow-md p-5 mb-6 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-3 flex items-center text-indigo-700">
              <User className="w-6 h-6 mr-2" />
              {bookingName}
            </h3>

            <div className="flex flex-wrap gap-4 text-gray-700 text-sm mb-3">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-1 text-indigo-500" />
                {new Date(booking.eventDate).toLocaleDateString()}
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-1 text-indigo-500" />
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

              {booking.location && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1 text-indigo-500" />
                  {booking.location}
                </div>
              )}

              {/* Show contact info of the other party */}
              {user.role === "client" && booking.artist?.email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-1 text-indigo-500" />
                  {booking.artist.email}
                </div>
              )}

              {user.role === "client" && booking.artist?.phone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-1 text-indigo-500" />
                  {booking.artist.phone}
                </div>
              )}

              {user.role === "artist" && booking.client?.email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-1 text-indigo-500" />
                  {booking.client.email}
                </div>
              )}

              {user.role === "artist" && booking.client?.phone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-1 text-indigo-500" />
                  {booking.client.phone}
                </div>
              )}
            </div>

            {(booking.eventType || booking.eventDetails) && (
              <div className="mb-3">
                <div className="flex items-center font-semibold text-indigo-600 mb-1">
                  <Info className="w-5 h-5 mr-2" />
                  Event Info
                </div>
                <p>
                  <strong>Type:</strong> {booking.eventType || "N/A"}
                </p>
                <p>
                  <strong>Details:</strong> {booking.eventDetails || "N/A"}
                </p>
              </div>
            )}

            {booking.notes && (
              <p className="italic text-gray-600 mb-3">Notes: "{booking.notes}"</p>
            )}

            <div className={`text-lg font-semibold flex items-center ${status.color}`}>
              {status.icon} {status.label}
            </div>



            
            {booking.status === "accepted" && (!booking.contractStatus || booking.contractStatus === "none") && (
  <button
    onClick={() => {
      // Navigate to contract generation page or open modal
      window.location.href = `/generate-contract/${booking._id}`;
      // Or if you want to call API directly, add your handler here
    }}
    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
  >
    Generate Contract
  </button>
)}
          </div>
        );
      })}
      
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

export default MyBookings;