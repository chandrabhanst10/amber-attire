
import { AdminActivityModel, IAdminActivity } from "../../models/adminActivity.model";
import { AdminAuditPayload, AuditQuery } from "./adminActivity.types";
import { Types } from "mongoose";

export class AdminActivityService {
  /* ================= CREATE LOG ================= */

  static async log(payload: AdminAuditPayload) {
  const document: Partial<IAdminActivity> = {
    adminId: payload.adminId,
    adminEmail: payload.adminEmail,

    actionType: payload.actionType,
    entityType: payload.entityType,
    entityId: payload.entityId,

    description: payload.description,
    beforeState: payload.beforeState,
    afterState: payload.afterState,
    metadata: payload.metadata,

    ipAddress: payload.ipAddress,
    userAgent: payload.userAgent,
  };

  return AdminActivityModel.create(document);
}


  /* ================= GET LOGS ================= */

  static async getLogs(query: AuditQuery) {
    const {
      module,
      action,
      adminId,
      fromDate,
      toDate,
      page = 1,
      limit = 20,
    } = query;

    const filter: any = {};

    if (module) filter.module = module;
    if (action) filter.actionType = action;
    if (adminId) filter.adminId = adminId;

    if (fromDate || toDate) {
      filter.createdAt = {};
      if (fromDate) filter.createdAt.$gte = new Date(fromDate);
      if (toDate) filter.createdAt.$lte = new Date(toDate);
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      AdminActivityModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      AdminActivityModel.countDocuments(filter),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /* ================= GET SINGLE LOG ================= */

  static async getById(id: string) {
    return AdminActivityModel.findById(id);
  }
}
