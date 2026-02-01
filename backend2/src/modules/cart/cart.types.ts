import { Types } from "mongoose";

export interface AddToCartPayload {
  productId: string;
  variantId?: string;
  quantity?: number;
}

export interface UpdateCartItemPayload {
  productId: string;
  variantId?: string; // Optional if we search by productId only (but ambiguous if multiple variants), should be required ideally. Cart logic usually needs it if multiple items exist.
  quantity: number;
}

export interface CartItemView {
  productId: Types.ObjectId;
  variantId?: string;
  quantity: number;
}

export interface CartTotals {
  subTotal: number;
  discountTotal: number;
  taxTotal: number;
  shippingCost: number;
  grandTotal: number;
}
