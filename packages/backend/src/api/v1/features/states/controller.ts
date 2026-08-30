import { ERROR_MESSAGES } from '@/api/v1/constants/errors.js';
import type { StateService } from '@/api/v1/features/states/service.js';
import { ResourceIdSchema } from '@/api/v1/requests/types.js';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { parseValue } from '@/utils/parseValue/parseValue.js';
import {
  MarkStateSeenRequestBodySchema,
  type MarkStateSeenResponse,
  type GetStatesSeenResponse,
  type UnmarkStateSeenResponse,
  MarkCapitolSeenRequestBodySchema,
  type MarkCapitolSeenResponse,
  type UnmarkCapitolSeenResponse,
} from '@katieeitak/shared';
import type { Request, Response } from 'express';

export class StateController {
  stateService: StateService;
  constructor(stateService: StateService) {
    this.stateService = stateService;
  }

  public getStatesSeen = async (_: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const data = {
      userId,
    };
    const stateList = await this.stateService.getStatesSeen({ data });
    return res.status(200).json(
      ApiResponse.success<GetStatesSeenResponse>({
        data: stateList,
      }),
    );
  };

  public markStateSeen = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const parsedBody = parseValue({
      schema: MarkStateSeenRequestBodySchema,
      value: req.body,
      message: 'Incorrect request payload format, must include a state ID.',
    });
    const data = {
      userId,
      stateId: parsedBody.stateId,
    };
    const markedState = await this.stateService.markStateSeen({ data });
    return res.status(201).json(
      ApiResponse.success<MarkStateSeenResponse>({
        data: markedState,
      }),
    );
  };

  public markCapitolSeen = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const parsedBody = parseValue({
      schema: MarkCapitolSeenRequestBodySchema,
      value: req.body,
      message: 'Incorrect request payload format, must include a state ID.',
    });
    const data = {
      userId,
      stateId: parsedBody.stateId,
    };
    const markedCapitolState = await this.stateService.markCapitolSeen({ data });
    return res.status(201).json(
      ApiResponse.success<MarkCapitolSeenResponse>({
        data: markedCapitolState,
      }),
    );
  };

  public unmarkStateSeen = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { stateId } = req.params;
    const parsedStateId = parseValue({
      schema: ResourceIdSchema,
      value: stateId,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const data = {
      userId,
      stateId: parsedStateId,
    };
    const unmarkedState = await this.stateService.unmarkStateSeen({ data });
    return res.status(200).json(
      ApiResponse.success<UnmarkStateSeenResponse>({
        data: unmarkedState,
      }),
    );
  };

  public unmarkCapitolSeen = async (req: Request, res: Response) => {
    const userId = res.locals.userId as string;
    const { stateId } = req.params;
    const parsedStateId = parseValue({
      schema: ResourceIdSchema,
      value: stateId,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const data = {
      userId,
      stateId: parsedStateId,
    };
    const unmarkedCapitolState = await this.stateService.unmarkCapitolSeen({ data });
    return res.status(200).json(
      ApiResponse.success<UnmarkCapitolSeenResponse>({
        data: unmarkedCapitolState,
      }),
    );
  };
}
