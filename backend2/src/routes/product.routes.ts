import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFilteredProducts,
  getProductById,
  updateProduct,
  getProductsByGender,
  getTaggedData,
  addOrUpdateReview,
  getProductReviews,
} from "../modules/catalog/product.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = express.Router();

// Public (or auth-only if you prefer)
router.get("/", getAllProducts);
router.get("/filter", getFilteredProducts);
router.get("/gender", getProductsByGender);
router.get("/tags", getTaggedData);
router.get("/:id", getProductById);

// Reviews
router.post("/:id/reviews", authMiddleware, addOrUpdateReview);
router.get("/:id/reviews", getProductReviews);

// Admin
router.post("/", authMiddleware, roleMiddleware("ADMIN"), createProduct);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), deleteProduct);

export default router;
