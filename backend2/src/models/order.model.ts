import mongoose, { Schema, Types, Document } from "mongoose";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type PaymentMethod = "COD" | "ONLINE";

interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

export interface IOrder extends Document {
  orderNumber: string;

  userId?: Types.ObjectId;
  email?: string;
  phone?: string;

  items: IOrderItem[];

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  currentStatus: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    updatedAt: Date;
    updatedBy: "admin" | "user" | "system";
  }[];

  subTotal: number;
  taxTotal: number;
  shippingCost: number;
  grandTotal: number;

  shippingAddress: any;

  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },

    userId: { type: Schema.Types.ObjectId, ref: "User" },
    email: { type: String },
    phone: { type: String },

    items: { type: [orderItemSchema], required: true },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    currentStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "pending",
    },

    statusHistory: [
      {
        status: String,
        updatedAt: { type: Date, default: Date.now },
        updatedBy: {
          type: String,
          enum: ["admin", "user", "system"],
        },
      },
    ],

    subTotal: { type: Number, required: true },
    taxTotal: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },

    shippingAddress: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Indexes
orderSchema.index({ userId: 1, createdAt: -1 }); // Get user orders sorted by date
orderSchema.index({ currentStatus: 1 });
orderSchema.index({ createdAt: -1 }); // Global order list by date

export default mongoose.model<IOrder>("Order", orderSchema);
