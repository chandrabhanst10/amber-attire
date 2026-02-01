import { Types } from "mongoose";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export interface BuyNowPayload {
  productId: string;
  quantity: number;
  paymentMethod: "COD" | "ONLINE";
  shippingAddress: any;
}

export interface PlaceOrderPayload {
  paymentMethod: "COD" | "ONLINE";
  shippingAddress: any;
}

export interface ChangeStatusPayload {
  status: OrderStatus;
}
