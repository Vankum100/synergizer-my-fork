import * as Redis from 'ioredis';

// TODO Replace with module and inject ConfigService
export const redisClient = new Redis({
  port: parseInt(process.env.REDIS_PORT as string, 10),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS,
});
