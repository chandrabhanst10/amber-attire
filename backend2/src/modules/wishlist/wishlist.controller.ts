import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import Wishlist from "../../models/wishlist.model";
import Product from "../../models/product.model";
import { AppError } from "../../shared/utils/AppError";

export const getWishlist = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate("products.productId");

    if (!wishlist) {
        wishlist = await Wishlist.create({ userId: req.user.id, products: [] });
    }

    res.json({ success: true, data: wishlist });
};

export const addToWishlist = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    const { productId, variantId } = req.body;

    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) {
        wishlist = await Wishlist.create({ userId: req.user.id, products: [] });
    }

    const exists = wishlist.products.find(
        (p) => p.productId.toString() === productId && p.variantId === variantId
    );

    if (exists) {
        return res.json({ success: true, message: "Already in wishlist", data: wishlist });
    }

    wishlist.products.push({ productId: product._id as any, variantId, addedAt: new Date() });
    await wishlist.save();

    res.json({ success: true, message: "Added to wishlist", data: wishlist });
};

export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    const { productId } = req.params;
    const { variantId } = req.query; // optional

    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) throw new AppError("Wishlist not found", 404);

    wishlist.products = wishlist.products.filter(
        (p) => !(p.productId.toString() === productId && (variantId ? p.variantId === variantId : true))
    ) as any;

    await wishlist.save();

    res.json({ success: true, message: "Removed from wishlist", data: wishlist });
};
