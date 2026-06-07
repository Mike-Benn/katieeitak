import { BookSchema } from '@katieeitak/shared';
import { z } from 'zod';

export const OpenLibraryResponseSchema = z.object({
  q: z.string(),
  num_found: z.number().int().nonnegative(),
  docs: z.array(BookSchema),
  start: z.number().int().nonnegative(),
});
