// // import React from 'react'

// // const ArtistPostPage = () => {
// //   return (
// //     <div>
// //       nkk
// //     </div>
// //   )
// // }

// // export default ArtistPostPage



// //import React from "react";
// //f1
// // const mockPosts = [
// //   {
// //     id: 1,
// //     clientName: "Emma Wilson",
// //     profileImage: "https://via.placeholder.com/50",
// //     job: "Live Performance",
// //     description: "Looking for a singer for an evening event.",
// //     date: "May 25, 2024",
// //     time: "8:00 PM",
// //     budget: "$500",
// //   },
// //   {
// //     id: 2,
// //     clientName: "Suresh Thapa",
// //     profileImage: "https://via.placeholder.com/50",
// //     job: "DJ Night",
// //     description: "Need a DJ for a corporate event.",
// //     date: "June 10, 2024",
// //     time: "9:00 PM",
// //     budget: "$700",
// //   },
// // ];

// // const ArtistPostPage = () => {
// //   return (
// //     <div className="min-h-screen bg-purple-50 font-sans">
// //       {/* Navbar */}
// //       <nav className="flex justify-between items-center p-4 bg-white shadow-md text-purple-700">
// //         <div className="font-bold text-xl">🎵 Everyartist</div>
// //         <div className="flex gap-6 items-center">
// //           <a href="/profile" className="hover:text-purple-900">Profile</a>
// //           <a href="/bookings" className="hover:text-purple-900">Bookings</a>
// //           {/* <div className="w-8 h-8 bg-gray-300 rounded-full"></div> */}

// //         </div>
// //       </nav>

// //       {/* Page Title */}
// //       <h1 className="text-3xl font-semibold text-center text-purple-800 my-8">
// //         Available Artist Bookings
// //       </h1>

// //       {/* Cards Container */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
// //         {mockPosts.map((post) => (
// //           <div key={post.id} className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3">
// //             <div className="flex items-center gap-3">
// //               <img src={post.profileImage} alt="Profile" className="w-12 h-12 rounded-full" />
// //               <div>
// //                 <h2 className="text-lg font-semibold text-gray-800">{post.clientName}</h2>
// //                 <p className="text-sm text-purple-600">{post.job}</p>
// //               </div>
// //             </div>
// //             <p className="text-gray-700">{post.description}</p>
// //             <div className="text-sm text-gray-500 flex justify-between">
// //               <span>{post.date}</span>
// //               <span>{post.time}</span>
// //             </div>
// //             <div className="flex justify-between items-center">
// //               <span className="text-purple-700 font-bold">{post.budget}</span>
// //               <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full transition">
// //                 Apply
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ArtistPostPage;


// //f2
// import React from "react";

// // const mockPosts = [
// //   {
// //     id: 1,
// //     clientName: "Emma Wilson",
// //     profileImage: "https://via.placeholder.com/50",
// //     job: "Live Performance",
// //     description: "Looking for a singer for an evening event.",
// //     date: "May 25, 2024",
// //     time: "8:00 PM",
// //     budget: "$500",
// //   },
// //   {
// //     id: 2,
// //     clientName: "Suresh Thapa",
// //     profileImage: "https://via.placeholder.com/50",
// //     job: "DJ Night",
// //     description: "Need a DJ for a corporate event.",
// //     date: "June 10, 2024",
// //     time: "9:00 PM",
// //     budget: "$700",
// //   },
// //   {
// //     id: 3,
// //     clientName: "Riya Sharma",
// //     profileImage: "https://via.placeholder.com/50",
// //     job: "Host Needed",
// //     description: "Need an anchor for wedding reception.",
// //     date: "July 4, 2024",
// //     time: "6:00 PM",
// //     budget: "$300",
// //   },
// // ];

// // const ArtistPostPage = () => {
// //   return (
// //     <div className="min-h-screen bg-purple-50 font-sans">
// //       {/* Navbar */}
// //       <nav className="flex justify-between items-center p-4 bg-white shadow-md text-purple-700">
// //         <div className="font-bold text-xl">🎵 Everyartist</div>
// //         <div className="flex gap-6 items-center">
// //           <a href="/profile" className="hover:text-purple-900">Profile</a>
// //           <a href="/bookings" className="hover:text-purple-900">Bookings</a>
// //           <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
// //         </div>
// //       </nav>

// //       {/* Title */}
// //       <h1 className="text-3xl font-semibold text-center text-purple-800 my-8">
// //         Artist Hiring Posts
// //       </h1>

// //       {/* Scrollable Card Row */}
// //       <div className="overflow-x-auto px-4">
// //         <div className="flex gap-6 w-max pb-6">
// //           {mockPosts.map((post) => (
// //             <div
// //               key={post.id}
// //               className="min-w-[400px] bg-white p-4 rounded-xl shadow-md flex flex-row items-center gap-6 hover:shadow-lg hover:scale-[1.01] transition-transform duration-300 ease-in-out"
// //             >
// //               {/* Profile Image */}
// //               <img
// //                 src={post.profileImage}
// //                 alt="Profile"
// //                 className="w-16 h-16 rounded-full object-cover"
// //               />

// //               {/* Info Section */}
// //               <div className="flex-1">
// //                 <div className="flex justify-between items-center">
// //                   <h2 className="text-lg font-semibold text-gray-800">{post.clientName}</h2>
// //                   <span className="text-purple-700 font-bold">{post.budget}</span>
// //                 </div>
// //                 <p className="text-sm text-purple-600 font-medium">{post.job}</p>
// //                 <p className="text-gray-700">{post.description}</p>
// //                 <div className="text-sm text-gray-500 mt-1">
// //                   {post.date} at {post.time}
// //                 </div>
// //               </div>

// //               {/* Apply Button */}
// //               <div>
// //                 <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full transition">
// //                   Apply
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ArtistPostPage;






//dd
// import ArtistPostCard from "./ArtistPostCard"; // Adjust the path accordingly

// const mockPosts = [
//   {
//     id: 1,
//     clientName: "Emma Wilson",
//     profileImage: "https://via.placeholder.com/50",
//     job: "Live Performance",
//     description: "Looking for a singer for an evening event at our corporate venue in Kathmandu.",
//     date: "May 25, 2024",
//     time: "8:00 PM",
//     budget: "$500",
//   },
//   {
//     id: 2,
//     clientName: "Suresh Thapa",
//     profileImage: "https://via.placeholder.com/50",
//     job: "DJ Night",
//     description: "Need a DJ with their own console for a youth club event in Pokhara.",
//     date: "June 10, 2024",
//     time: "9:00 PM",
//     budget: "$700",
//   },
//   {
//     id: 3,
//     clientName: "Riya Sharma",
//     profileImage: "https://via.placeholder.com/50",
//     job: "Host Needed",
//     description: "Need an energetic host for a traditional wedding reception in Lalitpur.",
//     date: "July 4, 2024",
//     time: "6:00 PM",
//     budget: "$300",
//   },
// ];

// const ArtistPostPage = () => {
//   return (
//     <div className="min-h-screen bg-purple-50 font-sans">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-4 bg-white shadow-md text-purple-700">
//         <div className="font-bold text-xl">🎵 Kala-Connect</div>
//         <div className="flex gap-6 items-center">
//           <a href="/profile" className="hover:text-purple-900">Profile</a>
//           <a href="/bookings" className="hover:text-purple-900">Bookings</a>
//           <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//         </div>
//       </nav>

//       {/* Title */}
//       <h1 className="text-3xl font-semibold text-center text-purple-800 my-8">
//         Clients Posts
//       </h1>

//       {/* Cards Container */}
//       <div className="max-w-5xl mx-auto px-4 pb-10 flex space-x-6 overflow-x-auto no-scrollbar">
//         {mockPosts.map((post) => (
//           <ArtistPostCard key={post.id} post={post} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ArtistPostPage;



//dynamicver
// import { useEffect, useState } from "react";
// import ArtistPostCard from "./ArtistPostCard"; // Keep this component to render each post
// import axios from "../lib/axios"; // Adjust path if needed
// import { toast } from "react-hot-toast";

// const ArtistPostPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all client job posts
//   useEffect(() => {
//     const fetchAllPosts = async () => {
//       try {
//         const res = await axios.get("/jobposts", { withCredentials: true }); // Adjust endpoint if different
//         setPosts(res.data);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to fetch posts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllPosts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-purple-50 font-sans">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-4 bg-white shadow-md text-purple-700">
//         <div className="font-bold text-xl">🎵 Kala-Connect</div>
//         <div className="flex gap-6 items-center">
//           <a href="/profile" className="hover:text-purple-900">Profile</a>
//           <a href="/bookings" className="hover:text-purple-900">Bookings</a>
//           <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//         </div>
//       </nav>

//       {/* Title */}
//       <h1 className="text-3xl font-semibold text-center text-purple-800 my-8">
//         Clients Posts
//       </h1>

//       {/* Posts */}
//       {loading ? (
//         <p className="text-center text-gray-500">Loading posts...</p>
//       ) : posts.length === 0 ? (
//         <p className="text-center text-gray-500">No job posts available.</p>
//       ) : (
//         <div className="max-w-5xl mx-auto px-4 pb-10 flex space-x-6 overflow-x-auto no-scrollbar">
//           {posts.map((post) => (
//             <ArtistPostCard key={post._id} post={post} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArtistPostPage;

import { useEffect, useState } from "react";
import ArtistPostCard from "./ArtistPostCard";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const ArtistPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all client job posts
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("/jobposts", { withCredentials: true });
        setPosts(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  const handleApply = async (postId) => {
    try {
      
      await axios.post(`/jobposts/${postId}/apply`, {}, { withCredentials: true });
      toast.success("Applied successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md text-purple-700">
        <div className="font-bold text-xl">🎵 Kala-Connect</div>
        <div className="flex gap-6 items-center">
          <a href="/profile" className="hover:text-purple-900">Profile</a>
         
          
        </div>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center text-purple-800 my-8">
        Client Job Posts
      </h1>

      {/* Posts */}
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No job posts available.</p>
      ) : (
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {posts.map((post) => (
            <ArtistPostCard key={post._id} post={post} onApply={handleApply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistPostPage;
