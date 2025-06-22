// //import React from "react";

// // const ArtistPostCard = ({ post }) => {
// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow-md flex gap-6 hover:shadow-lg transition-all duration-300">
// //       {/* Profile Image */}
// //       <img
// //         src={post.profileImage}
// //         alt="Profile"
// //         className="w-20 h-20 rounded-full object-cover border border-purple-200"
// //       />

// //       {/* Info Section */}
// //       <div className="flex flex-col flex-1 justify-between">
// //         <div>
// //           <div className="flex justify-between items-center mb-1">
// //             <h2 className="text-xl font-semibold text-gray-800">{post.clientName}</h2>
// //             <span className="text-purple-700 font-bold text-lg">{post.budget}</span>
// //           </div>
// //           <p className="text-purple-600 font-medium text-sm mb-1">{post.job}</p>
// //           <p className="text-gray-700 text-sm">{post.description}</p>
// //         </div>

// //         <div className="flex justify-between items-end mt-4">
// //           <span className="text-sm text-gray-500">{post.date} @ {post.time}</span>
// //           <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition">
// //             Apply
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ArtistPostCard;

// const ArtistPostCard = ({ post }) => {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md flex gap-6 hover:shadow-lg transition-all duration-300 min-h-[280px]">
//       {/* Profile Image */}
//       <img
//         src={post.profileImage}
//         alt="Profile"
//         className="w-24 h-24 rounded-full object-cover border border-purple-200"
//       />

//       {/* Info Section */}
//       <div className="flex flex-col flex-1 justify-between">
//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-xl font-semibold text-gray-800">{post.clientName}</h2>
//             <span className="text-purple-700 font-bold text-lg">{post.budget}</span>
//           </div>
//           <p className="text-purple-600 font-medium text-sm mb-2">{post.job}</p>
//           <p className="text-gray-700 text-sm">{post.description}</p>
//         </div>

//         <div className="flex justify-between items-end mt-6">
//           <span className="text-sm text-gray-500">{post.date} @ {post.time}</span>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition">
//             Apply
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtistPostCard;



//f3
// const ArtistPostCard = ({ post }) => {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md flex gap-6 hover:shadow-lg transition-all duration-300 min-h-[280px]">
//       {/* Profile Image */}
//       <img
//         src={post.profileImage}
//         alt="Profile"
//         className="w-24 h-24 rounded-full object-cover border border-purple-200"
//       />

//       {/* Info Section */}
//       <div className="flex flex-col flex-1 justify-between">
//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-xl font-semibold text-gray-800">{post.clientName}</h2>
//             <span className="text-purple-700 font-bold text-lg">{post.budget}</span>
//           </div>
//           <p className="text-purple-600 font-medium text-sm mb-2">{post.job}</p>
//           <p className="text-gray-700 text-sm">{post.description}</p>
//         </div>

//         <div className="flex justify-between items-end mt-6">
//           <span className="text-sm text-gray-500">{post.date} @ {post.time}</span>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition">
//             Apply
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtistPostCard;





// //f2
// //import React from "react";
// import { Link } from "react-router-dom";

// const ArtistPostCard = ({ post }) => {
//   return (
//     <div className="relative overflow-hidden h-60 w-full rounded-lg group shadow-md hover:shadow-lg transition-shadow duration-300">
//       <Link to={`/post/${post.id}`}>
//         <div className="w-full h-full cursor-pointer relative">
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-60 z-10" />
//           <img
//             src={post.profileImage}
//             alt={post.clientName}
//             className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//             loading="lazy"
//           />
//           <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
//             <h2 className="text-2xl font-bold">{post.clientName}</h2>
//             <p className="text-sm font-semibold text-purple-300">{post.job}</p>
//             <p className="text-sm mb-2 line-clamp-2">{post.description}</p>
//             <div className="flex justify-between items-center text-sm font-medium">
//               <span>{post.date} @ {post.time}</span>
//               <span className="bg-purple-700 px-3 py-1 rounded-full font-bold">${post.budget.replace("$", "")}</span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ArtistPostCard;



//fii

// const ArtistPostCard = ({ post }) => {
//   return (
//     <div className="min-w-[320px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col p-5 transform hover:scale-105">
//       {/* Profile & Budget */}
//       <div className="flex items-center justify-between mb-4">
//         <img
//           src={post.profileImage}
//           alt="Profile"
//           className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
//         />
//         <span className="text-purple-700 font-extrabold text-xl">{post.budget}</span>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col flex-1">
//         <h2 className="text-lg font-semibold text-gray-900 mb-1">{post.clientName}</h2>
//         <p className="text-purple-600 font-medium mb-2">{post.job}</p>
//         <p className="text-gray-700 flex-grow">{post.description}</p>
//       </div>

//       {/* Footer */}
//       <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-200">
//         <span className="text-sm text-gray-500">{post.date} @ {post.time}</span>
//         <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ArtistPostCard;


//Artistpostcard
// const ArtistPostCard = ({ post }) => {
//   return (
//     <div className="min-w-[300px] bg-white rounded-xl shadow-md p-5">
//       <p className="text-sm font-medium text-purple-700 mb-1">
//         Posted by: {post.client?.name || " Client"}
//       </p>
//       <div className="flex items-center gap-4 mb-4">
//         <img
//           src={post.client?.profileImage || "https://via.placeholder.com/50"}
//           alt="Client"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <p className="font-bold text-purple-700">{post.client?.name || "Client"}</p>
//           <p className="text-sm text-gray-500">{post.title}</p>
//         </div>
//       </div>
//       <p className="text-gray-600 mb-2 line-clamp-3">{post.description}</p>
//       <p className="text-sm text-gray-500"><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
//       <p className="text-sm text-gray-500"><strong>Time:</strong> {post.time}</p>
//       <p className="text-sm text-gray-500"><strong>Budget:</strong> Rs. {post.budget}</p>
//     </div>
//   );
// };

// export default ArtistPostCard;


//f
// const ArtistPostCard = ({ post, onApply }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
//       <p className="text-sm font-medium text-purple-700 mb-2">
//         Posted by: {post.client?.name || "Client"}
//       </p>

//       <div className="flex items-center gap-4 mb-4">
//         <img
//           src={post.client?.profileImage || "https://via.placeholder.com/50"}
//           alt="Client"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <p className="font-bold text-purple-700">{post.client?.name || "Client"}</p>
//           <p className="text-sm text-gray-500">{post.title}</p>
//         </div>
//       </div>

//       <p className="text-gray-600 mb-3 line-clamp-3">{post.description}</p>

//       <div className="text-sm text-gray-500 mb-3">
//         <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
//         <p><strong>Time:</strong> {post.time}</p>
//         <p><strong>Location:</strong> {post.location?.city}, {post.location?.state}</p>
//         <p><strong>Budget:</strong> Rs. {post.budget}</p>
//       </div>

//       <button
//         onClick={() => onApply(post._id)}
//         className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
//       >
//         Apply
//       </button>
//     </div>
//   );
// };

// export default ArtistPostCard;


//ff2
const ArtistPostCard = ({ post, onApply }) => {
  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <div>
        <p className="text-sm font-medium text-purple-700 mb-2">
          Posted by: {post.client?.name || "Client"}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={post.client?.profileImage || "https://via.placeholder.com/50"}
            alt="Client"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-purple-700">{post.client?.name || "Client"}</p>
            <p className="text-sm text-gray-500">{post.title}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-3 line-clamp-3">{post.description}</p>

        <div className="text-sm text-gray-500 mb-3">
          <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {post.time}</p>
          <p><strong>Location:</strong> {post.location?.city}, {post.location?.state}</p>
          <p><strong>Budget:</strong> Rs. {post.budget}</p>
        </div>
      </div>

      <button
        onClick={() => onApply(post._id)}
        className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        Apply
      </button>
    </div>
  );
};

export default ArtistPostCard;


