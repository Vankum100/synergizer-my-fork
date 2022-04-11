import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export default registerAs('socket', () => ({
  connectionTimeout: process.env.WS_CONNECT_TIMEOUT,
  path: process.env.WS_PATH,
  port: process.env.WS_PORT,
}));

export const socketValidationSchema = Joi.object({
  WS_CONNECT_TIMEOUT: Joi.number().positive().default(45000),
  WS_PATH: Joi.string().default('/v1'),
  WS_PORT: Joi.number().default(81),
});
