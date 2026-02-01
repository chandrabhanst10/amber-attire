export * from './legacyTypes';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    isVerified?: boolean;
    phone?: string;
    phoneNumber?: string;
}

export interface Product {
    _id: string;
    productName: string;
    price: number;
    offerPrice?: number;
    featureImage: string;
    images?: string[];
    variants: {
        sku: string;
        color: { name: string; hexCode: string };
        size: string;
        stock: number;
        images: string[];
    }[];
}

export interface CartItem {
    productId: Product; // Populated
    variantId?: string;
    quantity: number;
}
