export interface IColorVariant {
  name?: string;
  hexCode?: string;
}

export interface IRating {
  average: number;
  count: number;
}

export interface IReview {
  userId?: string;      // changed to string (no ObjectId)
  name?: string;
  rating: number;       // 1–5
  comment?: string;
  createdAt: Date;
}

export interface IAuditUser {
  userId?: string;      // string instead of ObjectId
  name?: string;
}

export type CategoryType = "shirt" | "kurta";

export type SizeType =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "3XL";

export type FitType = "Regular" | "Slim" | "Loose" | "Oversized";

export type SleeveType =
  | "Half Sleeve"
  | "Full Sleeve"
  | "Sleeveless";

export interface IProduct {
  // Basic Info
  _id:string
  productName: string;
  slug: string;
  description: string;
  shortDescription: string;

  // Pricing
  price: number;
  discountPrice: number;
  currency: string;

  // Inventory
  stock: number;
  sku?: string;

  // Categories & Tags
  category: CategoryType;
  tags: string[];
  type: string;

  // Variants
  sizes: SizeType[];
  colors: IColorVariant[];
  fits: FitType[];
  sleeveType: SleeveType;
  neckType: string;
  fabric: string;
  materialCare: string;

  // Images
  imageCode: string;
  images:string[];

  // Ratings & Reviews
  ratings: IRating;
  reviews: IReview[];

  // Admin Flags
  isFeatured: boolean;
  isPublished: boolean;
  isDeleted: boolean;

  // SEO
  seoTitle?: string;
  seoDescription?: string;

  // Audit
  createdBy?: IAuditUser;
  updatedBy?: IAuditUser;

  // Timestamps (optional)
  createdAt?: Date;
  updatedAt?: Date;
  productColorCount:number
}
