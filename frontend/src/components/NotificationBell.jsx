import { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { io } from "socket.io-client";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const { user } = useUserStore();
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const dropdownRef = useRef(null);
  const socket = useRef(null);
  const navigate = useNavigate();

const fetchNotifications = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/notifications", {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Error fetching notifications:", await res.text());
      setNotifications([]);  // reset to empty array on error
      return;
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.notifications)) {
      console.error("Expected notifications array but got:", data);
      setNotifications([]);
      return;
    }

    setNotifications(data.notifications); // <-- use data.notifications here
    // Optionally you can save hasMore if you implement pagination:
    // setHasMore(data.hasMore);
  } catch (err) {
    console.error("Failed to fetch notifications", err);
    setNotifications([]);
  }
};

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/notifications/${id}/read`, {
        method: "PUT",
         credentials: "include", 
      });
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  // Socket setup
  useEffect(() => {
    if (!user?._id) return;

    fetchNotifications();

    socket.current = io("http://localhost:3000");
    socket.current.emit("join", user._id);

    socket.current.on("notification", (data) => {
      console.log("New Notification:", data);
      fetchNotifications();
      setNewNotification(true); // trigger animation
      setTimeout(() => setNewNotification(false), 1000); // remove after 1s
    });

    return () => socket.current.disconnect();
  }, [user?._id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Defensive check here, before return JSX
  if (!Array.isArray(notifications)) {
    return <div>Loading notifications...</div>;
  }

  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.isRead).length
    : 0;
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="Notifications"
      >
        <Bell className="text-purple-700" size={22} />
        {unreadCount > 0 && (
          <span
            className={`absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center
              transition-transform duration-300 ease-in-out
              ${newNotification ? "scale-125 animate-pulse" : ""}
            `}
          >
            {unreadCount}
          </span>
        )}
      </button>

     {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-64 bg-white shadow-md border rounded z-50 max-h-80 flex flex-col">
    {/* Scrollable notifications container */}
    <ul className="overflow-y-auto max-h-64 flex-grow">
      {notifications.length === 0 ? (
        <li className="p-3 text-gray-500 text-sm text-center">
          No notifications
        </li>
      ) : (
        notifications.slice(0, 5).map((note) => (
          <li
            key={note._id}
            onClick={() => {
              markAsRead(note._id);
              setDropdownOpen(false);
              if (note.type === "booking") navigate("/my-bookings");
              // else if (note.type === "contract") navigate("/contracts");
              else if (note.type === "contract") {
      if (note.contractUrl) {
        window.open(note.contractUrl, "_blank"); // open PDF in new tab
      } else {
        // fallback to contracts page if no URL
        navigate("/contracts");
      }
    }
              else if (note.type === "payment") navigate("/payments");
              else navigate("/notifications");
            }}
            className={`p-3 text-sm cursor-pointer hover:bg-gray-100 ${
              !note.isRead ? "font-semibold bg-blue-50" : ""
            }`}
          >
            {note.message}
            <div className="text-xs text-gray-400">
              {new Date(note.createdAt).toLocaleString()}
            </div>
          </li>
        ))
      )}
    </ul>

    {/* Fixed "View All Notifications" button */}
    <div
      onClick={() => {
        setDropdownOpen(false);
        navigate("/notifications");
      }}
      className="p-2 text-center text-purple-600 hover:bg-gray-100 cursor-pointer border-t"
    >
      View All Notifications
    </div>
  </div>
)}
    </div>
  );
};

export default NotificationBell;
