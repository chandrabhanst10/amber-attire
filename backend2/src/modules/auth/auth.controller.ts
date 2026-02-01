import { Response } from "express";
import { AuthService } from "./auth.service";
import { CommonAsyncHandler } from "../../shared/utils/CommonAsyncHandler";
import { AuthRequest } from "../../shared/types/auth.types";

export const register = CommonAsyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { user } = await AuthService.register(req.body);

  res.status(201).json({
    success: true,
    message: "Registration successful. OTP sent.",
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
    },
  });
});

export const verifyOTP = async (req: AuthRequest, res: Response) => {
  await AuthService.verifyOtp(req.body);
  res.json({ message: "OTP verified successfully" });
};

export const resendOTP = CommonAsyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await AuthService.resendOtp(req.body);
  res.json({ success: true, ...result });
});

export const login = async (req: AuthRequest, res: Response) => {
  const { user, accessToken, refreshToken } = await AuthService.login(req.body);

  // Secure Cookie Options
  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict" as const,
  };

  // Set Cookies
  res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15m
  res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7d

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
    accessToken, // Optional: useful for client-side storage if needed
  });
};

export const logout = async (req: AuthRequest, res: Response) => {
  const token = req.cookies.refreshToken;
  if (token) {
    // Optional: Call service to remove from Redis if implementation supports it
    // await AuthService.logout(req.user.id, token);
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("token"); // Legacy clear
  res.json({ message: "Logged out successfully" });
};

export const getProfile = CommonAsyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await AuthService.getProfile(req.user!.id);
  res.json(user);
});

export const updateProfile = CommonAsyncHandler(async (req: AuthRequest, res: Response) => {
  await AuthService.updateProfile(req.user!.id, req.body);
  res.json({ message: "Profile updated successfully" });
});

export const verifyUser = async (req: AuthRequest, res: Response) => {
  await AuthService.verifyEmail(req.body.token);
  res.json({ success: true, message: "Email verified" });
};

export const refreshToken = CommonAsyncHandler(async (req: AuthRequest, res: Response) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    res.status(401).json({ message: "Refresh token missing" });
    return;
  }

  const { accessToken, refreshToken: newRefreshToken } = await AuthService.refreshTokens(incomingRefreshToken);

  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict" as const,
  };

  res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.json({ message: "Tokens refreshed", accessToken });
});