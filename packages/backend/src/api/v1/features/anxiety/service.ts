import type { AnxietyRepository } from '@/api/v1/features/anxiety/repository.js';
import type {
  AnxietyEventBody,
  AnxietyEventCursor,
  AnxietyEventStatus,
  CompleteAnxietyEventByIdPayload,
  UpdateAnxietyEventBody,
} from '@katieeitak/shared';

interface CreateEventParams {
  userId: string;
  body: AnxietyEventBody;
}

interface UpdateAnxietyEventsByEventIdParams {
  userId: string;
  eventId: number;
  eventChanges: UpdateAnxietyEventBody;
}

interface GetAnxietyEventsByUserIdParams {
  limit: number;
  cursor: AnxietyEventCursor | null;
  userId: string;
  status: AnxietyEventStatus;
  isUnplanned: boolean;
}
interface CompleteAnxietyEventByIdParams {
  userId: string;
  id: string;
  payload: CompleteAnxietyEventByIdPayload;
}

interface UncompleteAnxietyEventByIdParams {
  userId: string;
  id: string;
}

interface DeleteAnxietyEventByIdParams {
  userId: string;
  id: string;
}

export class AnxietyService {
  private anxietyRepository: AnxietyRepository;
  constructor(anxietyRepository: AnxietyRepository) {
    this.anxietyRepository = anxietyRepository;
  }

  public createEvent = async ({ userId, body }: CreateEventParams) => {
    const anxietyEvent = await this.anxietyRepository.createEvent({ userId, body });
    return anxietyEvent;
  };

  public updateAnxietyEventByEventId = async ({
    userId,
    eventId,
    eventChanges,
  }: UpdateAnxietyEventsByEventIdParams) => {
    const anxietyEvent = await this.anxietyRepository.updateAnxietyEventByEventId({
      userId,
      eventId,
      eventChanges,
    });
    return anxietyEvent;
  };

  public getAnxietyEventsByUserId = async ({
    userId,
    limit,
    cursor,
    status,
    isUnplanned,
  }: GetAnxietyEventsByUserIdParams) => {
    const anxietyEvents = await this.anxietyRepository.getAnxietyEventsByUserId({
      userId,
      cursor,
      limit,
      status,
      isUnplanned,
    });
    return anxietyEvents;
  };

  public completeAnxietyEventById = async ({
    userId,
    id,
    payload,
  }: CompleteAnxietyEventByIdParams) => {
    const anxietyEvent = await this.anxietyRepository.completeAnxietyEventById({
      userId,
      id,
      payload,
    });
    return anxietyEvent;
  };

  public uncompleteAnxietyEventById = async ({ userId, id }: UncompleteAnxietyEventByIdParams) => {
    const anxietyEvent = await this.anxietyRepository.uncompleteAnxietyEventById({
      userId,
      id,
    });
    return anxietyEvent;
  };

  public deleteAnxietyEventById = async ({ userId, id }: DeleteAnxietyEventByIdParams) => {
    const anxietyEvent = await this.anxietyRepository.deleteAnxietyEventById({
      userId,
      id,
    });
    return anxietyEvent;
  };
}
