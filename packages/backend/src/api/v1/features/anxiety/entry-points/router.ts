import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { Router, type Request, type Response } from 'express';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';
import { type AnxietyEvent, AnxietyEventBodySchema } from '@katieeitak/shared';
import { AnxietyService } from '@/api/v1/features/anxiety/domain/service.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { UpdateAnxietyEventPathSchema } from '@/api/v1/features/anxiety/schemas.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES } from '@/api/v1/constants/errors.js';
import { UpdateAnxietyEventBodySchema } from '@katieeitak/shared';

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

// GetAnxietyEvents
anxietyRouter.get('/', validateToken, setupLocals, async (_req: Request, res: Response) => {
  const userId = res.locals.userId as string;
  const anxietyEvents = await AnxietyService.getEventsByUserId({ userId });
  res.status(200).json(
    ApiResponse.success<AnxietyEvent[]>({
      data: anxietyEvents,
    }),
  );
});

// UpdateAnxietyEvents
anxietyRouter.patch('/:id', validateToken, setupLocals, async (req: Request, res: Response) => {
  const { id: eventId } = req.params;
  const parsedEventId = UpdateAnxietyEventPathSchema.safeParse(eventId);
  if (parsedEventId.error) {
    throw new AppError({
      message: 'Incorrect path parameter format, must be a numerically positive, integer string.',
      isOperational: true,
      statusCode: 400,
      name: ERROR_NAMES.MALFORMED_REQUEST,
      safeMessage: 'Malformed request syntax.',
    });
  }
  const body = UpdateAnxietyEventBodySchema.parse(req.body);
  const userId = res.locals.userId as string;
  const anxietyEvent = await AnxietyService.updateAnxietyEventByEventId({
    userId,
    eventId: parsedEventId.data,
    eventChanges: body,
  });
  res.status(200).json(
    ApiResponse.success<AnxietyEvent>({
      data: anxietyEvent,
    }),
  );
});

export { anxietyRouter };
