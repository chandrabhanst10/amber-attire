import { Router } from "express";

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import addressRoutes from "./routes/address.routes";
import cartRoutes from "./routes/cart.routes";
import checkoutRoutes from "./routes/checkout.routes";
import orderRoutes from "./routes/order.routes";
import invoiceRoutes from "./routes/invoice.routes";
import paymentRoutes from "./routes/payments.routes";
import productRoutes from "./routes/product.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import couponRoutes from "./routes/coupon.routes";
import notificationRoutes from "./routes/notification.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/address", addressRoutes);
router.use("/cart", cartRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/orders", orderRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/payments", paymentRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/coupons", couponRoutes);
router.use("/notifications", notificationRoutes);

export default router;
