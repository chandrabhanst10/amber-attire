import { Response } from "express";
import {
  buyNowService,
  placeOrderService,
  verifyPaymentService,
  changeOrderStatusService,
} from "./order.service";
import { AuthRequest } from "../../shared/types/auth.types";
import orderModel from "../../models/order.model";

export const buyNow = async (req: AuthRequest, res: Response) => {
  try {
    const result = await buyNowService(req.user, req.body);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const result = await placeOrderService(req.user, req.body);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    await verifyPaymentService(orderId, paymentId, signature);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const changeOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const order = await changeOrderStatusService(
      req.params.orderId,
      req.body.status
    );
    res.json({ success: true, order });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getUserOrders = async (
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

    const orders = await orderModel.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return res.status(500).json({ success: false, message });
  }
};

/* ================= ADMIN ORDERS ================= */

export const getAllOrders = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const orders = await orderModel.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return res.status(500).json({ success: false, message });
  }
};