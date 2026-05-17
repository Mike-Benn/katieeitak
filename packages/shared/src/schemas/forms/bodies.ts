import { z } from 'zod';
import {
  AnxietyEventDateSchema,
  AnxietyEventSliderSchema,
  AnxietyEventTypeSchema,
  AnxietyEventNotesSchema,
  AnxietyEventTitleSchema,
} from './validators.js';

// New anxiety even form body
export const AnxietyEventBodySchema = z.object({
  anxietyLevel: AnxietyEventSliderSchema,
  excitementLevel: AnxietyEventSliderSchema,
  eventType: AnxietyEventTypeSchema,
  eventNotes: AnxietyEventNotesSchema,
  eventDate: AnxietyEventDateSchema,
  eventTitle: AnxietyEventTitleSchema,
});
export type AnxietyEventBody = z.infer<typeof AnxietyEventBodySchema>;
