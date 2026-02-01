import { AdminActivityModel } from "../../models/adminActivity.model";


interface LogAdminActionInput {
  adminId: string;
  adminEmail: string;
  actionType: string;
  entityType: string;
  entityId: string;
  description: string;
  beforeState?: any;
  afterState?: any;
  ipAddress?: string;
  userAgent?: string;
}

export const logAdminAction = async (
  data: LogAdminActionInput
) => {
  try {
    await AdminActivityModel.create({
      ...data,
    });
  } catch (error) {
    // Never block main flow because of audit failure
    console.error("Admin audit log failed:", error);
  }
};
