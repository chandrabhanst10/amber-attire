import { Router } from "express";
import {
    getCheckoutFromCart,
    getCheckoutForSingleProduct,
} from "../modules/checkout/checkout.controller";
import { authMiddleware as protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/cart", protect, getCheckoutFromCart);
router.get("/product/:productId/:quantity", protect, getCheckoutForSingleProduct);

export default router;
