import { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit, { MemoryStore } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { redis } from "../config/redis";
import { logger } from "../shared/utils/logger";

/**
 * Central place for all security-related middlewares
 * Applied once at app bootstrap level
 */
export const securityMiddlewares = (app: Application) => {
  // 1️⃣ Secure HTTP headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // 2️⃣ Rate limiting (Redis-backed if available) // Rate limiter
  // Check if Redis is enabled AND connected
  const useRedis = redis && redis.isOpen;

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // Limit each IP to 1000 requests per `window`
    standardHeaders: true,
    legacyHeaders: false,
    store: useRedis
      ? new RedisStore({
        sendCommand: (...args: string[]) => {
          // Double check connection before sending
          if (!redis || !redis.isOpen) {
            throw new Error("Redis client closed");
          }
          return redis.sendCommand(args);
        },
      })
      : new MemoryStore(), // Fallback to memory
    // If store fails (e.g. Redis throws), failClosed? Default is false (pass request).
    // We can also handle 'skip' or 'handler'.
    // But RedisStore throwing typically crashes if not handled.
    handler: (req: Request, res: Response, next: NextFunction, options: any) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip} `);
      res.status(options.statusCode).send(options.message);
    }
  });
  app.use(limiter);

  // 3️⃣ Prevent NoSQL injection
  app.use(
    mongoSanitize({
      replaceWith: "_",
    })
  );


  // 5️⃣ Prevent HTTP parameter pollution
  app.use(
    hpp({
      whitelist: [
        "price",
        "category",
        "sort",
        "page",
        "limit",
      ],
    })
  );
};
