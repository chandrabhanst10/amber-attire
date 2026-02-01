
export const paymentConfig = {
  provider: process.env.PAYMENT_PROVIDER as "MOCK" | "RAZORPAY" | "STRIPE",

  currency: "INR",

  webhookTimeoutMinutes: 15,
};
