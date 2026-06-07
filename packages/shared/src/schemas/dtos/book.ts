import { z } from 'zod';

export const BookSchema = z.object({
  author_key: z.array(z.string()).optional(),
  author_name: z.array(z.string()).optional(),
  cover_i: z.number().int().positive().optional(),
  key: z.string(),
  title: z.string(),
  first_publish_year: z.number().int().positive().optional(),
});
export type Book = z.infer<typeof BookSchema>;

export const BookSearchResultsSchema = z.object({
  num_found: z.number().int().nonnegative(),
  books: z.array(BookSchema),
});

export type BookSearchResults = z.infer<typeof BookSearchResultsSchema>;
