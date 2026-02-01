import { Types } from "mongoose";
import { Size } from "../../models/product.model";
export interface CheckoutItem {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  productName: string;
  price: number;
  discountPrice: number;
  stock: number;
  imageCode?: string;
  images: string[];
  quantity: number;
  sizes?: Size[];
}
