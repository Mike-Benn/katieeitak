import type { Request } from 'express';
import { z } from 'zod';

export interface AuthenticatedRequest extends Request {
  auth: NonNullable<Request['auth']> & {
    payload: { sub: string };
  };
}

// Being used because of bigint precision loss
export const ResourceIdSchema = z.string().regex(/^\d+$/, {
  message: 'Invalid ID format. Expcted a numeric database ID.',
});

export type ResourceId = z.infer<typeof ResourceIdSchema>;
