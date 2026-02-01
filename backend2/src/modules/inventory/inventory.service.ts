import Product, { IProduct } from "../../models/product.model";
import { AppError } from "../../shared/utils/AppError";
import mongoose from "mongoose";

export class InventoryService {
    /**
     * Check stock for a specific variant
     */
    static async checkStock(variantId: string, quantity: number): Promise<boolean> {
        const product = await Product.findOne({
            "variants._id": variantId,
            "variants.stock": { $gte: quantity },
        });
        return !!product;
    }

    /**
     * Reserve stock (Atomic decrement)
     * Returns true if successful, false if insufficient stock
     */
    static async reserveStock(variantId: string, quantity: number): Promise<boolean> {
        const result = await Product.findOneAndUpdate(
            {
                "variants._id": variantId,
                "variants.stock": { $gte: quantity },
            },
            {
                $inc: { "variants.$.stock": -quantity },
            },
            { new: true }
        );

        if (result) {
            const variant = result.variants?.find((v: any) => v._id.toString() === variantId);
            if (variant && variant.stock < 10) {
                const { notificationService } = await import("../notification/notification.service");
                notificationService.sendToAdmins("LOW_STOCK", {
                    productId: result._id,
                    variantId,
                    sku: variant.sku,
                    remainingStock: variant.stock
                });
            }
        }

        return !!result;
    }

    /**
     * Release stock (Atomic increment) - e.g. on order cancellation or timeout
     */
    static async releaseStock(variantId: string, quantity: number): Promise<boolean> {
        const result = await Product.findOneAndUpdate(
            {
                "variants._id": variantId,
            },
            {
                $inc: { "variants.$.stock": quantity },
            },
            { new: true }
        );

        return !!result;
    }

    /**
     * Bulk Reservation (Transaction support recommended for multiple items)
     */
    static async reserveMultiple(items: { variantId: string; quantity: number }[]) {
        // Ideally use a transaction. For simplicity here, we do serial or parallel.
        // If one fails, we must rollback others.
        const reserved: { variantId: string; quantity: number }[] = [];

        for (const item of items) {
            const success = await this.reserveStock(item.variantId, item.quantity);
            if (success) {
                reserved.push(item);
            } else {
                // Rollback
                await Promise.all(reserved.map(r => this.releaseStock(r.variantId, r.quantity)));
                throw new AppError(`Insufficient stock for item variant ${item.variantId}`, 400);
            }
        }
        return true;
    }
}
