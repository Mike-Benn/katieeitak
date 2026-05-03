import type { Request, Response, NextFunction } from 'express';
import type { z } from 'zod';

export const validateReqBody = (schema: z.ZodType) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw result.error;
    }
    req.body = result.data;
    next();
  };
};
