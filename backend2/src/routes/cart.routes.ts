import express from "express";
import {
  addToCart,
  clearCart,
  removeCartItem,
  updateCartItem,
  viewCart,
} from "../modules/cart/cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/", viewCart);
router.post("/", addToCart);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);
router.delete("/", clearCart);

export default router;
