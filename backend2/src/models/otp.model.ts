import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  phone: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<IOtp>({
  phone: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

export default mongoose.model<IOtp>("Otp", otpSchema);
