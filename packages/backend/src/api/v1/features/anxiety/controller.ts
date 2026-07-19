import { ERROR_MESSAGES, ERROR_NAMES } from '@/api/v1/constants/errors.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { UpdateAnxietyEventPathSchema } from '@/api/v1/features/anxiety/schemas.js';
import type { AnxietyService } from '@/api/v1/features/anxiety/service.js';
import { ResourceIdSchema } from '@/api/v1/requests/types.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { parseValue } from '@/utils/parseValue/parseValue.js';
import {
  AnxietyEventBodySchema,
  CompleteAnxietyEventByIdPayloadSchema,
  GetAnxietyEventsRequestQuerySchema,
  UpdateAnxietyEventBodySchema,
  type AnxietyEvent,
  type CompleteAnxietyEventByIdResponse,
  type GetAnxietyEventsResponse,
} from '@katieeitak/shared';
import type { Request, Response } from 'express';

export class AnxietyController {
  private anxietyService: AnxietyService;
  constructor(anxietyService: AnxietyService) {
    this.anxietyService = anxietyService;
  }

  public createEvent = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const body = AnxietyEventBodySchema.parse(req.body);
    const anxietyEvent = await this.anxietyService.createEvent({ userId, body });
    res.status(201).json(
      ApiResponse.success<AnxietyEvent>({
        data: anxietyEvent,
      }),
    );
  };

  public getAnxietyEventsByUserId = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    console.log(req.query);
    const parsedParams = parseValue({
      schema: GetAnxietyEventsRequestQuerySchema,
      value: req.query,
      message: 'Invalid query parameters',
    });
    const cursor =
      parsedParams.cursorDate && parsedParams.cursorId
        ? { date: parsedParams.cursorDate, id: parsedParams.cursorId }
        : null;
    const result = await this.anxietyService.getAnxietyEventsByUserId({
      userId,
      limit: parsedParams.limit ?? 5,
      cursor,
      status: parsedParams.status,
    });
    return res.status(200).json(
      ApiResponse.success<GetAnxietyEventsResponse>({
        data: {
          anxietyEvents: result.items,
          nextCursor: result.nextCursor,
        },
      }),
    );
  };

  public updateAnxietyEventByEventId = async (req: Request, res: Response) => {
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
    const anxietyEvent = await this.anxietyService.updateAnxietyEventByEventId({
      userId,
      eventId: parsedEventId.data,
      eventChanges: body,
    });
    res.status(200).json(
      ApiResponse.success<AnxietyEvent>({
        data: anxietyEvent,
      }),
    );
  };

  public completeAnxietyEventById = async (req: Request, res: Response) => {
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
    const anxietyEvent = await this.anxietyService.completeAnxietyEventById({
      userId,
      id: parsedId,
      payload,
    });
    res.status(200).json(
      ApiResponse.success<CompleteAnxietyEventByIdResponse>({
        data: anxietyEvent,
      }),
    );
  };
}
