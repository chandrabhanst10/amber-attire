import { Schema, model, Document, Types } from "mongoose";

/**
 * What kind of action the admin performed
 * (kept as string for flexibility)
 */
export type AdminActionType =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "STATUS_CHANGE"
  | "LOGIN"
  | "LOGOUT"
  | "REFUND"
  | "CUSTOM";

/**
 * Admin Activity Document Interface
 */
// models/adminActivity.model.ts

export interface IAdminActivity extends Document {
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


/**
 * Admin Activity Schema
 */
const AdminActivitySchema = new Schema<IAdminActivity>({
  adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  adminEmail: { type: String, required: true },

  actionType: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: String },

  description: { type: String, required: true },

  beforeState: Schema.Types.Mixed,
  afterState: Schema.Types.Mixed,

  metadata: { type: Schema.Types.Mixed }, // ✅ ADD THIS

  ipAddress: String,
  userAgent: String,
}, {
  timestamps: { createdAt: true, updatedAt: false },
});


/**
 * Compound indexes for fast audit queries
 */
AdminActivitySchema.index({ adminId: 1, createdAt: -1 });
AdminActivitySchema.index({ entityType: 1, entityId: 1 });

export const AdminActivityModel = model<IAdminActivity>(
  "AdminActivity",
  AdminActivitySchema
);
