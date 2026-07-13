import { validateToken } from '@/middleware/validateToken/validateToken.js';
import { Router, type Request, type Response } from 'express';
import { setupLocals } from '@/middleware/setupLocals/setupLocals.js';
import {
  type AnxietyEvent,
  AnxietyEventBodySchema,
  CompleteAnxietyEventByIdPayloadSchema,
  UpdateAnxietyEventBodySchema,
  type GetAnxietyEventsResponse,
  type CompleteAnxietyEventByIdResponse,
  GetAnxietyEventsRequestQuerySchema,
} from '@katieeitak/shared';
import { AnxietyService } from '@/api/v1/features/anxiety/domain/service.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { UpdateAnxietyEventPathSchema } from '@/api/v1/features/anxiety/schemas.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_MESSAGES, ERROR_NAMES } from '@/api/v1/constants/errors.js';

import { ResourceIdSchema } from '@/api/v1/requests/types.js';
import { parseValue } from '@/utils/parseValue/parseValue.js';
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
anxietyRouter.get('/', validateToken, setupLocals, async (req: Request, res: Response) => {
  const userId = res.locals.userId as string;
  const parsedParams = parseValue({
    schema: GetAnxietyEventsRequestQuerySchema,
    value: req.query,
    message: 'Invalid query parameters',
  });
  const cursor =
    parsedParams.cursorDate && parsedParams.cursorId
      ? { date: parsedParams.cursorDate, id: parsedParams.cursorId }
      : null;
  const result = await AnxietyService.getAnxietyEventsByUserId({
    userId,
    limit: parsedParams.limit ?? 5,
    cursor,
  });
  return res.status(200).json(
    ApiResponse.success<GetAnxietyEventsResponse>({
      data: {
        anxietyEvents: result.items,
        nextCursor: result.nextCursor,
      },
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

// CompleteAnxietyEvent
anxietyRouter.patch(
  '/:id/complete',
  validateToken,
  setupLocals,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = parseValue({
      schema: ResourceIdSchema,
      value: id,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const payload = parseValue({
      schema: CompleteAnxietyEventByIdPayloadSchema,
      value: req.body,
      message:
        'Incorrect or missing req payload, must include postAnxietyLevel, postExcitementLevel, and postNotes values.',
    });
    const userId = res.locals.userId as string;
    const anxietyEvent = await AnxietyService.CompleteAnxietyEventById({
      userId,
      id: parsedId,
      payload,
    });
    res.status(200).json(
      ApiResponse.success<CompleteAnxietyEventByIdResponse>({
        data: anxietyEvent,
      }),
    );
  },
);

export { anxietyRouter };
