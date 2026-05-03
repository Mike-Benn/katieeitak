import type { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from './ErrorHandler.js';

export const globalErrorHandler = async (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  await ErrorHandler.handleError(error, res);
};
