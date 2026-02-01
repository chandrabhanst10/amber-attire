import { Types } from "mongoose";

export interface CreateProductPayload {
  productName: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  currency?: string;
  stock: number;
  sku?: string;
  category: string;
  tags: string[];
  type: string;
  sizes: string[];
  colors: { name: string; hexCode: string }[];
  fits: string[];
  sleeveType: string;
  neckType: string;
  fabric: string;
  materialCare: string;
  imageCode: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductFilterQuery {
  search?: string;
  category?: string;
  type?: string;
  sizes?: string;
  colors?: string;
  fits?: string;
  sleeveType?: string;
  neckType?: string;
  fabric?: string;
  tags?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
  inStock?:string|number
}

export interface ReviewPayload {
  rating: number;
  comment?: string;
}
