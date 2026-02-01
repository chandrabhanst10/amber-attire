import { Response } from "express";
import mongoose from "mongoose";
import { ProductService } from "./product.service";
import { IProduct } from "../../models/product.model";
import { AuthRequest } from "../../shared/types/auth.types";

/* ================= CREATE ================= */

export const createProduct = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const product = await ProductService.create(
    req.body,
    new mongoose.Types.ObjectId(req.user.id),
    req.user.name
  );

  return res.status(201).json({ success: true, product });
};

/* ================= READ ================= */

export const getAllProducts = async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const { products, total } = await ProductService.getAll(page, limit);

  return res.json({
    success: true,
    total,
    page,
    limit,
    data: products,
  });
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  const product = await ProductService.getById(req.params.id);

  return res.json({ success: true, data: product });
};

/* ================= UPDATE ================= */

export const updateProduct = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const product = await ProductService.update(req.params.id, req.body);

  return res.json({ success: true, product });
};

/* ================= DELETE ================= */

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  await ProductService.remove(req.params.id);

  return res.json({ success: true, message: "Product deleted successfully" });
};

/* ================= FILTER ================= */

export const getFilteredProducts = async (req: AuthRequest, res: Response) => {
  const result = await ProductService.filter(req.query);

  return res.json({
    success: true,
    total: result.total,
    page: result.page,
    limit: result.limit,
    data: result.products,
  });
};

/* ================= REVIEWS ================= */

export const addOrUpdateReview = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const product = await ProductService.addOrUpdateReview(
    req.params.id,
    req.user.id,
    req.user.name,
    req.body
  );

  return res.json({
    success: true,
    ratings: product.ratings,
    reviews: product.reviews,
  });
};

export const getProductReviews = async (req: AuthRequest, res: Response) => {
  const data = await ProductService.getReviews(req.params.id);

  return res.json({ success: true, ...data });
};

/* ================= TAG / GENDER ================= */

export const getProductsByGender = async (req: AuthRequest, res: Response) => {
  const data = await ProductService.getByGender();

  return res.json({ success: true, data });
};

export const getTaggedData = async (req: AuthRequest, res: Response) => {
  const data = await ProductService.getTagged(req.query.tag as string);

  return res.json({ success: true, data });
};
