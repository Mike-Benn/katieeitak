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
  key: z.string(),
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
  covers: z
    .preprocess(
      (val) => (Array.isArray(val) ? val.filter((id) => id > 0) : val),
      z.array(z.number()).catch([]),
    )
    .optional(),
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

// Marked books
export const MarkedBookSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  ol_book_key: z.string(),
  title: z.string().nullable(),
  ol_author_key: z.string().nullable(),
  author_name: z.string().nullable(),
  cover_i: z.number().int().positive().nullable(),
  word_count: z.number().int().nonnegative().nullable(),
  page_count: z.number().int().nonnegative().nullable(),
  rating: z.number().min(0.5).max(5).multipleOf(0.5),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});
export type MarkedBook = z.infer<typeof MarkedBookSchema>;

//  markBookRead types
export const MarkedBookReadPayloadSchema = MarkedBookSchema.pick({
  ol_book_key: true,
  title: true,
  ol_author_key: true,
  author_name: true,
  cover_i: true,
  word_count: true,
  page_count: true,
  rating: true,
});

export type MarkedBookReadPayload = z.infer<typeof MarkedBookReadPayloadSchema>;

export const MarkedBookReadQueryResultSchema = MarkedBookSchema.pick({
  id: true,
  word_count: true,
  page_count: true,
  rating: true,
});

export type MarkedBookReadQueryResult = z.infer<typeof MarkedBookReadQueryResultSchema>;

export const MarkedBookReadResponseSchema = MarkedBookSchema.pick({
  id: true,
  word_count: true,
  page_count: true,
  rating: true,
});

export type MarkedBookReadResponse = z.infer<typeof MarkedBookReadResponseSchema>;

// getMarkedBook types
export const GetMarkedBookQueryResultSchema = MarkedBookSchema.pick({
  id: true,
  word_count: true,
  page_count: true,
  rating: true,
});

export type GetMarkedBookQueryResult = z.infer<typeof GetMarkedBookQueryResultSchema>;

export const GetMarkedBookResponseSchema = GetMarkedBookQueryResultSchema.nullable();

export type GetMarkedBookResponse = z.infer<typeof GetMarkedBookResponseSchema>;

export const PatchMarkedBookByIdPayloadSchema = MarkedBookSchema.pick({
  word_count: true,
  page_count: true,
  rating: true,
})
  .partial()
  .refine(
    (data) => {
      const definedValues = Object.values(data).filter((val) => val !== undefined);
      return definedValues.length > 0;
    },
    {
      message: 'You must provide at least one valid field to update.',
    },
  );

export type PatchMarkedBookByIdPayload = z.infer<typeof PatchMarkedBookByIdPayloadSchema>;

export const PatchMarkedBookQueryResultSchema = MarkedBookSchema.pick({
  id: true,
  word_count: true,
  page_count: true,
  rating: true,
});

export type PatchMarkedBookQueryResult = z.infer<typeof PatchMarkedBookQueryResultSchema>;
