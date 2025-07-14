
// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Modal.setAppElement("#root");

// const Routing = ({ artistPosition, bookingLocation }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!artistPosition || !bookingLocation) return;

//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(artistPosition[0], artistPosition[1]),
//         L.latLng(bookingLocation[0], bookingLocation[1]),
//       ],
//       routeWhileDragging: false,
//       show: false,
//       addWaypoints: false,
//       draggableWaypoints: false,
//       createMarker: () => null,
//     }).addTo(map);

//     return () => {
//       map.removeControl(routingControl);
//     };
//   }, [artistPosition, bookingLocation, map]);

//   return null;
// };

// const BookingLocationMap = ({ isOpen, onRequestClose, bookingLocation }) => {
//   const [artistPosition, setArtistPosition] = useState(null);
//   const [distance, setDistance] = useState(null);

//   if (
//     !bookingLocation ||
//     bookingLocation.length !== 2 ||
//     bookingLocation.some((coord) => typeof coord !== "number")
//   ) {
//     return null;
//   }

//   const handleShowMyLocation = async () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;
//         const userCoords = [latitude, longitude];
//         setArtistPosition(userCoords);

//         try {
//           const res = await fetch("http://localhost:5000/api/dis/distance", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               lat1: latitude,
//               lon1: longitude,
//               lat2: bookingLocation[0],
//               lon2: bookingLocation[1],
//             }),
//           });

//           const data = await res.json();
//           if (res.ok) {
//             setDistance(data.distance.toFixed(2));
//           } else {
//             console.error(data.message);
//           }
//         } catch (error) {
//           console.error("Error fetching distance:", error);
//         }
//       },
//       () => alert("Unable to retrieve your location.")
//     );
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Booking Location"
//       style={{
//         content: { maxWidth: 450, margin: "auto", height: 400, padding: 10 },
//       }}
//     >
//       <h2 className="text-lg font-semibold mb-2">Booking Location</h2>
//       <div style={{ height: 300 }}>
//         <MapContainer
//           center={bookingLocation}
//           zoom={13}
//           style={{ height: "100%", width: "100%" }}
//           scrollWheelZoom={false}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={bookingLocation}>
//             <Popup>Booking Location</Popup>
//           </Marker>

//           {artistPosition && (
//             <>
//               <Marker position={artistPosition}>
//                 <Popup>Your Location</Popup>
//               </Marker>
//               <Routing
//                 artistPosition={artistPosition}
//                 bookingLocation={bookingLocation}
//               />
//             </>
//           )}
//         </MapContainer>
//       </div>

//       <div className="mt-2 flex justify-between items-center">
//         <button
//           onClick={handleShowMyLocation}
//           className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
//         >
//           Show My Location & Distance
//         </button>
//         <button
//           onClick={onRequestClose}
//           className="text-gray-600 px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
//         >
//           Close
//         </button>
//       </div>

//       {distance && (
//         <p className="mt-2 text-center text-sm text-gray-700">
//           Distance to booking: <strong>{distance} km</strong>
//         </p>
//       )}
//     </Modal>
//   );
// };

// export default BookingLocationMap;


//////////////////////ors//////////////////
// import React, { useState, useEffect } from "react";
// import Modal from "react-modal";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
//   Polyline,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Modal.setAppElement("#root");


// export async function fetchUserToStart(userLocation, bookingLocation) {
//   console.log("🚀 Sending to /api/dis/route:", {
//     userLocation,
//     bookingLocation,
//   });

//   const res = await fetch("http://localhost:3000/api/dis/route", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify({ userLocation, bookingLocation }),
//   });

//   console.log("🔄 Response status:", res.status);

//   if (!res.ok) {
//     const error = await res.text();
//     console.error("❌ API error:", error);
//     return { coordinates: [], distance: null };
//   }

//   const data = await res.json();
//   console.log("✅ API response:", data);

//   return {
//     coordinates: data.features[0].geometry.coordinates.map(([lon, lat]) => [lat, lon]),
//     distance: data.features[0].properties.summary.distance / 1000,
//   };
// }


// const Routing = ({ routeCoords }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!routeCoords || routeCoords.length === 0) return;

//     const polyline = L.polyline(routeCoords, {
//       color: "blue",
//       weight: 4,
//     }).addTo(map);

//     map.fitBounds(polyline.getBounds());

//     return () => {
//       map.removeLayer(polyline);
//     };
//   }, [routeCoords, map]);

//   return null;
// };


// const BookingLocationMap = ({ isOpen, onRequestClose, bookingLocation }) => {
//   const [artistPosition, setArtistPosition] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [routeCoords, setRouteCoords] = useState([]);

//   if (
//     !bookingLocation ||
//     bookingLocation.length !== 2 ||
//     bookingLocation.some((coord) => typeof coord !== "number")
//   ) {
//     return null;
//   }

//   const handleShowMyLocation = async () => {
//   if (!navigator.geolocation) {
//     alert("Geolocation is not supported by your browser.");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     async (pos) => {
//       const { latitude, longitude } = pos.coords;
//       const userCoords = [latitude, longitude];
//       setArtistPosition(userCoords);

//       console.log("📍 User location:", userCoords);
//       console.log("📌 Booking location:", bookingLocation);

//       const result = await fetchUserToStart(userCoords, bookingLocation);

//       console.log("🗺️ Route fetch result:", result);

//       if (result.coordinates.length > 0) {
//         setRouteCoords(result.coordinates);
//         setDistance(result.distance.toFixed(2));
//       } else {
//         console.warn("⚠️ No route received.");
//       }
//     },
//     () => alert("Unable to retrieve your location.")
//   );
// };


//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Booking Location"
//       style={{
//         content: { maxWidth: 500, margin: "auto", height: 550, padding: 10 },
//       }}
//     >
//       <h2 className="text-lg font-semibold mb-2">Booking Location</h2>
//       <div style={{ height: 400 }}>
//         <MapContainer
//           center={bookingLocation}
//           zoom={13}
//           style={{ height: "100%", width: "100%" }}
//           scrollWheelZoom={false}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={bookingLocation}>
//             <Popup>Booking Location</Popup>
//           </Marker>

//           {artistPosition && (
//             <>
//               <Marker position={artistPosition}>
//                 <Popup>Your Location</Popup>
//               </Marker>
//               <Routing routeCoords={routeCoords} />
//             </>
//           )}
//         </MapContainer>
//       </div>

//       <div className="mt-2 flex justify-between items-center">
//         <button
//           onClick={handleShowMyLocation}
//           className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
//         >
//           Show My Location & Distance
//         </button>
//         <button
//           onClick={onRequestClose}
//           className="text-gray-600 px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
//         >
//           Close
//         </button>
//       </div>

//       {distance && (
//         <p className="mt-2 text-center text-sm text-gray-700">
//           Distance to booking: <strong>{distance} km</strong>
//         </p>
//       )}
//     </Modal>
//   );
// };

// export default BookingLocationMap;






import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

Modal.setAppElement("#root");

export async function fetchUserToStart(userLocation, bookingLocation) {
  console.log("🚀 Sending to /api/dis/route:", {
    userLocation,
    bookingLocation,
  });

  const res = await fetch("http://localhost:3000/api/dis/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userLocation, bookingLocation }),
  });

  console.log("🔄 Response status:", res.status);

  if (!res.ok) {
    const error = await res.text();
    console.error("❌ API error:", error);
    return { coordinates: [], distance: null };
  }

  const data = await res.json();
  console.log("✅ API response:", data);

  return {
    coordinates: data.features[0].geometry.coordinates.map(([lon, lat]) => [
      lat,
      lon,
    ]),
    distance: data.features[0].properties.summary.distance / 1000,
  };
}

const Routing = ({ routeCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (!routeCoords || routeCoords.length === 0) return;

    const polyline = L.polyline(routeCoords, {
      color: "blue",
      weight: 4,
    }).addTo(map);

    map.fitBounds(polyline.getBounds());

    return () => {
      map.removeLayer(polyline);
    };
  }, [routeCoords, map]);

  return null;
};

const BookingLocationMap = ({ isOpen, onRequestClose, bookingLocation }) => {
  const [artistPosition, setArtistPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  if (
    !bookingLocation ||
    bookingLocation.length !== 2 ||
    bookingLocation.some((coord) => typeof coord !== "number")
  ) {
    return null;
  }

  const handleShowMyLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const userCoords = [latitude, longitude];
        setArtistPosition(userCoords);

        const result = await fetchUserToStart(userCoords, bookingLocation);

        if (result.coordinates.length > 0) {
          setRouteCoords(result.coordinates);
          setDistance(result.distance.toFixed(2));
        } else {
          console.warn("⚠️ No route received.");
        }
      },
      () => alert("Unable to retrieve your location.")
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Booking Location"
      className="bg-white rounded-lg shadow-lg p-5 max-w-xl w-full mx-auto mt-10 outline-none"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Booking Location</h2>

      <div className="h-[400px] mt-4 rounded overflow-hidden">
        <MapContainer
          center={bookingLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={bookingLocation}>
            <Popup>Booking Location</Popup>
          </Marker>

          {artistPosition && (
            <>
              <Marker position={artistPosition}>
                <Popup>Your Location</Popup>
              </Marker>
              <Routing routeCoords={routeCoords} />
            </>
          )}
        </MapContainer>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleShowMyLocation}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Show My Location & Distance
        </button>
        <button
          onClick={onRequestClose}
          className="text-gray-700 border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Close
        </button>
      </div>

      {distance && (
        <p className="mt-4 text-center text-sm text-gray-700">
          Distance to booking: <strong>{distance} km</strong>
        </p>
      )}
    </Modal>
  );
};

export default BookingLocationMap;
