import { type TripService } from '@/api/v1/features/trips/service.js';
import type { Request, Response } from 'express';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import {
  type CompleteTripResponse,
  CreateTripByUserIdRequestBodySchema,
  type CreateTripByUserIdResponse,
  GetTripDescriptionsRequestQuerySchema,
  MarkPlateSeenRequestBodySchema,
  type MarkPlateSeenResponse,
  type UnmarkPlateSeenResponse,
  type GetTripDescriptionsResponse,
  type GetTripDataResponse,
} from '@katieeitak/shared';
import { parseValue } from '@/utils/parseValue/parseValue.js';
import { ResourceIdSchema } from '@/api/v1/requests/types.js';
import { ERROR_MESSAGES } from '@/api/v1/constants/errors.js';

export class TripController {
  private tripService: TripService;
  constructor(tripService: TripService) {
    this.tripService = tripService;
  }

  public getTripDescriptions = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const parsedParams = parseValue({
      schema: GetTripDescriptionsRequestQuerySchema,
      value: req.query,
      message: 'Invalid query parameters.',
    });
    const cursor =
      parsedParams.cursorDate && parsedParams.cursorId
        ? { date: parsedParams.cursorDate, id: parsedParams.cursorId }
        : null;
    const data = { userId, status: parsedParams.status, limit: parsedParams.limit, cursor };
    const result = await this.tripService.getTripDescriptions({ data });
    return res.status(200).json(
      ApiResponse.success<GetTripDescriptionsResponse>({
        data: {
          tripDescriptions: result.items,
          nextCursor: result.nextCursor,
        },
      }),
    );
  };

  public createTripByUserId = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const body = parseValue({
      schema: CreateTripByUserIdRequestBodySchema,
      value: req.body,
      message: 'Incorrect request payload format, must include a title.',
    });
    const data = {
      title: body.title,
    };
    const newTrip = await this.tripService.createTripByUserId({ userId, data });
    return res.status(201).json(
      ApiResponse.success<CreateTripByUserIdResponse>({
        data: newTrip,
      }),
    );
  };

  public getTripData = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { id } = req.params;
    const parsedId = parseValue({
      schema: ResourceIdSchema,
      value: id,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const data = {
      tripId: parsedId,
      userId,
    };
    const trip = await this.tripService.getTripData({ data });
    return res.status(200).json(
      ApiResponse.success<GetTripDataResponse>({
        data: trip,
      }),
    );
  };

  public completeTrip = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { id } = req.params;
    const parsedId = parseValue({
      schema: ResourceIdSchema,
      value: id,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const data = {
      tripId: parsedId,
      userId,
    };
    const completedTrip = await this.tripService.completeTrip({ data });
    return res.status(200).json(
      ApiResponse.success<CompleteTripResponse>({
        data: completedTrip,
      }),
    );
  };

  public markPlateSeen = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { tripId } = req.params;
    const parsedTripId = parseValue({
      schema: ResourceIdSchema,
      value: tripId,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const parsedBody = parseValue({
      schema: MarkPlateSeenRequestBodySchema,
      value: req.body,
      message: 'Incorrect request payload format, must include a plate ID.',
    });

    const data = {
      userId,
      tripId: parsedTripId,
      plateId: parsedBody.plateId,
    };
    const markedPlate = await this.tripService.markPlateSeen({ data });
    return res.status(201).json(
      ApiResponse.success<MarkPlateSeenResponse>({
        data: markedPlate,
      }),
    );
  };

  public unmarkPlateSeen = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { tripId, plateId } = req.params;
    const parsedTripId = parseValue({
      schema: ResourceIdSchema,
      value: tripId,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const parsedPlateId = parseValue({
      schema: ResourceIdSchema,
      value: plateId,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const data = {
      userId,
      tripId: parsedTripId,
      plateId: parsedPlateId,
    };
    const unmarkedPlate = await this.tripService.unmarkPlateSeen({ data });
    return res.status(200).json(
      ApiResponse.success<UnmarkPlateSeenResponse>({
        data: unmarkedPlate,
      }),
    );
  };
}
