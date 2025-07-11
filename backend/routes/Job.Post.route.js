import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createJobPost,
  getMyJobPosts,
  getJobPostById,
  deleteJobPost,getAllJobPosts
} from "../controllers/Job.Post.Controller.js";

const router = express.Router();

router.post("/", protectRoute, createJobPost);
router.get("/my", protectRoute, getMyJobPosts);
router.get("/:id", getJobPostById);
router.delete("/:id", protectRoute, deleteJobPost);
router.get("/", getAllJobPosts);

export default router;
