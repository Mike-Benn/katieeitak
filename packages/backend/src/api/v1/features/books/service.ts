import type { BookRepository } from '@/api/v1/features/books/repository.js';
import { OpenLibraryResponseSchema } from '@/api/v1/features/books/types.js';
import { openLibraryApiClient } from '@/api/v1/axios/openLibraryApiClient.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES } from '@/api/v1/constants/errors.js';

interface SearchBooksByQueryStringParams {
  q: string;
  limit: string | undefined;
}

export class BookService {
  private bookRepository: BookRepository;
  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }
  // TODO
  public test() {
    console.log(this.bookRepository);
  }

  public searchBooksByQueryString = async ({ q, limit }: SearchBooksByQueryStringParams) => {
    const params = new URLSearchParams({ q });
    if (limit) {
      params.set('limit', limit);
    }
    try {
      const response = await openLibraryApiClient.get(`/search.json?${params}`);
      const parsedData = OpenLibraryResponseSchema.safeParse(response.data);
      if (parsedData.error) {
        throw new AppError({
          message: 'OpenLibraryResponseSchema parsing error, payload mismatched with schema.',
          statusCode: 500,
          isOperational: true,
          name: ERROR_NAMES.OL_SCHEMA_ERROR,
          safeMessage: 'Unable to fetch results, please try again.',
        });
      }
      return parsedData.data;
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError({
          message: 'There was an error communicating with the Open Library API',
          statusCode: 502,
          isOperational: true,
          name: ERROR_NAMES.BAD_GATEWAY,
          safeMessage: 'Unable to fetch results, please try again.',
        });
      }
    }
  };
}
