export const AUDIT_ACTIONS = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  STATUS_CHANGE: "STATUS_CHANGE",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REFUND: "REFUND",
  CUSTOM: "CUSTOM",
} as const;

export const AUDIT_MODULES = {
  USER: "USER",
  PRODUCT: "PRODUCT",
  ORDER: "ORDER",
  PAYMENT: "PAYMENT",
  AUTH: "AUTH",
  SYSTEM: "SYSTEM",
} as const;

export type AuditAction =
  (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS];

export type AuditModule =
  (typeof AUDIT_MODULES)[keyof typeof AUDIT_MODULES];
