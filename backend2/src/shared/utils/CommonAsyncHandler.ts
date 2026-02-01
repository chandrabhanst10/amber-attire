// src/utils/catchAsync.ts
import { Request, Response, NextFunction, RequestHandler } from "express";

export const CommonAsyncHandler =
  (fn: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
