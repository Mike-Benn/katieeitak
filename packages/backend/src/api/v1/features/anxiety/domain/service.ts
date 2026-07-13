import { AnxietyRepository } from '@/api/v1/features/anxiety/data-access/repository.js';
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
/*
interface GetEventsByUserIdParams {
  limit: number;
  offset: number;
  userId: string;
}
*/
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

export const AnxietyService = {
  createEvent: async ({ userId, body }: CreateEventParams) => {
    const anxietyEvent = await AnxietyRepository.createEvent({ userId, body });
    return anxietyEvent;
  },

  updateAnxietyEventByEventId: async ({
    userId,
    eventId,
    eventChanges,
  }: UpdateAnxietyEventsByEventIdParams) => {
    const anxietyEvent = await AnxietyRepository.updateAnxietyEventByEventId({
      userId,
      eventId,
      eventChanges,
    });
    return anxietyEvent;
  },
  /*
  getEventsByUserId: async ({ limit, offset, userId }: GetEventsByUserIdParams) => {
    const num_found = await AnxietyRepository.countEventsByUserId({ userId: userId });
    const anxietyEvents = await AnxietyRepository.getEventsByUserId({ userId, limit, offset });
    return {
      num_found,
      anxietyEvents,
      offset,
    };
  },
  */
  getAnxietyEventsByUserId: async ({ userId, limit, cursor }: GetAnxietyEventsByUserIdParams) => {
    const anxietyEvents = await AnxietyRepository.getAnxietyEventsByUserId({
      userId,
      cursor,
      limit,
    });
    return anxietyEvents;
  },
  CompleteAnxietyEventById: async ({ userId, id, payload }: CompleteAnxietyEventByIdParams) => {
    const anxietyEvent = await AnxietyRepository.CompleteAnxietyEventById({ userId, id, payload });
    return anxietyEvent;
  },
};
