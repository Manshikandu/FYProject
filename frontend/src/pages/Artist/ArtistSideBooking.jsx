import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";

const ArtistBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchBookings = async () => {
  try {
    const res = await axios.get("/artist/my-bookings", { withCredentials: true });
    setBookings(res.data.bookings);
  } catch (err) {
    toast.error("Error loading bookings");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
await axios.put(`/artist/${id}/status`, { status }, { withCredentials: true });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (err) {
      toast.error("Failed to update booking");
    }
  };

  if (loading) return <div className="p-6">Loading bookings...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="border p-4 rounded mb-4 shadow-sm bg-white"
          >
            <p><strong>Client:</strong> {booking.client?.name}</p>
            <p><strong>Email:</strong> {booking.client?.email}</p>
            <p><strong>Phone:</strong> {booking.client?.phone}</p>
<p><strong>Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {booking.status}</p>

            {booking.status === "pending" && (
              <div className="mt-3 flex gap-4">
                <button
                  onClick={() => updateStatus(booking._id, "accepted")}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(booking._id, "rejected")}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ArtistBookings;
