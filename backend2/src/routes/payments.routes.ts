import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../modules/payment/payments.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authMiddleware, createRazorpayOrder);
router.post("/verify", authMiddleware, verifyPayment);

// later: webhook route (NO auth)

export default router;
