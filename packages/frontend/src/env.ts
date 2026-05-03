import { z } from 'zod';

const envSchema = z.object({
  VITE_AUTH0_DOMAIN: z.string(),
  VITE_AUTH0_CLIENT_ID: z.string(),
  VITE_API_URL: z.string(),
  VITE_AUTH0_AUDIENCE: z.string(),
  VITE_AUTH0_REDIRECT_URI: z.string(),
});

export const FRONTEND_ENV = envSchema.parse(import.meta.env);
