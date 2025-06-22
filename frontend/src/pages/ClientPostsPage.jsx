// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../lib/axios";
// import { useUserStore } from "../stores/useUserStore";
// import { Button } from "../components/ui/Button";
// import toast from "react-hot-toast";

// const ClientPostsPage = () => {
//   const { user, checkAuth, checkingAuth } = useUserStore();
//   const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   useEffect(() => {
//     if (!checkingAuth) {
//       if (!user || user.role !== "client") {
//         navigate("/login", { replace: true });
//       }
//     }
//   }, [checkingAuth, user, navigate]);

//   useEffect(() => {
//     if (!checkingAuth && user && user.role === "client") {
//       const fetchPosts = async () => {
//         try {
//           const res = await axios.get("/jobposts/my");
//           setPosts(res.data);

//           if (res.data.length === 0) {
//             navigate("/create-post", { replace: true });
//           }
//         } catch (error) {
//           toast.error(error.response?.data?.message || "Error fetching posts");
//         }
//       };

//       fetchPosts();
//     }
//   }, [checkingAuth, user, navigate]);

//   const handleDelete = useCallback(
//     async (postId) => {
//       try {
//         await axios.delete(`/jobposts/${postId}`);
//         setPosts((prev) => prev.filter((post) => post._id !== postId));
//         toast.success("Post deleted successfully");
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Error deleting post");
//       }
//     },
//     []
//   );

//   if (checkingAuth) {
//     return <div className="text-center p-10">Checking authentication...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-25 px-4 relative">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">My Posts</h2>
//       </div>

//       {posts.length === 0 ? (
//         <p className="text-center text-gray-500">No posts found.</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post._id} className="border rounded p-4 mb-4">
//             <h3 className="font-semibold">{post.title}</h3>
//             <p className="text-gray-600 text-sm">{post.description}</p>
//             <p className="text-sm text-gray-600 mb-1">
//               <strong>Date:</strong>{" "}
//               {post.date ? new Date(post.date).toLocaleDateString() : "N/A"}
//             </p>

//             <p className="text-sm text-gray-600 mb-1">
//               <strong>Time:</strong> {post.time || "N/A"}
//             </p>

//             <p className="text-sm text-gray-600 mb-1">
//               <strong>Location:</strong>{" "}
//               {post.location
//                 ? `${post.location.city}, ${
//                     post.location.state ? post.location.state + ", " : ""
//                   }${post.location.country}`
//                 : "N/A"}
//             </p>

//             <p className="text-sm text-gray-500 mb-2">
//               Status:{" "}
//               <span
//                 className={
//                   post.status === "completed"
//                     ? "text-green-600"
//                     : "text-yellow-600"
//                 }
//               >
//                 {post.status}
//               </span>
//             </p>
//             <Button
//               variant="secondary"
//               className=""
//               onClick={() => handleDelete(post._id)}
//             >
//               Delete Post
//             </Button>
//           </div>
//         ))
//       )}

 
//       <div
//         className="fixed right-6 z-50"
//         style={{ top: "100px" }} >
//         <Button
//           onClick={() => navigate("/create-post")}
//           className="flex items-center space-x-2"
//           variant="primary"
//           aria-label="Add Post"
//         >
//           <span className="text-xl font-bold leading-none select-none">+</span>
//           <span>Add Post</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ClientPostsPage;
  

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { Trash2, PlusCircle } from "lucide-react";

const ClientPostsPage = () => {
  const { user } = useUserStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch client posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/jobposts/my", { withCredentials: true });
        setPosts(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "client") {
      fetchPosts();
    }
  }, [user]);

  // Delete handler
  const handleDelete = useCallback(async (postId) => {
    try {
      await axios.delete(`/jobposts/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting post");
    }
  }, []);

  if (!user || user.role !== "client") {
    return <div className="text-center p-10 text-lg font-semibold">Loading your job posts...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800">My Job Posts</h1>
        <button
          onClick={() => navigate("/createpost")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Post
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No job posts yet. Start by creating one.</p>
          <button
            onClick={() => navigate("/createpost")}
            className="mt-4 inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Create Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-xl border border-gray-100 p-5 transition-transform hover:scale-[1.02] hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-purple-700 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>

              <div className="text-sm text-gray-500 mb-3">
                <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {post.time}</p>
                <p><strong>Location:</strong> {post.location?.city}, {post.location?.state}</p>
              </div>

              {post.artistType?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.artistType.map((type, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-green-600 font-semibold">Rs. {post.budget}</span>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientPostsPage;
