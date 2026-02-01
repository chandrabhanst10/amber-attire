import { RequestHandler, Response } from "express";
import { Types } from "mongoose";
import { CartService } from "./cart.service";
import { AuthRequest } from "../../shared/types/auth.types";

export const addToCart:RequestHandler = async (req: AuthRequest, res: Response) => {
  const cart = await CartService.addToCart(
    req.user!.id as unknown as Types.ObjectId,
    req.body
  );

  res.json({ success: true, cart });
};

export const viewCart:RequestHandler = async (req: AuthRequest, res: Response) => {
  const cart = await CartService.viewCart(
    req.user!.id as unknown as Types.ObjectId
  );

  res.json({ success: true, cart });
};

export const updateCartItem:RequestHandler = async (req: AuthRequest, res: Response) => {
  const cart = await CartService.updateItem(
    req.user!.id as unknown as Types.ObjectId,
    req.body
  );

  res.json({ success: true, cart });
};

export const removeCartItem:RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const cart = await CartService.removeItem(
    req.user!.id as unknown as Types.ObjectId,
    req.params.productId
  );

  res.json({ success: true, cart });
};

export const clearCart:RequestHandler = async (req: AuthRequest, res: Response) => {
  const cart = await CartService.clearCart(
    req.user!.id as unknown as Types.ObjectId
  );

  res.json({ success: true, cart });
};
