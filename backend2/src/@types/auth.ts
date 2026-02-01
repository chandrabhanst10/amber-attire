import { AuthRequest } from "../shared/types/auth.types";

/* ===================== JWT USER ===================== */
export interface JwtUser {
  id: string;
  role: "user" | "admin";
  email?: string;
  userProfile: string;
  phone: string;
}

/* ===================== TOKEN EXTRACTOR ===================== */
export const getTokenFromRequest = (req: AuthRequest): string | undefined => {
  const cookieToken = req.cookies?.token;

  const authHeader = req.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return cookieToken;
};

