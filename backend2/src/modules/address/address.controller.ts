import { RequestHandler, Response } from "express";
import { AddressService } from "./address.service";
import { Types } from "mongoose";
import { AuthRequest } from "../../shared/types/auth.types";

export const createAddress: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  if (!req.user) return;
  const address = await AddressService.create(req.user.id, req.body);

  res.status(201).json({
    success: true,
    address,
  });
};

export const getAddresses: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const addresses = await AddressService.getAll(
    req.user!.id as unknown as Types.ObjectId
  );

  res.json({
    success: true,
    addresses,
  });
};

export const getAddressById: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const address = await AddressService.getById(
    req.user!.id as unknown as Types.ObjectId,
    req.params.id
  );

  res.json({
    success: true,
    address,
  });
};

export const updateAddress: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  const updatedAddress = await AddressService.update(
    req.user!.id as unknown as Types.ObjectId,
    req.params.id,
    req.body
  );

  res.json({
    success: true,
    updatedAddress,
  });
};

export const deleteAddress: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  await AddressService.remove(
    req.user!.id as unknown as Types.ObjectId,
    req.params.id
  );

  res.json({
    success: true,
    message: "Address deleted",
  });
};
