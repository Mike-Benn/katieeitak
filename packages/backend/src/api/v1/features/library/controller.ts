import type { LibraryService } from '@/api/v1/features/library/service.js';
import type { Request, Response } from 'express';
import {
  type MarkedBookReadResponse,
  MarkedBookReadPayloadSchema,
  type GetMarkedBookResponse,
} from '@katieeitak/shared';
import { ApiResponse } from '@/api/v1/responses/ApiResponse.js';
import { verifyBookKey } from '@/utils/verifyBookKey/verifyBookKey.js';

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
}
