import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string(),
  CORS_ORIGINS: z.string(),
  DB_URL: z.string(),
  PORT: z.string().transform(Number),
});

export const BACKEND_ENV = envSchema.parse(process.env);
