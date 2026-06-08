import { ERROR_NAMES } from '@/api/v1/constants/errors.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import type { BookService } from '@/api/v1/features/books/service.js';
import type { Request, Response } from 'express';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import type { GeneralBooksSearchResults, DetailedBookResponse } from '@katieeitak/shared';

export class BookController {
  private bookService: BookService;
  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  public searchBooksByQueryString = async (req: Request, res: Response) => {
    const { q, limit } = req.query;
    if (!q || typeof q !== 'string') {
      throw new AppError({
        message: "Missing or invalid 'q' query parameter, must be a string.",
        statusCode: 400,
        isOperational: true,
        name: ERROR_NAMES.MALFORMED_REQUEST,
        safeMessage: 'Malformed request',
      });
    }
    const data = await this.bookService.searchBooksByQueryString({
      q,
      limit: limit && typeof limit === 'string' ? limit : undefined,
    });
    return res.status(200).json(
      ApiResponse.success<GeneralBooksSearchResults>({
        data: {
          books: data.docs,
          num_found: data.num_found,
        },
      }),
    );
  };

  public getBookByKey = async (req: Request, res: Response) => {
    const { key } = req.params;
    if (!key || typeof key !== 'string') {
      throw new AppError({
        message: "Missing or invalid 'key' query parameter, must be a string.",
        statusCode: 404,
        isOperational: true,
        name: ERROR_NAMES.MALFORMED_REQUEST,
        safeMessage: 'Resource not found',
      });
    }
    if (!key.endsWith('W')) {
      throw new AppError({
        message: "Missing or invalid 'key' query parameter, must be a string and end with 'W'.",
        statusCode: 404,
        isOperational: true,
        name: ERROR_NAMES.MALFORMED_REQUEST,
        safeMessage: 'Resource not found',
      });
    }
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
