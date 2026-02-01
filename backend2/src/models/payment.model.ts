import mongoose, { Schema, Types, Document } from "mongoose";

export interface IPaymentProduct {
  productId: Types.ObjectId;
  variantId?: string; // Add variantId support
  quantity: number;
  price: number;
  name?: string;
}

export interface IPayment extends Document {
  orderId?: string;
  userId: Types.ObjectId;

  amount: number;
  currency: string;

  paymentId?: string;
  signature?: string;

  status: "created" | "paid" | "failed";

  products: IPaymentProduct[];

  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    paymentId: String,
    signature: String,

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },

    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantId: { type: String }, // Optional variantId
        name: String,
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", paymentSchema);
