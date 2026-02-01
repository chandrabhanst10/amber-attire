import Product, { IProduct } from "../../models/product.model";
import axios from "axios";
import slugify from "slugify";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ImageService } from "../../services/image/image.service";

dotenv.config();

export class ProductService {
  /* ================= CREATE ================= */

  static async create(
    payload: any,
    adminId: mongoose.Types.ObjectId,
    adminName?: string
  ) {
    const slug = slugify(payload.productName, { lower: true });

    // Ensure variants are properly structured if payload has them
    // Assuming payload receives { ..., variants: [...] }

    // Calculate aggregate fields
    const variants = payload.variants || [];
    const sizes = [...new Set(variants.map((v: any) => v.size))];
    const colors = [...new Set(variants.map((v: any) => ({ name: v.color.name, hexCode: v.color.hexCode })))]; // Need to dedupe objects properly

    // Fix Colors deduplication
    const uniqueColors = Array.from(new Map(variants.map((v: any) => [v.color.name, v.color])).values());

    return Product.create({
      ...payload,
      slug,
      sizes, // Auto-populated from variants
      colors: uniqueColors, // Auto-populated
      stock: variants.reduce((acc: number, v: any) => acc + (v.stock || 0), 0), // Total stock
      createdBy: {
        userId: adminId,
        name: adminName,
      },
      price: payload.price || (variants.length > 0 ? Math.min(...variants.map((v: any) => v.price)) : 0), // Base price is min variant price
    });
  }

  /* ================= READ ================= */

  static async getAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    let [products, total] = await Promise.all([
      Product.find({ isDeleted: false })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments({ isDeleted: false }),
    ]);

    // Attach images from S3
    await ProductService.attachImages(products);

    return { products, total };
  }

  static async getById(id: string) {
    const product = await Product.findById(id).lean(); // Use lean() to allow property mutation
    if (!product) throw new Error("Product not found");

    await ProductService.attachImages([product]);
    return product;
  }

  /* ================= UPDATE ================= */

  static async update(id: string, payload: any) {
    // If variants updated, recalculate aggregates
    if (payload.variants) {
      const variants = payload.variants;
      payload.sizes = [...new Set(variants.map((v: any) => v.size))];

      const uniqueColors = Array.from(new Map(variants.map((v: any) => [v.color.name, v.color])).values());
      payload.colors = uniqueColors;

      payload.stock = variants.reduce((acc: number, v: any) => acc + (v.stock || 0), 0);

      // Update base price only if not explicitly set? Or always sync with min variant?
      // Let's sync if not provided.
      if (!payload.price && variants.length > 0) {
        payload.price = Math.min(...variants.map((v: any) => v.price));
      }
    }

    const product = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!product) throw new Error("Product not found");
    return product;
  }

  /* ================= DELETE ================= */

  static async remove(id: string) {
    const product = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!product) throw new Error("Product not found");
    return product;
  }

  /* ================= FILTER ================= */

  static async filter(query: any) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      minPrice,
      maxPrice,
    } = query;

    const filter: any = { isPublished: true, isDeleted: false };

    if (search) {
      filter.$or = [
        { productName: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).lean(),
      Product.countDocuments(filter),
    ]);

    await ProductService.attachImages(products);

    return { products, total, page, limit };
  }

  /* ================= REVIEWS ================= */

  static async addOrUpdateReview(
    productId: string,
    userId: any,
    name: string | undefined,
    body: { rating: number; comment?: string }
  ) {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    const existing = product.reviews.find(
      (r) => r.userId?.toString() === userId.toString()
    );

    if (existing) {
      existing.rating = body.rating;
      existing.comment = body.comment;
    } else {
      product.reviews.push({
        userId,
        name,
        rating: body.rating,
        comment: body.comment,
      });
    }

    product.ratings.count = product.reviews.length;
    product.ratings.average =
      product.reviews.reduce((s, r) => s + r.rating, 0) /
      product.reviews.length;

    await product.save();
    return product;
  }

  static async getReviews(productId: string) {
    const product = await Product.findById(productId).select(
      "reviews ratings"
    );
    if (!product) throw new Error("Product not found");
    return product;
  }

  /* ================= TAG / GENDER ================= */

  static async getByGender() {
    const [mens, womens] = await Promise.all([
      Product.find({ tags: "mens" }).lean(),
      Product.find({ tags: "womens" }).lean(),
    ]);

    // Optimize: fetch images for both lists
    const allProducts = [...mens, ...womens];
    if (allProducts.length > 0) {
      await ProductService.attachImages(allProducts);
    }

    return { mens, womens };
  }

  static async getTagged(tag?: string) {
    if (!tag) return [];

    if (tag === "latest") {
      const products = await Product.find().sort({ createdAt: -1 }).limit(10).lean();
      await ProductService.attachImages(products);
      return products;
    }

    const products = await Product.find({ tags: tag }).lean();
    await ProductService.attachImages(products);
    return products;
  }



  static async attachImages(products: any[]) {
    // Delegate to the dedicated ImageService
    return ImageService.attachImages(products);
  }
}
