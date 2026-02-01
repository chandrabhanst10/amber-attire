import express from "express";

import {
  login,
  logout,
  register,
  verifyOTP,
  verifyUser,
  getProfile,
  updateProfile,
  refreshToken,
  resendOTP,
} from "../modules/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/verify-email", verifyUser);
router.post("/refresh-token", refreshToken);

router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfile);

export default router;
