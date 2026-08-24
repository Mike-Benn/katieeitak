import type { PlateRaceService } from '@/api/v1/features/plate-races/service.js';
import type { Request, Response } from 'express';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import {
  CreatePlateRaceByUserIdRequestBodySchema,
  GetPastPlateRaceDescriptionsRequestQuerySchema,
  MarkPlateSeenRequestBodySchema,
  type CompletePlateRaceResponse,
  type CreatePlateRaceByUserIdResponse,
  type GetCurrentPlateRaceDescriptionResponse,
  type GetPastPlateRaceDescriptionsResponse,
  type GetPlateRaceDataResponse,
  type MarkPlateSeenResponse,
  type UnmarkPlateSeenResponse,
} from '@katieeitak/shared';
import { parseValue } from '@/utils/parseValue/parseValue.js';
import { ResourceIdSchema } from '@/api/v1/requests/types.js';
import { ERROR_MESSAGES } from '@/api/v1/constants/errors.js';

export class PlateRaceController {
  private plateRaceService: PlateRaceService;
  constructor(plateRaceService: PlateRaceService) {
    this.plateRaceService = plateRaceService;
  }

  public getPastPlateRaceDescriptions = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const parsedParams = parseValue({
      schema: GetPastPlateRaceDescriptionsRequestQuerySchema,
      value: req.query,
      message: 'Invalid query parameters.',
    });
    const cursor =
      parsedParams.cursorDate && parsedParams.cursorId
        ? { date: parsedParams.cursorDate, id: parsedParams.cursorId }
        : null;
    const data = { userId, limit: parsedParams.limit, cursor };
    const result = await this.plateRaceService.getPastPlateRaceDescriptions({ data });
    return res.status(200).json(
      ApiResponse.success<GetPastPlateRaceDescriptionsResponse>({
        data: {
          plateRaceDescriptions: result.items,
          nextCursor: result.nextCursor,
        },
      }),
    );
  };

  public getCurrentPlateRaceDescription = async (_: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const data = {
      userId,
    };
    const plateRaceDescription = await this.plateRaceService.getCurrentPlateRaceDescription({
      data,
    });
    return res.status(200).json(
      ApiResponse.success<GetCurrentPlateRaceDescriptionResponse>({
        data: plateRaceDescription,
      }),
    );
  };

  public createPlateRaceByUserId = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const body = parseValue({
      schema: CreatePlateRaceByUserIdRequestBodySchema,
      value: req.body,
      message: 'Incorrect request payload format, must include a title.',
    });
    const data = {
      title: body.title,
    };
    const newPlateRace = await this.plateRaceService.createPlateRaceByUserId({ userId, data });
    return res.status(201).json(
      ApiResponse.success<CreatePlateRaceByUserIdResponse>({
        data: newPlateRace,
      }),
    );
  };

  public getPlateRaceData = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { id } = req.params;
    const parsedId = parseValue({
      schema: ResourceIdSchema,
      value: id,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const data = {
      plateRaceId: parsedId,
      userId,
    };
    const plateRace = await this.plateRaceService.getPlateRaceData({ data });
    return res.status(200).json(
      ApiResponse.success<GetPlateRaceDataResponse>({
        data: plateRace,
      }),
    );
  };

  public completePlateRace = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { id } = req.params;
    const parsedId = parseValue({
      schema: ResourceIdSchema,
      value: id,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const data = {
      plateRaceId: parsedId,
      userId,
    };
    const completedPlateRace = await this.plateRaceService.completePlateRace({ data });
    return res.status(200).json(
      ApiResponse.success<CompletePlateRaceResponse>({
        data: completedPlateRace,
      }),
    );
  };

  public markPlateSeen = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { id } = req.params;
    const parsedPlateRaceId = parseValue({
      schema: ResourceIdSchema,
      value: id,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const parsedBody = parseValue({
      schema: MarkPlateSeenRequestBodySchema,
      value: req.body,
      message: 'Incorrect request payload format, must include a plate ID.',
    });

    const data = {
      userId,
      plateRaceId: parsedPlateRaceId,
      plateId: parsedBody.plateId,
    };
    const markedPlate = await this.plateRaceService.markPlateSeen({ data });
    return res.status(201).json(
      ApiResponse.success<MarkPlateSeenResponse>({
        data: markedPlate,
      }),
    );
  };

  public unmarkPlateSeen = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { id, plateId } = req.params;
    const parsedPlateRaceId = parseValue({
      schema: ResourceIdSchema,
      value: id,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const parsedPlateId = parseValue({
      schema: ResourceIdSchema,
      value: plateId,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const data = {
      userId,
      plateRaceId: parsedPlateRaceId,
      plateId: parsedPlateId,
    };
    const unmarkedPlate = await this.plateRaceService.unmarkPlateSeen({ data });
    return res.status(200).json(
      ApiResponse.success<UnmarkPlateSeenResponse>({
        data: unmarkedPlate,
      }),
    );
  };
}
