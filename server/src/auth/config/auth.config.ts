import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  sessionSecret: process.env.SESSION_SECRET,
  oidcIssuer: process.env.OIDC_ISSUER,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  loginScope: process.env.LOGIN_SCOPE,
  maxAge: parseInt(String(1000 * 60 * 60 * 24 * 7), 10),
}));

export const authValidationSchema = Joi.object({
  SESSION_SECRET: Joi.string().default('alongsessionsecretstring'),
  OIDC_ISSUER: Joi.string().uri().required(),
  CLIENT_ID: Joi.string().required(),
  CLIENT_SECRET: Joi.string().required(),
  REDIRECT_URI: Joi.string().uri().required(),
  LOGIN_SCOPE: Joi.string().default('openid profile'),
  MAX_AGE: Joi.number().default(86400),
});
