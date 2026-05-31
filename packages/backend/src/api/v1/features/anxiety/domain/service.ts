import { AnxietyRepository } from '@/api/v1/features/anxiety/data-access/repository.js';
import type { AnxietyEventBody, UpdateAnxietyEventBody } from '@katieeitak/shared';

interface CreateEventParams {
  userId: string;
  body: AnxietyEventBody;
}
interface GetEventsByUserIdParams {
  userId: string;
}

interface UpdateAnxietyEventsByEventIdParams {
  userId: string;
  eventId: number;
  eventChanges: UpdateAnxietyEventBody;
}

export const AnxietyService = {
  createEvent: async ({ userId, body }: CreateEventParams) => {
    const anxietyEvent = await AnxietyRepository.createEvent({ userId, body });
    return anxietyEvent;
  },
  getEventsByUserId: async ({ userId }: GetEventsByUserIdParams) => {
    const anxietyEvents = await AnxietyRepository.getEventsByUserId({ userId });
    return anxietyEvents;
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
};
