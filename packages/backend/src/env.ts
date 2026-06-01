import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string(),
  CORS_ORIGINS: z.string(),
  DB_URL: z.string(),
  AUDIENCE: z.string(),
  AUTH0_DOMAIN: z.string(),
});

export const BACKEND_ENV = envSchema.parse(process.env);
