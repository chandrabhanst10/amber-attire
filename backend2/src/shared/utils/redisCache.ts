import { redis } from "../../config/redis";

export const cacheGet = async <T>(key: string): Promise<T | null> => {
  if (!redis || !redis.isOpen) return null;
  try {
    const val = await redis.get(key);
    return val ? (JSON.parse(val) as T) : null;
  } catch (error) {
    return null;
  }
};

export const cacheSet = async (
  key: string,
  value: unknown,
  ttlSeconds: number
) => {
  if (!redis || !redis.isOpen) return;
  try {
    await redis.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (error) {
    // Ignore cache set errors
  }
};

export const cacheDel = async (key: string) => {
  if (!redis || !redis.isOpen) return;
  try {
    await redis.del(key);
  } catch (error) {
    // Ignore
  }
};

export const cacheExists = async (key: string): Promise<boolean> => {
  if (!redis || !redis.isOpen) return false;
  try {
    return (await redis.exists(key)) === 1;
  } catch (error) {
    return false;
  }
};
