import mongoose, { Schema, Types, Document } from "mongoose";

export type ProductCategory = "shirt" | "kurta";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";
export type Fit = "Regular" | "Slim" | "Loose" | "Oversized";
export type SleeveType = "Half Sleeve" | "Full Sleeve" | "Sleeveless";

interface IColor {
  name: string;
  hexCode: string;
}

interface IReview {
  userId: Types.ObjectId;
  name?: string;
  rating: number;
  comment?: string;
  createdAt?: Date;
}

export interface IVariant {
  _id?: Types.ObjectId;
  variantName: string;
  sku: string;
  color: { name: string; hexCode: string };
  size: Size;
  price: number;
  stock: number;
  images: string[];
}

export interface IProduct extends Document {
  productName: string;
  slug: string;
  description: string;
  shortDescription: string;

  // Base Price (lowest variant price usually, or display price)
  price: number;
  discountPrice: number;
  currency: string;

  stock: number; // Aggregate stock

  // Flattened for easy filtering
  category: ProductCategory;
  subCategory?: string; // For nested category
  parentCategory?: string;

  tags: string[];
  type: string;

  // Aggregates for filtering
  sizes: Size[];
  colors: IColor[];

  variants: IVariant[];

  fits: Fit[];
  sleeveType: SleeveType;
  neckType: string;
  fabric: string;
  materialCare: string;

  ratings: { average: number; count: number };
  reviews: IReview[];

  isFeatured: boolean;
  isPublished: boolean;
  isDeleted: boolean;

  seoTitle?: string;
  seoDescription?: string;
  imageCode?: string;

  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, unique: true },

    description: { type: String, required: true },
    shortDescription: { type: String, required: true },

    price: { type: Number, required: true }, // Display price
    discountPrice: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },

    stock: { type: Number, default: 0 }, // Aggregate stock

    category: { type: String, required: true },
    subCategory: { type: String },
    parentCategory: { type: String },

    tags: [String],
    type: { type: String, required: true },

    // Denormalized fields for faster filtering
    sizes: [{ type: String }],
    colors: [{ name: String, hexCode: String }],

    variants: [
      {
        variantName: String,
        sku: { type: String, required: true }, // Unique sparse?
        color: { name: String, hexCode: String },
        size: { type: String },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        images: [{ type: String }] // S3 URLs
      }
    ],

    fits: [{ type: String }],
    sleeveType: { type: String, required: true },
    neckType: { type: String, required: true },
    fabric: { type: String, required: true },
    materialCare: { type: String, required: true },

    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        name: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

    seoTitle: String,
    seoDescription: String,

    imageCode: String,
  },
  { timestamps: true }
);

productSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

// Indexes for performance
productSchema.index({ category: 1, price: 1, isPublished: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ "variants.sku": 1 });
productSchema.index({ productName: "text", description: "text" }); // Text search index

export default mongoose.model<IProduct>("Product", productSchema);
