import express from "express";
import {clientSignup, artistSignup, login, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/clientSignup", clientSignup);
router.post("/artistSignup", artistSignup);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/profile", protectRoute, getProfile);

export default router;  