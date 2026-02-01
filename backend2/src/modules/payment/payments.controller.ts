import crypto from "crypto";
import razorpay from "../../config/razorpay";
import Order from "../../models/order.model";
import dotenv from 'dotenv';
import Payment from "../../models/payment.model";
import Product, { IProduct } from "../../models/product.model";
import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import { InventoryService } from "../inventory/inventory.service";

dotenv.config();

export const createRazorpayOrder = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Expecting variantId in payload if applicable
    const { products } = req.body; // Array of { _id, variantId?, quantity, ... }
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No products provided" });
    }

    // ✅ Check stock (Variants + Legacy)
    for (const item of products) {
      if (item.variantId) {
        const inStock = await InventoryService.checkStock(item.variantId, item.quantity);
        if (!inStock) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product ${item.productName || item._id} (Variant: ${item.variantId})`
          });
        }
      } else {
        // Legacy logic
        const product = await Product.findById(item._id).select("stock");
        if (!product) {
          return res.status(404).json({ success: false, message: "Product not found" });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product ${item._id}`,
          });
        }
      }
    }

    // ✅ Calculate amount
    const totalAmount = products.reduce(
      (sum: any, p: any) => sum + (p.discountPrice ?? p.price) * p.quantity,
      0
    );

    // ✅ Razorpay order
    const razorOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    // ✅ Save payment (With variant info)
    const payment = new Payment({
      orderId: razorOrder.id,
      userId: req.user.id,
      amount: totalAmount,
      currency: "INR",
      products: products.map((p: any) => ({
        productId: p._id,
        variantId: p.variantId,
        name: p.productName,
        price: p.price,
        quantity: p.quantity,
      })),
      status: "created",
    });

    await payment.save();

    res.status(200).json({
      success: true,
      orderId: razorOrder.id,
      amount: razorOrder.amount,
      currency: razorOrder.currency,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    res.status(500).json({ success: false, message });
  }
};

export const verifyPayment = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { orderId, paymentId, signature } = req.body;

    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    // ✅ Verify signature
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ Update payment
    payment.paymentId = paymentId;
    payment.signature = signature;
    payment.status = "paid";
    await payment.save();

    // ✅ Deduct stock atomically (Handling Variants)
    for (const item of payment.products) {
      if (item.variantId) {
        // Use InventoryService
        const success = await InventoryService.reserveStock(item.variantId, item.quantity);
        if (success) {
          // Also update aggregate stock for legacy consistency
          await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
        } else {
          console.error(`Stock deduction failed for verified payment! Variant: ${item.variantId}`);
        }
      } else {
        // Legacy
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    // ✅ Create Order (MATCHES YOUR ORDER MODEL)
    const order = new Order({
      orderNumber: `ORD-${Date.now()}`,
      userId: req.user.id,
      email: req.user.email,
      phone: "N/A",
      items: payment.products.map((p: any) => ({
        productId: p.productId,
        variantId: p.variantId,
        quantity: p.quantity,
        priceAtPurchase: p.price,
      })),
      paymentMethod: "UPI", // Should be derived or generic
      paymentStatus: "paid",
      currentStatus: "confirmed",
      subTotal: payment.amount,
      taxTotal: 0,
      shippingCost: 0,
      grandTotal: payment.amount,
    });

    await order.save();

    res.json({
      success: true,
      message: "Payment verified & order created",
      orderId: order.orderNumber,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    res.status(500).json({ success: false, message });
  }
};
