import Order from "../../models/order.model";
import Product from "../../models/product.model";
import User from "../../models/user.model";
import dayjs from "dayjs";
import { AdminStats, UpdateUserRolePayload } from "./admin.types";
import { AppError } from "../../shared/utils/AppError";


export class AdminService {
  /* ================= DASHBOARD ================= */

  static async getAdminStats(): Promise<AdminStats> {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const totalRevenueAgg = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, revenue: { $sum: "$grandTotal" } } },
    ]);

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$currentStatus", count: { $sum: 1 } } },
    ]);

    /* ---------- Daily Sales (7 days) ---------- */
    const rawDailySales = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          total: { $sum: "$grandTotal" },
          count: { $sum: 1 },
        },
      },
    ]);

    const dailySales = [];
    for (let i = 6; i >= 0; i--) {
      const date = dayjs().subtract(i, "day");
      const found = rawDailySales.find(
        (s) =>
          s._id.year === date.year() &&
          s._id.month === date.month() + 1 &&
          s._id.day === date.date()
      );

      dailySales.push({
        date: date.format("YYYY-MM-DD"),
        total: found ? found.total : 0,
        count: found ? found.count : 0,
      });
    }

    /* ---------- Monthly Sales (12 months) ---------- */
    const rawMonthlySales = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$grandTotal" },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlySales = [];
    for (let i = 11; i >= 0; i--) {
      const date = dayjs().subtract(i, "month");
      const found = rawMonthlySales.find(
        (s) =>
          s._id.year === date.year() &&
          s._id.month === date.month() + 1
      );

      monthlySales.push({
        month: date.format("YYYY-MM"),
        total: found ? found.total : 0,
        count: found ? found.count : 0,
      });
    }

    /* ---------- Top Selling Products (by Quantity) ---------- */
    const topProductsRaw = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.quantity", "$items.priceAtPurchase"] } },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 1,
          productName: "$product.productName",
          image: { $arrayElemAt: ["$product.variants.images", 0] }, // Grab first variant image
          totalSold: 1,
          revenue: 1,
        },
      },
    ]);

    /* ---------- Low Stock Alert (< 10) ---------- */
    // Find products where ANY variant has stock < 10
    const lowStockProducts = await Product.find({
      "variants.stock": { $lt: 10 }
    }).select("productName variants.sku variants.stock variants.size variants.color").limit(10);

    return {
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue: totalRevenueAgg[0]?.revenue || 0,
      ordersByStatus,
      dailySales,
      monthlySales,
      topProducts: topProductsRaw,
      lowStockProducts,
    };
  }

  /* ================= USERS ================= */

  static async getAllUsers() {
    return User.find().select("-password");
  }

  static async getUserById(userId: string) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async updateUserRole(
    userId: string,
    payload: UpdateUserRolePayload
  ) {
    if (!["USER", "ADMIN"].includes(payload.role)) {
      throw new AppError("Invalid role", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    user.role = payload.role;
    await user.save();

    return true;
  }

  static async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return true;
  }
}
