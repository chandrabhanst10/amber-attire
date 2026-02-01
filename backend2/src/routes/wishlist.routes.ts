import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../modules/wishlist/wishlist.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:productId", removeFromWishlist);

export default router;
