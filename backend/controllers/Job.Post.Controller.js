import JobPost from "../models/JobPost.model.js";

// ✅ Create Job Post (Client Only)
export const createJobPost = async (req, res) => {
  try {
    const { title, description, date, time, location, budget, artistType } = req.body;

    if (!title || !description || !date || !time || !location?.city || !budget || !artistType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ message: "Date cannot be in the past" });
    }

    const newJobPost = new JobPost({
      client: req.user._id, // Link post to logged-in client
      title,
      description,
      date: selectedDate,
      time,
      location,
      budget,
      artistType,
      status: "pending",
    });

    await newJobPost.save();
    res.status(201).json(newJobPost);
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Job Posts for Logged-in Client
export const getMyJobPosts = async (req, res) => {
  try {
    const posts = await JobPost.find({ client: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Single Job Post by ID
export const getJobPostById = async (req, res) => {
  try {
    const post = await JobPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete a Job Post (Client Only)
export const deleteJobPost = async (req, res) => {
  try {
    const post = await JobPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//getLLjobposts
export const getAllJobPosts = async (req, res) => {
  try {
    const posts = await JobPost.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).json({ message: "Server error fetching job posts" });
  }
};

