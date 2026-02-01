import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.types";
import { logger } from "../utils/logger";
import { env } from "../../config/env";

export const errorHandler = (
  err: any,
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (env.NODE_ENV === "development") {
    console.error("❌ Error Stack:", err.stack);
  } else {
    logger.error({ err }, "Global Error Handler caught exception");
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
