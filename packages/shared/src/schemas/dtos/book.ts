import { z } from 'zod';

export const GeneralBookSchema = z.object({
  author_key: z.array(z.string()).optional(),
  author_name: z.array(z.string()).optional(),
  cover_i: z.number().int().positive().optional(),
  key: z.string(),
  title: z.string(),
  first_publish_year: z.number().int().positive().optional(),
});
export type GeneralBook = z.infer<typeof GeneralBookSchema>;

export const GeneralBooksSearchResultsSchema = z.object({
  num_found: z.number().int().nonnegative(),
  offset: z.number().int().nonnegative(),
  books: z.array(GeneralBookSchema),
});

export type GeneralBooksSearchResults = z.infer<typeof GeneralBooksSearchResultsSchema>;

export const DetailedBookSchema = z.object({
  subjects: z.array(z.string()).optional(),
  key: z.string().optional(),
  title: z.string().optional(),
  description: z
    .string()
    .or(
      z.object({
        type: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  covers: z.array(z.number().int().nonnegative()).optional(),
  authors: z
    .array(
      z
        .object({
          author: z
            .object({
              key: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
    )
    .optional(),
});

export type DetailedBook = z.infer<typeof DetailedBookSchema>;

export const DetailedBookResponseSchema = z.object({
  book: DetailedBookSchema,
  author_name: z.string().optional(),
});

export type DetailedBookResponse = z.infer<typeof DetailedBookResponseSchema>;

export const DetailedAuthorSchema = z.object({
  name: z.string().optional(),
});

export type DetailedAuthor = z.infer<typeof DetailedAuthorSchema>;
