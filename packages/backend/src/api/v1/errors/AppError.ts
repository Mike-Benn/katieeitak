import type { ERROR_NAMES } from '@/api/v1/constants/errors.js';

// Constants and types

type HttpErrorCode = 400 | 401 | 404 | 500;
type ErrorName = (typeof ERROR_NAMES)[keyof typeof ERROR_NAMES];

// AppError
interface AppErrorConstructor {
  message: string;
  statusCode: HttpErrorCode;
  isOperational: boolean;
  name: ErrorName;
  responseData?: Record<'data', unknown>;
  safeMessage: string;
  originalError?: Error;
}

export class AppError extends Error {
  public readonly statusCode: HttpErrorCode;
  public readonly isOperational: boolean;
  public readonly responseData: Record<'data', unknown> | undefined;
  public readonly safeMessage: string;
  constructor({
    message,
    statusCode,
    isOperational,
    name,
    responseData,
    safeMessage,
    originalError,
  }: AppErrorConstructor) {
    if (originalError) {
      super(message, { cause: originalError });
    } else {
      super(message);
    }
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.responseData = responseData;
    this.safeMessage = safeMessage;
  }
}
