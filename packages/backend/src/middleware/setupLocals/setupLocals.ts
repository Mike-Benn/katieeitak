import type { NextFunction, Request, Response } from 'express';
import { IdentityService } from '@/api/v1/features/identity/domain/service.js';
import type { AuthenticatedRequest } from '@/api/v1/requests/types.js';

export async function setupLocals(req: Request, res: Response, next: NextFunction) {
  const authReq = req as AuthenticatedRequest;
  const user = await IdentityService.translateAuthId(authReq.auth.payload.sub);
  res.locals.userId = user.id;
  next();
}
