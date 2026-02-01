import mongoose, { Schema, Document, Types } from "mongoose";

/* ===================== TYPES ===================== */

export interface ICartItem {
  productId: Types.ObjectId;
  variantId?: string; // Optional for backward compatibility, but should be required for new items
  quantity: number;
  addedAt: Date;
}

export interface ICart extends Document {
  userId: Types.ObjectId;

  // ✅ MUST be DocumentArray
  items: mongoose.Types.DocumentArray<ICartItem>;

  subTotal: number;
  discountTotal: number;
  couponCode?: string;      // Applied coupon code
  couponDiscount: number;   // Discount from coupon
  taxTotal: number;
  shippingCost: number;
  grandTotal: number;

  status: "active" | "abandoned" | "converted" | "expired";

  createdAt: Date;
  updatedAt: Date;
}

/* ===================== SCHEMA ===================== */

const cartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variantId: {
      type: String,
      required: false // Should be true eventually
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    subTotal: { type: Number, default: 0 },
    discountTotal: { type: Number, default: 0 },
    couponCode: { type: String },
    couponDiscount: { type: Number, default: 0 },
    taxTotal: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["active", "abandoned", "converted", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;
