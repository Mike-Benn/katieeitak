import type { BookRepository } from '@/api/v1/features/books/repository.js';
import { OpenLibraryResponseSchema } from '@/api/v1/features/books/types.js';
import { openLibraryApiClient } from '@/api/v1/axios/openLibraryApiClient.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES } from '@/api/v1/constants/errors.js';
import { DetailedAuthorSchema, DetailedBookSchema } from '@katieeitak/shared';

interface SearchBooksByQueryStringParams {
  q: string;
  limit: string | undefined;
}

interface GetBookByKeyParams {
  key: string;
}

interface GetAuthorByKeyParams {
  key: string | undefined;
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
      if (!parsedData.success) {
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
          message: 'There was an error communicating with the Open Library API.',
          statusCode: 502,
          isOperational: true,
          name: ERROR_NAMES.BAD_GATEWAY,
          safeMessage: 'Unable to fetch results, please try again.',
        });
      }
    }
  };

  public getBookByKey = async ({ key }: GetBookByKeyParams) => {
    const path = `/works/${key}.json`;
    try {
      const response = await openLibraryApiClient.get(path);
      const parsedData = DetailedBookSchema.safeParse(response.data);
      if (!parsedData.success) {
        throw new AppError({
          message: 'DetailedBookSchema parsing error, payload mismatched with schema.',
          statusCode: 500,
          isOperational: true,
          name: ERROR_NAMES.OL_SCHEMA_ERROR,
          safeMessage: 'Unable to fetch result, please try again.',
        });
      }
      return parsedData.data;
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw error;
      } else {
        console.log('BOOK ERROR:', error);
        throw new AppError({
          message: 'There was an error communicating with the Open Library API.',
          statusCode: 502,
          isOperational: true,
          name: ERROR_NAMES.BAD_GATEWAY,
          safeMessage: 'Unable to fetch result, please try again.',
        });
      }
    }
  };

  public getAuthorByKey = async ({ key }: GetAuthorByKeyParams) => {
    if (!key) return undefined;
    const path = `${key}.json`;
    try {
      const response = await openLibraryApiClient.get(path);
      const parsedData = DetailedAuthorSchema.safeParse(response.data);
      if (!parsedData.success) {
        throw new AppError({
          message: 'DetailedAuthorSchema parsing error, payload mismatched with schema.',
          statusCode: 500,
          isOperational: true,
          name: ERROR_NAMES.OL_SCHEMA_ERROR,
          safeMessage: 'Unable to fetch result, please try again.',
        });
      }
      return parsedData.data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        console.log('AUTHOR ERROR:', error);
        throw new AppError({
          message: 'There was an error communicating with the Open Library API.',
          statusCode: 502,
          isOperational: true,
          name: ERROR_NAMES.BAD_GATEWAY,
          safeMessage: 'Unable to fetch result, please try again.',
        });
      }
    }
  };
}
