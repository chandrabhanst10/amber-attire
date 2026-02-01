import express from "express";
import {
  placeOrder,
  verifyPayment,
  getUserOrders,
  getAllOrders,
  changeOrderStatus,
  buyNow,
} from "../modules/order/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = express.Router();

router.use(authMiddleware);

// User
router.post("/buy-now", buyNow);
router.post("/", placeOrder);
router.get("/my", getUserOrders);

// Payment verify (webhook-safe later)
router.post("/verify-payment", verifyPayment);

// Admin
router.get("/", roleMiddleware("ADMIN"), getAllOrders);
router.put("/:orderId/status", roleMiddleware("ADMIN"), changeOrderStatus);

export default router;
