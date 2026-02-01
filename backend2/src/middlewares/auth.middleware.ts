import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { AuthRequest } from "../shared/types/auth.types";

interface JwtPayload {
  id: string;
  role: "USER" | "ADMIN";
  email?: string;
  name?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!process.env.JWT_SECRET) return;
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    req.user = {
      id: new Types.ObjectId(decoded.id),
      role: decoded.role,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};
