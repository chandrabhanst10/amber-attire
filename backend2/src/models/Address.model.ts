import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Address document interface
 */
export interface IAddress extends Document {
  userId: Types.ObjectId;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  tag: "Home" | "Office" | "Other";
  isDefault: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Address schema
 */
const addressSchema = new Schema<IAddress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    tag: {
      type: String,
      enum: ["Home", "Office", "Other"],
      default: "Home",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Address model
 */
const Address = mongoose.model<IAddress>("Address", addressSchema);

export default Address;
