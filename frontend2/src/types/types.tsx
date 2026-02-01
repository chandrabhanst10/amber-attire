import { ReactNode, MouseEventHandler, ChangeEvent } from 'react';

// --- From legacyTypes.ts ---

export interface IColorVariant {
    name?: string;
    hexCode?: string;
}

export interface IRating {
    average: number;
    count: number;
}

export interface IReview {
    userId?: string;
    name?: string;
    rating: number;
    comment?: string;
    createdAt: Date;
}

export interface IAuditUser {
    userId?: string;
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
    _id: string;
    productName: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    offerPrice?: number;
    discount?: number;
    featureImage: string;
    discountPrice: number;
    currency: string;
    stock: number;
    sku?: string;
    category: CategoryType;
    tags: string[];
    type: string;
    sizes: SizeType[];
    colors: IColorVariant[];
    fits: FitType[];
    sleeveType: SleeveType;
    neckType: string;
    fabric: string;
    materialCare: string;
    imageCode: string;
    images: string[];
    ratings: IRating;
    reviews: IReview[];
    isFeatured: boolean;
    isPublished: boolean;
    isDeleted: boolean;
    seoTitle?: string;
    seoDescription?: string;
    createdBy?: IAuditUser;
    updatedBy?: IAuditUser;
    createdAt?: Date;
    updatedAt?: Date;
    productColorCount: number;
}

// --- From index.ts (Renamed to avoid conflict if necessary, or kept if distinct) ---

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    isVerified?: boolean;
    phone?: string;
    phoneNumber?: string; // Alias sometimes used
}

// Keeping a separate Product interface if usages differ, but IProduct seems more complete.
// Based on index.ts, there was a simpler Product interface with variants.
export interface ProductVariant {
    sku: string;
    color: { name: string; hexCode: string };
    size: string;
    stock: number;
    images: string[];
}

export interface SimpleProduct { // Renamed from Product in index.ts to avoid conflict
    _id: string;
    productName: string;
    price: number;
    offerPrice?: number;
    featureImage: string;
    images?: string[];
    variants: ProductVariant[];
}

export interface CartItem {
    productId: IProduct | SimpleProduct; // Supporting both for now
    variantId?: string;
    quantity: number;
}

// --- From global.types.ts ---

export interface CustomButtonProps {
    type?: "button" | "submit" | "reset";
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    fullWidth?: boolean; // Made optional to match usage likely
    className?: string; // Often needed
}

export interface LoginPayload {
    email: string;
    password: string;
}

export type ValidatorFn = (value: any) => string;

export interface CustomInputProps {
    type?: string;
    label: string;
    value: any;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    name?: string;
    validator?: ValidatorFn | null;
    placeholder?: string;
}

// --- New Component Props Interfaces ---

export interface SideDrawerProps {
    isOpen: boolean;
    drawerHandler: () => void;
    isAuthenticated?: boolean;
}

export interface ProductCardProps {
    productImage: string;
    productTitle: string;
    productSubTitle: string;
    productPrice: number | string;
    productColorCount?: number;
    path: string;
}

export interface FilterDrawerProps {
    open: boolean;
    onClose: () => void;
    onApply: (filters: Record<string, string[]>) => void;
}
