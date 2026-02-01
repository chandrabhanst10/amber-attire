import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getAdminStats,
} from "../modules/admin/admin.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { adminAuditMiddleware } from "../middlewares/adminAudit.middleware";

const router = express.Router();

// 🔒 Protect everything below
router.use(authMiddleware);
router.use(roleMiddleware("ADMIN"));
router.use(adminAuditMiddleware);

// Users
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

// Stats
router.get("/stats", getAdminStats);

export default router;
