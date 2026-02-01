// src/@types/express/index.d.ts

import { Types } from "mongoose";



declare global {
  namespace Express {
     interface AuthRequest {
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
  }
}
export {};
