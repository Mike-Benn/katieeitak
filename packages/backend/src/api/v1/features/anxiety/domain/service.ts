import { AnxietyRepository } from '@/api/v1/features/anxiety/data-access/repository.js';
import type { AnxietyEventBody } from '@katieeitak/shared';

interface CreateEventParams {
  userId: string;
  body: AnxietyEventBody;
}
interface GetEventsByUserIdParams {
  userId: string;
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
};
