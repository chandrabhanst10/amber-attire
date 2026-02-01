import dotenv from "dotenv";
import { z } from "zod";

// Load .env file
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test", "live"]).default("development"),
    PORT: z.string().default("5500"),
    MONGOD_URI: z.string().min(1, "MongoDB URI is required"),

    // Security
    JWT_SECRET: z.string().min(10, "JWT Secret must be at least 10 chars"),
    JWT_EXPIRES_IN: z.string().default("7d"),

    // Redis
    REDIS_ENABLED: z.enum(["true", "false"]).default("false"),
    REDIS_URL: z.string().optional(),

    // External Services
    RAZORPAY_KEY_ID: z.string().optional(),
    RAZORPAY_KEY_SECRET: z.string().optional(),

    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_BUCKET_NAME: z.string().optional(),
    AWS_REGION: z.string().optional(),

    // Image Service
    IMAGE_SERVICE_URL: z.string().url().default("https://rwdpyiyp6c.execute-api.ap-south-1.amazonaws.com/Dev/image"),

    // Kafka
    KAFKA_BROKERS: z.string().optional(),

    // SMTP - Email Service
    SMTP_HOST: z.string().min(1, "SMTP_HOST is required"),
    SMTP_PORT: z.string().default("587"),
    SMTP_USER: z.string().min(1, "SMTP_USER is required"),
    SMTP_PASS: z.string().min(1, "SMTP_PASS is required"),
    SMTP_SECURE: z.string().default("false"),
    SMTP_FROM: z.string().optional(),
});

// Parse and validate
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("❌ Invalid environment variables:", JSON.stringify(_env.error.format(), null, 2));
    throw new Error("Invalid environment variables");
}

export const env = _env.data;

export const isDev = env.NODE_ENV === "development";
export const isProd = env.NODE_ENV === "production" || env.NODE_ENV === "live";
