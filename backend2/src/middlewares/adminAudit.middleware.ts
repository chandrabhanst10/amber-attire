import { Response, NextFunction } from "express";
import { AuthRequest } from "../shared/types/auth.types";
import { kafkaService } from "../services/kafka/kafka.service";

export const adminAuditMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "ADMIN") {
    // Fire and forget - tracking the attempt
    const event = {
      action: "ADMIN_ACTION",
      method: req.method,
      endpoint: req.originalUrl,
      userId: req.user.id,
      userEmail: req.user.email,
      ipAddress: req.ip || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
      timestamp: new Date().toISOString()
    };

    // Send to Kafka
    kafkaService.send("admin-audit-logs", [event]);
  }

  next();
};
