import type { AnxietyRepository } from '@/api/v1/features/anxiety/repository.js';
import type {
  AnxietyEventBody,
  AnxietyEventCursor,
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
}
interface CompleteAnxietyEventByIdParams {
  userId: string;
  id: string;
  payload: CompleteAnxietyEventByIdPayload;
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
  }: GetAnxietyEventsByUserIdParams) => {
    const anxietyEvents = await this.anxietyRepository.getAnxietyEventsByUserId({
      userId,
      cursor,
      limit,
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
}
