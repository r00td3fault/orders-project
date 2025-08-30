import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PORT: Joi.number().default(3001),
  DEFAULT_LIMIT: Joi.number().default(10),
  DB_PASSWORD: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_SYNC: Joi.boolean().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  CACHE_PORT: Joi.number().default(6379),
  CACHE_HOST: Joi.string().required(),
  CACHE_TTL: Joi.number().default(1800),
  SECRET_TOKEN: Joi.string().required(),
  APP_RATE_SHORT_TTL: Joi.number().default(1000),
  APP_RATE_SHORT_LIMIT: Joi.number().default(3),
  APP_RATE_MEDIUM_TTL: Joi.number().default(10000),
  APP_RATE_MEDIUM_LIMIT: Joi.number().default(20),
  APP_RATE_LONG_TTL: Joi.number().default(60000),
  APP_RATE_LONG_LIMIT: Joi.number().default(100),
  STAGE: Joi.string().default('dev'),
});
