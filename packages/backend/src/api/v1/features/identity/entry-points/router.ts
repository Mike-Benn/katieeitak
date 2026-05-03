import { Router, type Request, type Response } from 'express';
import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES } from '@/api/v1/constants/errors.js';
import { IdentityService } from '../domain/service.js';
import type { CompleteAuthData } from '@katieeitak/shared';

const identityRouter: Router = Router();

// CompleteAuth
identityRouter.get('/', validateToken, async (req: Request, res: Response) => {
  if (!req.auth || !req.auth.payload.sub) {
    throw new AppError({
      message:
        'Payload malformed or error with validateToken, should not be able to reach this step of request handling with malformed req.auth.',
      statusCode: 500,
      isOperational: false,
      name: ERROR_NAMES.INTERNAL_SERVER_ERROR,
      safeMessage: 'Internal Server Error',
    });
  }
  const { sub } = req.auth.payload;
  const user = await IdentityService.completeAuth(sub);
  res.status(200).json(
    ApiResponse.success<CompleteAuthData>({
      data: user,
    }),
  );
});

export { identityRouter };
