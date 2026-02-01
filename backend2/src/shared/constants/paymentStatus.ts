export const PAYMENT_STATUS = {
  INITIATED: "INITIATED",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  PENDING: "PENDING",
  REFUNDED: "REFUNDED",
} as const;

export type PaymentStatus =
  typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
