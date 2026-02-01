import express from "express";
import {
    createCoupon,
    getAllCoupons,
    deleteCoupon,
    applyCoupon,
} from "../modules/coupon/coupon.controller";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/apply", authMiddleware, applyCoupon);

// Admin Routes
router.use(authMiddleware, isAdmin);
router.post("/", createCoupon);
router.get("/", getAllCoupons);
router.delete("/:id", deleteCoupon);

export default router;
