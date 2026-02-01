import { Types } from "mongoose";
import Cart, { ICart } from "../../models/cart.model";
import Product, { IProduct } from "../../models/product.model";
import dotenv from "dotenv";
import { AddToCartPayload, UpdateCartItemPayload } from "./cart.types";
import { AppError } from "../../shared/utils/AppError";
import { InventoryService } from "../inventory/inventory.service";

dotenv.config();

export class CartService {
  /* ================= HELPERS ================= */

  static async findOrCreateCart(userId: Types.ObjectId): Promise<ICart> {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
        status: "active",
      });
    }

    return cart;
  }

  static async calculateCartTotals(cart: ICart): Promise<ICart> {
    await cart.populate<{ items: { productId: IProduct }[] }>(
      "items.productId"
    );

    let subTotal = 0;
    let discountTotal = 0;

    for (const item of cart.items) {
      const product = item.productId as unknown as IProduct;
      if (!product) continue;

      let price = product.price;
      let discounted = product.discountPrice || price; // Default to price if discountPrice 0/undefined implies no discount logic here? Original code used `??`.

      // If variant, override price
      if (item.variantId) {
        const variant = product.variants?.find(v => v._id?.toString() === item.variantId || v.sku === item.variantId);
        // Assuming variantId is _id. 
        if (variant) {
          price = variant.price;
          // Assuming no separate discount price for variants yet, or we use base product discount logic?
          discounted = price;
          if (product.discountPrice > 0 && product.price > 0) {
            // Apply percentage discount? No, original logic was absolute.
          }
        }
      }

      subTotal += price * item.quantity;
      discountTotal += (price - discounted) * item.quantity;
    }

    cart.subTotal = subTotal;
    cart.discountTotal = discountTotal; // Product level discounts

    // Coupon Logic
    cart.couponDiscount = 0;
    if (cart.couponCode) {
      try {
        const { couponService } = await import("../coupon/coupon.service");
        const result = await couponService.validateCoupon(cart.couponCode, subTotal - discountTotal);
        cart.couponDiscount = result.discountAmount;
      } catch (err) {
        // Invalid coupon (maybe expired), remove it
        cart.couponCode = undefined;
        cart.couponDiscount = 0;
      }
    }

    cart.taxTotal = 0;
    cart.shippingCost = 0;
    cart.grandTotal = Math.max(0, subTotal - discountTotal - cart.couponDiscount);

    return cart;
  }

  static async applyCoupon(userId: Types.ObjectId, code: string) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.couponCode = code;
    await this.calculateCartTotals(cart);
    await cart.save();
    return cart;
  }

  static async removeCoupon(userId: Types.ObjectId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.couponCode = undefined;
    cart.couponDiscount = 0;
    await this.calculateCartTotals(cart);
    await cart.save();
    return cart;
  }

  /* ================= ACTIONS ================= */

  static async addToCart(userId: Types.ObjectId, payload: AddToCartPayload) {
    const { productId, quantity = 1, variantId } = payload;

    const product = await Product.findById(productId);
    if (!product || product.isDeleted || !product.isPublished) {
      throw new AppError("Product not found", 404);
    }

    // Validate Status/Stock
    if (variantId) {
      const hasStock = await InventoryService.checkStock(variantId, quantity); // We should use InventoryService
      // But InventoryService expects atomic check? checkStock is read-only.
      if (!hasStock) throw new AppError("Insufficient stock for selected variant", 400);
    } else {
      // Flat product stock check? (Legacy)
      // If product has variants, `stock` might be sum. 
      if (product.variants && product.variants.length > 0 && !variantId) {
        throw new AppError("Please select a variant", 400);
      }
      if (product.stock < quantity) throw new AppError("Insufficient stock", 400);
    }

    const cart = await this.findOrCreateCart(userId);

    const existing = cart.items.find(
      (item) => item.productId.toString() === productId && item.variantId === variantId
    );

    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push(
        // @ts-ignore - mongoose typing issue with pushed item
        {
          productId: new Types.ObjectId(productId),
          variantId,
          quantity: Number(quantity),
          addedAt: new Date(),
        }
      );
    }

    await this.calculateCartTotals(cart);
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "productName price discountPrice stock variants",
    });

    return cart;
  }

  static async viewCart(userId: Types.ObjectId) {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "productName price discountPrice stock variants"
    );

    if (!cart) {
      return { items: [] };
    }

    const items = cart.items.map((item) => {
      const product = item.productId as unknown as IProduct;
      if (!product) return null;

      // Enhance with variant info
      let displayPrice = product.price;
      let displayImage = "";
      let variantName = "";
      let color = null;
      let size = null;

      if (item.variantId && product.variants) {
        const variant = product.variants.find(v => (v as any)._id?.toString() === item.variantId);
        if (variant) {
          displayPrice = variant.price;
          displayImage = variant.images?.[0] || "";
          variantName = variant.variantName;
          color = variant.color;
          size = variant.size;
        }
      }

      return {
        productId: product._id,
        productName: product.productName,
        quantity: item.quantity,
        variantId: item.variantId,
        price: displayPrice,
        image: displayImage,
        variantName,
        color,
        size
      };
    }).filter(Boolean);

    return { ...cart.toObject(), items };
  }

  static async updateItem(
    userId: Types.ObjectId,
    payload: UpdateCartItemPayload
  ) {
    if (payload.quantity < 1) {
      throw new AppError("Quantity must be >= 1", 400);
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);

    const item = cart.items.find(
      (i) => i.productId.toString() === payload.productId && i.variantId === payload.variantId
    );
    if (!item) throw new AppError("Item not found", 404);

    item.quantity = payload.quantity;

    // Check stock again? Yes.
    if (payload.variantId) {
      const hasStock = await InventoryService.checkStock(payload.variantId, payload.quantity);
      if (!hasStock) throw new AppError("Insufficient stock", 400);
    }

    await this.calculateCartTotals(cart);
    await cart.save();

    return cart;
  }

  static async removeItem(userId: Types.ObjectId, productId: string, variantId?: string) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = cart.items.filter(
      (i) => !(i.productId.toString() === productId && i.variantId === variantId)
    ) as any;

    await this.calculateCartTotals(cart);
    await cart.save();

    return cart;
  }

  static async clearCart(userId: Types.ObjectId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = [] as any;
    await cart.save();

    return cart;
  }

  // Legacy recalcTotals removed or can be kept/made private if needed
}
