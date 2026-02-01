import axios from "axios";
import Cart from "../../models/cart.model";
import Product from "../../models/product.model";
import dotenv from "dotenv";
import { Response } from "express";
import { CheckoutItem } from "./checkout.types";
import { Types } from "mongoose";
import { AuthRequest } from "../../shared/types/auth.types";

dotenv.config();

/* ================= FROM CART ================= */

export const getCheckoutFromCart = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const items: CheckoutItem[] = [];

    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.productId).lean();
      if (!product) continue;

      let images: string[] = [];

      // Legacy/Code-based Image Retrieval
      if (product.imageCode) {
        try {
          // If env provided, fetch from external service or construct URL
          if (process.env.GET_IMAGE_DOWNLOAD_URL) {
            const response = await axios.get(
              `${process.env.GET_IMAGE_DOWNLOAD_URL}${product.imageCode}`
            );
            if (response.data?.files) {
              images = response.data.files.map((f: any) => f.download_url);
            }
          }
        } catch (error) {
          console.error("Failed to fetch images for code", product.imageCode);
        }
      }

      // Variant Images (Merging both or preferring variants?)
      if (product.variants && product.variants.length > 0) {
        const variantImages = product.variants.flatMap(v => v.images);
        images = [...new Set([...images, ...variantImages])];
      }

      // Fallback

      // const discountPrice = product.discountPrice ?? product.price;

      const discountPrice = product.discountPrice ?? product.price;

      items.push({
        _id: cartItem._id as Types.ObjectId,
        productId: product._id as Types.ObjectId,
        productName: product.productName,
        price: product.price,
        discountPrice,
        stock: product.stock,
        imageCode: product.imageCode,
        images,
        quantity: cartItem.quantity,
        sizes: product.sizes,
      });
    }

    const subTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discountTotal = items.reduce(
      (sum, item) =>
        sum + (item.price - item.discountPrice) * item.quantity,
      0
    );

    const taxTotal = 0;
    const shippingCost = 0;
    const grandTotal = subTotal - discountTotal + taxTotal + shippingCost;

    return res.status(200).json({
      success: true,
      checkoutItems: {
        _id: cart._id,
        userId: cart.userId,
        items,
        subTotal,
        discountTotal,
        taxTotal,
        shippingCost,
        grandTotal,
        status: cart.status ?? "active",
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return res.status(500).json({ success: false, message });
  }
};


/* ================= SINGLE PRODUCT ================= */

export const getCheckoutForSingleProduct = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { productId, quantity } = req.params;
    const qty = Math.max(Number(quantity) || 1, 1);

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let images: string[] = [];

    if (product.imageCode && process.env.GET_IMAGE_DOWNLOAD_URL) {
      try {
        const response = await axios.get(
          `${process.env.GET_IMAGE_DOWNLOAD_URL}${product.imageCode}`
        );
        if (response.data?.files) {
          images = response.data.files.map((f: any) => f.download_url);
        }
      } catch (e) {
        // Ignore error
      }
    }

    if (product.variants && product.variants.length > 0) {
      const variantImages = product.variants.flatMap(v => v.images);
      images = [...new Set([...images, ...variantImages])];
    }

    const discountPrice = product.discountPrice ?? product.price;

    const item: CheckoutItem = {
      _id: product._id as Types.ObjectId,
      productId: product._id as Types.ObjectId,
      productName: product.productName,
      price: product.price,
      discountPrice,
      stock: product.stock,
      imageCode: product.imageCode,
      quantity: qty,
      images,
      sizes: product.sizes,
    };

    const subTotal = item.price * qty;
    const discountTotal = (item.price - item.discountPrice) * qty;
    const taxTotal = 0;
    const shippingCost = 0;
    const grandTotal = subTotal - discountTotal + taxTotal + shippingCost;

    return res.status(200).json({
      success: true,
      checkoutItems: {
        _id: product._id,
        userId: req.user.id,
        items: [item],
        subTotal,
        discountTotal,
        taxTotal,
        shippingCost,
        grandTotal,
        status: "active",
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return res.status(500).json({ success: false, message });
  }
};
