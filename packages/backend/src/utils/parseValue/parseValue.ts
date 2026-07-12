import type { ZodType } from 'zod';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES } from '@/api/v1/constants/errors.js';

interface ParseValueParams<T> {
  schema: ZodType<T>;
  value: unknown;
  message: string;
}

// For parsing req.body, req.params
export function parseValue<T>({ schema, value, message }: ParseValueParams<T>): T {
  const parsedValue = schema.safeParse(value);
  if (!parsedValue.success) {
    throw new AppError({
      message,
      statusCode: 400,
      isOperational: true,
      name: ERROR_NAMES.MALFORMED_REQUEST,
      safeMessage: 'Malformed request syntax',
    });
  }
  return parsedValue.data;
}
