import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
    action: string;
    method: string;
    endpoint: string;
    userId?: string;
    userEmail?: string;
    ipAddress: string;
    userAgent: string;
    status?: number;
    details?: any;
    createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
    {
        action: { type: String, required: true },
        method: { type: String, required: true },
        endpoint: { type: String, required: true },
        userId: { type: String },
        userEmail: { type: String },
        ipAddress: { type: String },
        userAgent: { type: String },
        status: { type: Number },
        details: { type: Schema.Types.Mixed },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IAuditLog>("AuditLog", auditLogSchema);
