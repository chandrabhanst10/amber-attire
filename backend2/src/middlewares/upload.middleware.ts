import { Response, NextFunction } from "express";
import { appConfig } from "../config/app.config";
import { AuthRequest } from "../shared/types/auth.types";

export const validateUpload = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const file: any = Object.values(req.files)[0];

  const maxSize =
    appConfig.FILE_UPLOAD.MAX_SIZE_MB * 1024 * 1024;

  if (file.size > maxSize) {
    return res.status(400).json({
      success: false,
      message: "File size exceeds limit",
    });
  }

  next();
};
