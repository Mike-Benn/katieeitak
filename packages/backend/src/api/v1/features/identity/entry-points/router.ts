import { Router, type Request, type Response } from 'express';
import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { IdentityService } from '@/api/v1/features/identity/domain/service.js';
import type { CompleteAuthData } from '@katieeitak/shared';
import type { AuthenticatedRequest } from '@/api/v1/requests/types.js';

const identityRouter: Router = Router();

// CompleteAuth
identityRouter.get('/', validateToken, async (req: Request, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  const { sub } = authReq.auth.payload;
  const user = await IdentityService.completeAuth(sub);
  res.status(200).json(
    ApiResponse.success<CompleteAuthData>({
      data: user,
    }),
  );
});

export { identityRouter };
