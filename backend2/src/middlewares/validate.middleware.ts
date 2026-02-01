import { Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AuthRequest } from "../shared/types/auth.types";

export const validate =
  (schema: ZodSchema, property: "body" | "query" | "params" = "body") =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.errors?.[0]?.message || "Validation failed",
      });
    }
  };
