import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export default registerAs('node', () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
}));

export const nodeValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
});
