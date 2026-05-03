import { z } from 'zod';

export const DBUserSchema = z.object({
  id: z.string(),
  auth0_id: z.string(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});
