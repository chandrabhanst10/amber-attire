import Coupon, { ICoupon, CouponType } from "../../models/coupon.model";
import { AppError } from "../../shared/utils/AppError";

class CouponService {
    async createCoupon(data: Partial<ICoupon>) {
        return await Coupon.create(data);
    }

    async getAllCoupons() {
        return await Coupon.find().sort({ createdAt: -1 });
    }

    async deleteCoupon(id: string) {
        return await Coupon.findByIdAndDelete(id);
    }

    async validateCoupon(code: string, orderTotal: number) {
        const coupon = await Coupon.findOne({
            code: code.toUpperCase(),
            isActive: true,
        });

        if (!coupon) throw new AppError("Invalid coupon code", 400);

        if (coupon.expiryDate < new Date()) {
            throw new AppError("Coupon expired", 400);
        }

        if (coupon.usedCount >= coupon.usageLimit) {
            throw new AppError("Coupon usage limit exceeded", 400);
        }

        if (orderTotal < coupon.minOrderValue) {
            throw new AppError(
                `Minimum order value of ${coupon.minOrderValue} required`,
                400
            );
        }

        // Calculate discount
        let discountAmount = 0;
        if (coupon.type === CouponType.PERCENTAGE) {
            discountAmount = (orderTotal * coupon.value) / 100;
            if (coupon.maxDiscount) {
                discountAmount = Math.min(discountAmount, coupon.maxDiscount);
            }
        } else {
            discountAmount = coupon.value;
        }

        // Ensure discount doesn't exceed total
        discountAmount = Math.min(discountAmount, orderTotal);

        return {
            couponCode: coupon.code,
            discountAmount,
            type: coupon.type,
            value: coupon.value,
        };
    }
}

export const couponService = new CouponService();
