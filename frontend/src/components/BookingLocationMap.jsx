// // import React, { useState } from "react";
// // import Modal from "react-modal";
// // import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// // import L from "leaflet";


// // function calculateDistance(lat1, lon1, lat2, lon2) {
// //   // Haversine formula to calculate distance in km
// //   function toRad(x) {
// //     return (x * Math.PI) / 180;
// //   }
// //   const R = 6371; // Earth radius in km
// //   const dLat = toRad(lat2 - lat1);
// //   const dLon = toRad(lon2 - lon1);
// //   const a =
// //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //     Math.cos(toRad(lat1)) *
// //       Math.cos(toRad(lat2)) *
// //       Math.sin(dLon / 2) *
// //       Math.sin(dLon / 2);
// //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //   return R * c;
// // }

// // const BookingLocationMap = ({ isOpen, onRequestClose, bookingLocation }) => {
// //   const [artistPosition, setArtistPosition] = useState(null);
// //   const [distance, setDistance] = useState(null);

// //   const handleShowMyLocation = () => {
// //     if (!navigator.geolocation) {
// //       alert("Geolocation is not supported by your browser.");
// //       return;
// //     }
// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         const { latitude, longitude } = pos.coords;
// //         setArtistPosition([latitude, longitude]);

// //         const dist = calculateDistance(
// //           latitude,
// //           longitude,
// //           bookingLocation[1],
// //           bookingLocation[0]
// //         );
// //         setDistance(dist.toFixed(2)); // km with 2 decimals
// //       },
// //       () => alert("Unable to retrieve your location.")
// //     );
// //   };

// //   return (
// //     <Modal
// //       isOpen={isOpen}
// //       onRequestClose={onRequestClose}
// //       contentLabel="Booking Location"
// //       style={{
// //         content: { maxWidth: 450, margin: "auto", height: 400, padding: 10 },
// //       }}
// //     >
// //       <h2 className="text-lg font-semibold mb-2">Booking Location</h2>
// //       <div style={{ height: 300 }}>
// //         <MapContainer
// //           center={[bookingLocation[1], bookingLocation[0]]}
// //           zoom={13}
// //           style={{ height: "100%", width: "100%" }}
// //           scrollWheelZoom={false}
// //         >
// //           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //           <Marker position={[bookingLocation[1], bookingLocation[0]]}>
// //             <Popup>Booking Location</Popup>
// //           </Marker>

// //           {artistPosition && (
// //             <>
// //               <Marker position={artistPosition}>
// //                 <Popup>Your Location</Popup>
// //               </Marker>
// //               <Polyline positions={[artistPosition, [bookingLocation[1], bookingLocation[0]]]} color="blue" />
// //             </>
// //           )}
// //         </MapContainer>
// //       </div>

// //       <div className="mt-2 flex justify-between items-center">
// //         <button
// //           onClick={handleShowMyLocation}
// //           className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
// //         >
// //           Show My Location & Distance
// //         </button>
// //         <button
// //           onClick={onRequestClose}
// //           className="text-gray-600 px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
// //         >
// //           Close
// //         </button>
// //       </div>

// //       {distance && (
// //         <p className="mt-2 text-center text-sm text-gray-700">
// //           Distance to booking: <strong>{distance} km</strong>
// //         </p>
// //       )}
// //     </Modal>
// //   );
// // };

// // export default BookingLocationMap;


// import React, { useState } from "react";
// import Modal from "react-modal";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const toRad = (x) => (x * Math.PI) / 180;
//   const R = 6371;
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// const BookingLocationMap = ({ isOpen, onRequestClose, bookingLocation }) => {
//   const [artistPosition, setArtistPosition] = useState(null);
//   const [distance, setDistance] = useState(null);

//   const isValidLocation =
//     Array.isArray(bookingLocation) &&
//     bookingLocation.length === 2 &&
//     typeof bookingLocation[0] === "number" &&
//     typeof bookingLocation[1] === "number";

//   const handleShowMyLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setArtistPosition([latitude, longitude]);

//         if (isValidLocation) {
//           const dist = calculateDistance(
//             latitude,
//             longitude,
//             bookingLocation[1],
//             bookingLocation[0]
//           );
//           setDistance(dist.toFixed(2));
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
//         {isValidLocation ? (
//           <MapContainer
//             center={[bookingLocation[1], bookingLocation[0]]}
//             zoom={13}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <Marker position={[bookingLocation[1], bookingLocation[0]]}>
//               <Popup>Booking Location</Popup>
//             </Marker>

//             {artistPosition && (
//               <>
//                 <Marker position={artistPosition}>
//                   <Popup>Your Location</Popup>
//                 </Marker>
//                 <Polyline
//                   positions={[artistPosition, [bookingLocation[1], bookingLocation[0]]]}
//                   color="blue"
//                 />
//               </>
//             )}
//           </MapContainer>
//         ) : (
//           <div className="text-red-600 text-center mt-10">Invalid or missing booking location.</div>
//         )}
//       </div>

//<div className="mt-2 flex justify-between items-center">
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



import React, { useState } from "react";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

Modal.setAppElement("#root"); // call this once in your root entry file ideally

function calculateDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const BookingLocationMap = ({ isOpen, onRequestClose, bookingLocation }) => {
  const [artistPosition, setArtistPosition] = useState(null);
  const [distance, setDistance] = useState(null);

  //  don't render map if invalid coords
  if (
    !bookingLocation ||
    bookingLocation.length !== 2 ||
    bookingLocation.some((coord) => typeof coord !== "number")
  ) {
    return null;
  }

  const handleShowMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setArtistPosition([latitude, longitude]);

        const dist = calculateDistance(
          latitude,
          longitude,
          bookingLocation[0],
          bookingLocation[1]
        );
        setDistance(dist.toFixed(2)); // km with 2 decimals
      },
      () => alert("Unable to retrieve your location.")
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Booking Location"
      style={{
        content: { maxWidth: 450, margin: "auto", height: 400, padding: 10 },
      }}
    >
      <h2 className="text-lg font-semibold mb-2">Booking Location</h2>
      <div style={{ height: 300 }}>
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
              <Polyline positions={[artistPosition, bookingLocation]} color="blue" />
            </>
          )}
        </MapContainer>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <button
          onClick={handleShowMyLocation}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          Show My Location & Distance
        </button>
        <button
          onClick={onRequestClose}
          className="text-gray-600 px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
        >
          Close
        </button>
      </div>

      {distance && (
        <p className="mt-2 text-center text-sm text-gray-700">
          Distance to booking: <strong>{distance} km</strong>
        </p>
      )}
    </Modal>
  );
};

export default BookingLocationMap;