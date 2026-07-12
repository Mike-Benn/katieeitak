import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES } from '@/api/v1/constants/errors.js';

export function verifyBookKey(key: unknown): asserts key is string {
  if (!key || typeof key !== 'string' || !key.endsWith('W')) {
    throw new AppError({
      message: "Missing or invalid 'key' query parameter, must be a string and end with 'W'.",
      statusCode: 404,
      isOperational: true,
      name: ERROR_NAMES.MALFORMED_REQUEST,
      safeMessage: 'Resource not found',
    });
  }
}
