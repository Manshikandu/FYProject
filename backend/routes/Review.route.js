import express from "express";
import { createReview, getClientReviews, getReviewsForArtist } from "../controllers/ClientReview.controller.js"
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createReview);
router.get("/me", protectRoute, getClientReviews);
router.get("/artist/:artistId", getReviewsForArtist);

export default router;  