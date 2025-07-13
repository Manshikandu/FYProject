import express from "express";
import { createReview, getClientReviews, getReviewsForArtist } from "../controllers/ClientReview.controller.js"
import { verifytoken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifytoken , createReview);
router.get("/me", verifytoken, getClientReviews);
router.get("/artist/:artistId", getReviewsForArtist);

export default router;  