import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

import dotenv from "dotenv"

dotenv.config()
const rawSecret = process.env.JWT_SECRET;

if (!rawSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// ✅ type is now guaranteed to be string
const JWT_SECRET: string = rawSecret;

const JWT_EXPIRES_IN =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "15m";

export function signJwt(
  payload: object,
  expiresIn: SignOptions["expiresIn"] = JWT_EXPIRES_IN
) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
