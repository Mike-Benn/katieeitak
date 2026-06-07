import { AppError } from '@/api/v1/errors/AppError.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import type { Response } from 'express';
import { logger } from '@/utils/logger/logger.js';
import { gracefulShutdown } from '@/server.js';
import { ZodError } from 'zod';

export const ErrorHandler = {
  handleError: async (error: unknown, res: Response) => {
    if (error instanceof AppError) {
      if (error.isOperational) {
        if (error.statusCode >= 500) {
          return res.status(error.statusCode).json(
            ApiResponse.error({
              message: error.safeMessage,
            }),
          );
        } else {
          return res
            .status(error.statusCode)
            .json(ApiResponse.fail({ data: error.responseData, message: error.safeMessage }));
        }
      } else {
        logger.error(error);
        res.status(error.statusCode).json(ApiResponse.error({ message: error.safeMessage }));
        gracefulShutdown();
        return;
      }
    }
    if (error instanceof ZodError) {
      const data = {
        errors: error.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      };
      return res.status(400).json(ApiResponse.fail({ data }));
    }
    logger.error(error);
    res.status(500).json(ApiResponse.error({ message: 'Internal Server Error' }));
    gracefulShutdown();
    return;
  },
};
