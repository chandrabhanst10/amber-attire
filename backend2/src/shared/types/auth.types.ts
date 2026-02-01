import { Request } from "express";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    id: Types.ObjectId;
    role: "USER" | "ADMIN";
    email?: string;
    name?: string;
    phone?: string;
  };
  adminAudit?: {
    ipAddress: string;
    userAgent: string;
  };
}
