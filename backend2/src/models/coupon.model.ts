import mongoose, { Schema, Document } from "mongoose";

export enum CouponType {
    PERCENTAGE = "PERCENTAGE",
    FLAT = "FLAT",
}

export interface ICoupon extends Document {
    code: string;
    type: CouponType;
    value: number; // Percentage or Flat Amount
    minOrderValue: number;
    maxDiscount?: number; // Cap for percentage
    expiryDate: Date;
    usageLimit: number; // Total usages across platform
    usedCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        type: {
            type: String,
            enum: Object.values(CouponType),
            required: true,
        },
        value: { type: Number, required: true },
        minOrderValue: { type: Number, default: 0 },
        maxDiscount: { type: Number },
        expiryDate: { type: Date, required: true },
        usageLimit: { type: Number, default: 1000 },
        usedCount: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<ICoupon>("Coupon", couponSchema);
