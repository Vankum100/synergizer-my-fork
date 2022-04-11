import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export default registerAs('node', () => ({
  redisPort: parseInt(process.env.REDIS_PORT as string, 10),
  redisHost: process.env.REDIS_HOST,
  redisPass: process.env.REDIS_PASS,
}));

export const storageValidationSchema = Joi.object({
  REDIS_PORT: Joi.number().greater(0).less(65353).default(6379),
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PASS: Joi.string().default('1234'),
});
