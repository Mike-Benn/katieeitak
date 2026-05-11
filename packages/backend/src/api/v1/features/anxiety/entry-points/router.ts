import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { Router, type Request, type Response } from 'express';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';
import { type AnxietyEvent, AnxietyEventBodySchema } from '@katieeitak/shared';
import { AnxietyService } from '@/api/v1/features/anxiety/domain/service.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';

const anxietyRouter: Router = Router();

// SubmitAnxietyEvent
anxietyRouter.post('/', validateToken, setupLocals, async (req: Request, res: Response) => {
  const userId = res.locals.userId as string;
  const body = AnxietyEventBodySchema.parse(req.body);
  const anxietyEvent = await AnxietyService.createEvent({ userId, body });
  res.status(201).json(
    ApiResponse.success<AnxietyEvent>({
      data: anxietyEvent,
    }),
  );
});

anxietyRouter.get('/', validateToken, setupLocals, async (_req: Request, res: Response) => {
  const userId = res.locals.userId as string;
  const anxietyEvents = await AnxietyService.getEventsByUserId({ userId });
  res.status(200).json(
    ApiResponse.success<AnxietyEvent[]>({
      data: anxietyEvents,
    }),
  );
});

export { anxietyRouter };
