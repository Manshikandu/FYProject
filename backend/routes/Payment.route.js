import express from "express";
import { createPaypalOrder, capturePaypalPayment } from "../controllers/Payment.controller.js";

const router = express.Router();

router.post("/paypal/create", createPaypalOrder);
router.get("/paypal/capture", capturePaypalPayment);

export default router;
