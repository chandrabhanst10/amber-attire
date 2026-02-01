import { Response } from "express";
import { AdminService } from "./admin.service";
import { AuthRequest } from "../../shared/types/auth.types";

export const getAdminStats = async (
  req: AuthRequest,
  res: Response
) => {
  const data = await AdminService.getAdminStats();

  res.json({
    success: true,
    data,
  });
};

export const getAllUsers = async (
  req: AuthRequest,
  res: Response
) => {
  const users = await AdminService.getAllUsers();
  res.json(users);
};

export const getUserById = async (
  req: AuthRequest,
  res: Response
) => {
  const user = await AdminService.getUserById(req.params.id);
  res.json(user);
};

export const updateUserRole = async (
  req: AuthRequest,
  res: Response
) => {
  await AdminService.updateUserRole(req.params.id, req.body);

  res.json({
    message: "User role updated successfully",
  });
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response
) => {
  await AdminService.deleteUser(req.params.id);

  res.json({
    message: "User deleted successfully",
  });
};
