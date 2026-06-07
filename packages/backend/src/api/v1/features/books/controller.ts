import { ERROR_NAMES } from '@/api/v1/constants/errors.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import type { BookService } from '@/api/v1/features/books/service.js';
import type { Request, Response } from 'express';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import type { Book } from '@katieeitak/shared';

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
    const books = await this.bookService.searchBooksByQueryString({
      q,
      limit: limit && typeof limit === 'string' ? limit : undefined,
    });
    return res.status(200).json(
      ApiResponse.success<Book[]>({
        data: books,
      }),
    );
  };
}
