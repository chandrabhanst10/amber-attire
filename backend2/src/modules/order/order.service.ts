import Order from "../../models/order.model";
import Cart from "../../models/cart.model";
import Product from "../../models/product.model";
import razorpay from "../../config/razorpay";
import crypto from "crypto";
import { Types } from "mongoose";
import {
  BuyNowPayload,
  PlaceOrderPayload,
  OrderStatus,
} from "./order.types";
import { InventoryService } from "../inventory/inventory.service";

const ALLOWED_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

/* ================== HELPERS ================== */

export const generateOrderNumber = async (): Promise<string> => {
  const today = new Date();
  const datePart = today.toISOString().slice(0, 10).replace(/-/g, "");

  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const count = await Order.countDocuments({
    createdAt: { $gte: startOfDay },
  });

  return `ORD-${datePart}-${String(count + 1).padStart(4, "0")}`;
};

/* ================== BUY NOW ================== */

export const buyNowService = async (
  user: any,
  payload: BuyNowPayload
) => {
  const { productId, quantity, paymentMethod, shippingAddress } = payload;

  const product = await Product.findById(productId).select("price stock");
  if (!product) throw new Error("Product not found");
  if (product.stock < quantity) throw new Error("Insufficient stock");

  // Reserve stock
  product.stock -= quantity;
  await product.save();

  const orderNumber = await generateOrderNumber();
  const subTotal = product.price * quantity;

  const order = await Order.create({
    orderNumber,
    userId: user.id,
    email: user.email,
    phone: user.phone,
    items: [
      {
        productId: product._id,
        quantity,
        priceAtPurchase: product.price,
      },
    ],
    paymentMethod,
    paymentStatus: "pending",
    currentStatus: "pending",
    subTotal,
    taxTotal: 0,
    shippingCost: 0,
    grandTotal: subTotal,
    shippingAddress,
  });

  let razorpayOrder = null;

  if (paymentMethod !== "COD") {
    razorpayOrder = await razorpay.orders.create({
      amount: order.grandTotal * 100,
      currency: "INR",
      receipt: order.orderNumber,
    });
  }

  return { order, razorpayOrder };
};

/* ================== CART ORDER ================== */

export const placeOrderService = async (
  user: any,
  payload: PlaceOrderPayload
) => {
  const cart = await Cart.findOne({ userId: user.id });
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart empty");
  }

  const orderNumber = await generateOrderNumber();
  const items = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.productId).select("price stock variants");
    if (!product) throw new Error("Product not found");

    if (item.variantId) {
      // Use Inventory Service for atomic reservation
      const reserved = await InventoryService.reserveStock(item.variantId, item.quantity);
      if (!reserved) throw new Error(`Insufficient stock for item ${product.productName}`);

      // Also update aggregate stock for consistency? Optional but good.
      product.stock -= item.quantity;
      await product.save();
    } else {
      // Legacy or simple product
      if (product.stock < item.quantity) {
        throw new Error("Stock issue");
      }
      product.stock -= item.quantity;
      await product.save();
    }

    // Determine price (variant price if available)
    let price = product.price;
    if (item.variantId) {
      const variant = product.variants.find(v => v._id?.toString() === item.variantId);
      if (variant) price = variant.price;
    }

    items.push({
      productId: product._id,
      quantity: item.quantity,
      priceAtPurchase: price,
      variantId: item.variantId // Store variantId in order item too? Need to update Order Model mostly likely.
    });
  }

  const order = await Order.create({
    orderNumber,
    userId: user.id,
    email: user.email,
    phone: user.phone,
    items,
    paymentMethod: payload.paymentMethod,
    paymentStatus: "pending",
    currentStatus: "pending",
    subTotal: cart.subTotal,
    taxTotal: cart.taxTotal,
    shippingCost: cart.shippingCost,
    grandTotal: cart.grandTotal,
    shippingAddress: payload.shippingAddress,
  });

  const razorpayOrder = await razorpay.orders.create({
    amount: order.grandTotal * 100,
    currency: "INR",
    receipt: order.orderNumber,
  });

  cart.items.splice(0, cart.items.length);
  await cart.save();

  return { order, razorpayOrder };
};

/* ================== PAYMENT VERIFY ================== */

export const verifyPaymentService = async (
  orderId: string,
  paymentId: string,
  signature: string
) => {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(body)
    .digest("hex");

  if (expected !== signature) {
    throw new Error("Invalid signature");
  }

  await Order.findOneAndUpdate(
    { orderNumber: orderId },
    { paymentStatus: "paid", currentStatus: "confirmed" }
  );
};

/* ================== ADMIN ================== */

export const changeOrderStatusService = async (
  orderId: string,
  status: OrderStatus
) => {
  if (!ALLOWED_STATUSES.includes(status)) {
    throw new Error("Invalid order status");
  }

  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  order.currentStatus = status;
  order.statusHistory.push({
    status,
    updatedBy: "admin",
    updatedAt: new Date(),
  });

  await order.save();

  // Notify User
  if (order.userId) {
    const { notificationService } = await import("../notification/notification.service");
    notificationService.sendToUser(order.userId.toString(), "ORDER_UPDATE", {
      orderId,
      status,
      message: `Your order ${order.orderNumber} is now ${status}`
    });
  }

  return order;
};
