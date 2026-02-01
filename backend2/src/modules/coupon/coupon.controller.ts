import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import { couponService } from "./coupon.service";

export const createCoupon = async (req: AuthRequest, res: Response) => {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json({ success: true, coupon });
};

export const getAllCoupons = async (req: AuthRequest, res: Response) => {
    const coupons = await couponService.getAllCoupons();
    res.json({ success: true, coupons });
};

export const deleteCoupon = async (req: AuthRequest, res: Response) => {
    await couponService.deleteCoupon(req.params.id);
    res.json({ success: true, message: "Coupon deleted" });
};

export const applyCoupon = async (req: AuthRequest, res: Response) => {
    const { code, orderTotal } = req.body;
    const result = await couponService.validateCoupon(code, orderTotal);
    res.json({ success: true, data: result });
};
