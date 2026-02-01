import { Types } from "mongoose";

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  profilePhoto: string
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface JwtPayload {
  id: Types.ObjectId;
  role: "USER" | "ADMIN";
  email?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}