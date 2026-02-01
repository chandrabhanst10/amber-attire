import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email?: string;
  phone: string;
  password: string;
  role: "GUEST" | "USER" | "ADMIN" | "MANAGER";
  gender?: "Male" | "Female" | "Other";
  preferences?: {
    size?: string;
    shoeSize?: number;
  };
  isVerified: boolean;
  isActive: boolean;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["GUEST", "USER", "ADMIN", "MANAGER"],
      default: "USER",
      index: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    preferences: {
      size: { type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"] },
      shoeSize: { type: Number },
    },

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    profilePhoto: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Indexes
userSchema.index({ createdAt: -1 }); // For analytics (user growth)

export default mongoose.model<IUser>("User", userSchema);
