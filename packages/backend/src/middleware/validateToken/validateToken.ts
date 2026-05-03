import { BACKEND_ENV } from '@/env.js';
import { auth } from 'express-oauth2-jwt-bearer';

export const validateToken = auth({
  audience: BACKEND_ENV.AUDIENCE,
  issuerBaseURL: `https://${BACKEND_ENV.AUTH0_DOMAIN}`,
});
