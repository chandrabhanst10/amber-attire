import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import { AdminActivityService } from "./adminActivity.service";

export const getAuditLogs = async (
  req: AuthRequest,
  res: Response
) => {
  const result = await AdminActivityService.getLogs(req.query);

  res.json({
    success: true,
    ...result,
  });
};

export const getAuditLogById = async (
  req: AuthRequest,
  res: Response
) => {
  const log = await AdminActivityService.getById(req.params.id);

  res.json({
    success: true,
    data: log,
  });
};
