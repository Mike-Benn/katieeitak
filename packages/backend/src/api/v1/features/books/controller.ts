import { ERROR_NAMES } from '@/api/v1/constants/errors.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import type { BookService } from '@/api/v1/features/books/service.js';
import type { Request, Response } from 'express';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import type { GeneralBooksSearchResults, DetailedBookResponse } from '@katieeitak/shared';
import { z } from 'zod';
import { verifyBookKey } from '@/utils/verifyBookKey/verifyBookKey.js';

const SearchBooksByQueryStringParamsSchema = z.object({
  q: z.string(),
  limit: z.coerce.number().int().positive(),
  offset: z.coerce.number().int().nonnegative(),
});

export class BookController {
  private bookService: BookService;
  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  public searchBooksByQueryString = async (req: Request, res: Response) => {
    const parsedParams = SearchBooksByQueryStringParamsSchema.safeParse(req.query);
    if (!parsedParams.success) {
      const errorKeys = parsedParams.error.issues.map((err) => err.path[0]).join(', ');
      throw new AppError({
        message: `${errorKeys} are missing or invalid in query parameter.`,
        statusCode: 400,
        isOperational: true,
        name: ERROR_NAMES.MALFORMED_REQUEST,
        safeMessage: 'Malformed request',
      });
    }
    const data = await this.bookService.searchBooksByQueryString({
      q: parsedParams.data.q,
      limit: parsedParams.data.limit,
      offset: parsedParams.data.offset,
    });
    return res.status(200).json(
      ApiResponse.success<GeneralBooksSearchResults>({
        data: {
          books: data.docs,
          num_found: data.num_found,
          offset: data.offset,
        },
      }),
    );
  };

  public getBookByKey = async (req: Request, res: Response) => {
    const { key } = req.params;
    verifyBookKey(key);
    const book = await this.bookService.getBookByKey({ key });
    let authorKey: string | undefined;
    if (book.authors && book.authors[0]) {
      authorKey = book.authors[0].author?.key;
    }
    const author = await this.bookService.getAuthorByKey({ key: authorKey });
    return res.status(200).json(
      ApiResponse.success<DetailedBookResponse>({
        data: {
          book: book,
          author_name: author?.name,
        },
      }),
    );
  };
}
