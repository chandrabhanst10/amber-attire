import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWishlist extends Document {
    userId: Types.ObjectId;
    products: {
        productId: Types.ObjectId;
        variantId?: string;
        addedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const wishlistSchema = new Schema<IWishlist>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                variantId: { type: String },
                addedAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model<IWishlist>("Wishlist", wishlistSchema);
