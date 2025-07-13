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
  ChevronDown, ChevronUp 
} from "lucide-react";

const statusStyles = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="w-5 h-5 mr-1" />, label: "Pending" },
  accepted: { color: "bg-blue-100 text-blue-800", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Accepted" },
  booked: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-5 h-5 mr-1" />, label: "Booked" },
  completed: { color: "bg-gray-200 text-gray-800", icon: <Flag className="w-5 h-5 mr-1" />, label: "Completed" },
  rejected: { color: "bg-red-100 text-red-800", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Rejected" },
  cancelled: { color: "bg-red-600 text-white", icon: <XCircle className="w-5 h-5 mr-1" />, label: "Cancelled" },
};

const statusOptions = ["all", "pending", "accepted", "booked", "completed", "rejected", "cancelled"];

const sortOptions = [
  { value: "recentUpdated", label: "Sort by: Recently Updated" },
  { value: "priority", label: "Sort by: Priority" },
  { value: "newest", label: "Sort by: Newest Created" },
  { value: "oldest", label: "Sort by: Oldest Created" },
];


const ArtistBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
 const [sortBy, setSortBy] = useState("recentUpdated");
  const [expandedBookings, setExpandedBookings] = useState({});
  const [mapOpenBookingId, setMapOpenBookingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [sortBy]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let sortOrder = "desc"; // default descending

      if (sortBy === "oldest") sortOrder = "asc";
      else if (sortBy === "newest") sortOrder = "desc";
      else if (sortBy === "recentUpdated") sortOrder = "desc";
      else if (sortBy === "priority") sortOrder = "desc";

      const res = await axios.get(
        `/artist/bookings/my-bookings?sortBy=${sortBy}&sortOrder=${sortOrder}`,
        { withCredentials: true }
      );
      setBookings(res.data.bookings);
    } catch (err) {
      toast.error("Error loading bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/artist/bookings/${id}/status`, { status }, { withCredentials: true });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to update booking");
      console.error(err);
    }
  };

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
        Loading bookings...
      </div>
    );

  if (filteredBookings.length === 0)
    return (
      <>
        <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <p className="text-center mt-10 text-gray-500 text-lg">
          No bookings found for "{filterStatus}" status.
        </p>
      </>
    );

  const activeBooking = bookings.find((b) => b._id === mapOpenBookingId);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Booking Requests</h2>

      <div className="sticky top-0 z-10 bg-white pb-4 pt-2 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded text-indigo-700 border-indigo-600"
          >
            {sortOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredBookings.map((booking) => {
        const bookingName = booking.client?.username || "Client";
        const status = statusStyles[booking.status] || {
          color: "text-gray-700",
          icon: null,
          label: booking.status,
        };

        return (
          <div
            key={booking._id}
            className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-6 mb-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold flex items-center text-indigo-700">
               <img
                    src={booking.client.profilePicture?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={`${bookingName}'s profile`}
                    className="w-10 h-10 rounded-full mr-2 object-cover"
                  />
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
                  ? `${new Date(booking.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })} - ${new Date(booking.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
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
                className="text-md text-indigo-600 hover:underline font-medium flex items-center"
              >
                <Info className="w-4 h-4 mr-1" aria-label="More Info" />
                {expandedBookings[booking._id] ? "Hide Details" : "More"}
                {expandedBookings[booking._id] ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </button>

              {booking.contractUrl && (
                <div className="mt-4 flex flex-col md:flex-row justify-end gap-3">
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
                      View Signed Contract
                    </a>
                  )}
                  {/* View Payment Buttons */}
<div className="mt-3 flex gap-2 flex-wrap">
  {booking.payments?.some(p => p.paymentType === "advance") && (
    <button
      onClick={() => {
        const advancePayment = booking.payments.find(p => p.paymentType === "advance");
        window.open(`/payments/receipt/${advancePayment._id}`, "_blank");
      }}
      className="px-3 py-1.5 rounded bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition"
    >
      View Advance Payment
    </button>
  )}

  {booking.payments?.some(p => p.paymentType === "final") && (
    <button
      onClick={() => {
        const finalPayment = booking.payments.find(p => p.paymentType === "final");
        window.open(`/payments/receipt/${finalPayment._id}`, "_blank");
      }}
      className="px-3 py-1.5 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
    >
      View Final Payment
    </button>
  )}
</div>
  
                </div>
              )}
            </div>

            {expandedBookings[booking._id] && (
              <div className="mb-4 text-gray-700 text-sm space-y-2">
                {(booking.eventType || booking.eventDetails) && (
                  <div>
                    <p>
                      <strong>Type:</strong> {booking.eventType || "N/A"}
                    </p>
                    <p>
                      <strong>Details:</strong> {booking.eventDetails || "N/A"}
                    </p>
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
                  className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-400 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(booking._id, "rejected")}
                  className="bg-red-700 text-white px-5 py-2 rounded hover:bg-red-500 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}

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

export default ArtistBookings;

