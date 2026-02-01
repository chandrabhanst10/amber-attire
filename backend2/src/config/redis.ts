import { createClient } from "redis";
import { logger } from "../shared/utils/logger";
import { env } from "./env";

const enabled = env.REDIS_ENABLED === "true" && !!env.REDIS_URL;

export const redis = enabled
  ? createClient({
    url: env.REDIS_URL,
    socket: {
      // Default reconnect strategy (retry forever) prevents crash
      reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
    },
  })
  : null;

if (redis) {
  // Prevent crash on connection error (MUST be registered immediately)
  redis.on("error", (err) => {
    logger.warn({ err }, "Redis client error");
  });

  redis.on("connect", () => logger.info("Redis connected"));

  (async () => {
    try {
      if (!redis.isOpen) {
        await redis.connect();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      logger.warn(`Redis unavailable (${msg}). App running without cache.`);
    }
  })();
}
