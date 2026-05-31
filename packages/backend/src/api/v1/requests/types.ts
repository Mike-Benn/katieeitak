import type { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  auth: NonNullable<Request['auth']> & {
    payload: { sub: string };
  };
}
