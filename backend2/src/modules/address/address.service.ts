import Address from "../../models/Address.model";
import { Types } from "mongoose";
import { AppError } from "../../shared/utils/AppError";
import { AddressPayload } from "./address.types";


export class AddressService {
  static async create(
    userId: Types.ObjectId,
    payload: AddressPayload
  ) {
    if (payload.isDefault) {
      await Address.updateMany(
        { userId },
        { $set: { isDefault: false } }
      );
    }

    return Address.create({
      ...payload,
      userId,
    });
  }

  static async getAll(userId: Types.ObjectId) {
    return Address.find({ userId }).sort({ createdAt: -1 });
  }

  static async getById(
    userId: Types.ObjectId,
    addressId: string
  ) {
    const address = await Address.findOne({
      _id: addressId,
      userId,
    });

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    return address;
  }

  static async update(
    userId: Types.ObjectId,
    addressId: string,
    payload: AddressPayload
  ) {
    if (payload.isDefault) {
      await Address.updateMany(
        { userId },
        { $set: { isDefault: false } }
      );
    }

    const updated = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      payload,
      { new: true }
    );

    if (!updated) {
      throw new AppError("Address not found", 404);
    }

    return updated;
  }

  static async remove(
    userId: Types.ObjectId,
    addressId: string
  ) {
    const deleted = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deleted) {
      throw new AppError("Address not found", 404);
    }

    return true;
  }
}
