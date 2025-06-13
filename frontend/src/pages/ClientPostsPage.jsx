import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";

const ClientPostsPage = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!checkingAuth) {
      if (!user || user.role !== "client") {
        navigate("/login", { replace: true });
      }
    }
  }, [checkingAuth, user, navigate]);

  useEffect(() => {
    if (!checkingAuth && user && user.role === "client") {
      const fetchPosts = async () => {
        try {
          const res = await axios.get("/jobposts/my");
          setPosts(res.data);

          if (res.data.length === 0) {
            navigate("/create-post", { replace: true });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Error fetching posts");
        }
      };

      fetchPosts();
    }
  }, [checkingAuth, user, navigate]);

  const handleDelete = useCallback(
    async (postId) => {
      try {
        await axios.delete(`/jobposts/${postId}`);
        setPosts((prev) => prev.filter((post) => post._id !== postId));
        toast.success("Post deleted successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting post");
      }
    },
    []
  );

  if (checkingAuth) {
    return <div className="text-center p-10">Checking authentication...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-25 px-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Posts</h2>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border rounded p-4 mb-4">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.description}</p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Date:</strong>{" "}
              {post.date ? new Date(post.date).toLocaleDateString() : "N/A"}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Time:</strong> {post.time || "N/A"}
            </p>

            <p className="text-sm text-gray-600 mb-1">
              <strong>Location:</strong>{" "}
              {post.location
                ? `${post.location.city}, ${
                    post.location.state ? post.location.state + ", " : ""
                  }${post.location.country}`
                : "N/A"}
            </p>

            <p className="text-sm text-gray-500 mb-2">
              Status:{" "}
              <span
                className={
                  post.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {post.status}
              </span>
            </p>
            <Button
              variant="secondary"
              className=""
              onClick={() => handleDelete(post._id)}
            >
              Delete Post
            </Button>
          </div>
        ))
      )}

 
      <div
        className="fixed right-6 z-50"
        style={{ top: "100px" }} >
        <Button
          onClick={() => navigate("/create-post")}
          className="flex items-center space-x-2"
          variant="primary"
          aria-label="Add Post"
        >
          <span className="text-xl font-bold leading-none select-none">+</span>
          <span>Add Post</span>
        </Button>
      </div>
    </div>
  );
};

export default ClientPostsPage;
  