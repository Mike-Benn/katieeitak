import type { LibraryService } from '@/api/v1/features/library/service.js';
import type { Request, Response } from 'express';
import {
  type MarkedBookReadResponse,
  MarkedBookReadPayloadSchema,
  type GetMarkedBookResponse,
  PatchReadBookByIdPayloadSchema,
  type PatchReadBookByIdResponse,
} from '@katieeitak/shared';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { verifyBookKey } from '@/utils/verifyBookKey/verifyBookKey.js';
import { ResourceIdSchema } from '@/api/v1/requests/types.js';
import { ERROR_MESSAGES } from '@/api/v1/constants/errors.js';
import { parseValue } from '@/utils/parseValue/parseValue.js';

export class LibraryController {
  private libraryService: LibraryService;
  constructor(libraryService: LibraryService) {
    this.libraryService = libraryService;
  }

  public markBookRead = async (req: Request, res: Response) => {
    const user_id = res.locals.userId as string;
    const markedBookPayload = MarkedBookReadPayloadSchema.parse(req.body);
    const markedBook = await this.libraryService.markBookRead({ markedBookPayload, user_id });
    res.status(201).json(
      ApiResponse.success<MarkedBookReadResponse>({
        data: markedBook,
      }),
    );
  };

  public getMarkedBook = async (req: Request, res: Response) => {
    const user_id = res.locals.userId as string;
    const { key } = req.params;
    verifyBookKey(key);
    const markedBook = await this.libraryService.getMarkedBook({ user_id, ol_book_key: key });
    res.status(200).json(
      ApiResponse.success<GetMarkedBookResponse>({
        data: markedBook ?? null,
      }),
    );
  };

  public patchReadBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = parseValue({
      schema: ResourceIdSchema,
      value: id,
      message: ERROR_MESSAGES.INVALID_ID_PATH_PARAMETER_FORMAT,
    });
    const body = parseValue({
      schema: PatchReadBookByIdPayloadSchema,
      value: req.body,
      message:
        'Incorrect request payload format, must include an updated rating, word_count, and/or page_count value',
    });
    const userId = res.locals.userId as string;
    const readBook = await this.libraryService.patchReadBookById({
      user_id: userId,
      id: parsedId,
      payload: body,
    });
    res.status(200).json(
      ApiResponse.success<PatchReadBookByIdResponse>({
        data: readBook,
      }),
    );
  };
}
