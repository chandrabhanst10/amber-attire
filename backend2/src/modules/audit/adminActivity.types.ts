import { Types } from "mongoose";
import { AuditAction, AuditModule } from "./audit.constants";

export interface AdminAuditPayload {
  adminId: Types.ObjectId;
  adminEmail: string;

  actionType: string;
  entityType: string;
  entityId?: string;

  description: string;

  beforeState?: Record<string, any>;
  afterState?: Record<string, any>;

  metadata?: Record<string, any>; // ✅ ADD THIS

  ipAddress?: string;
  userAgent?: string;

  createdAt: Date;
}


export interface AuditQuery {
  module?: AuditModule;
  action?: AuditAction;
  adminId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}
