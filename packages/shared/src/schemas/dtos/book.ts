import { z } from 'zod';

export const BookSchema = z.object({
  author_key: z.array(z.string()),
  author_name: z.array(z.string()),
  cover_i: z.number().int().positive(),
  title: z.string(),
  first_publish_year: z.number().int().positive(),
});
export type Book = z.infer<typeof BookSchema>;
