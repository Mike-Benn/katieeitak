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

export const UpdateAnxietyEventBodySchema = AnxietyEventBodySchema.partial()

  .refine((data) => Object.keys(data).length > 0, {
    message: 'You must provide at least one field to update.',
  });
export type UpdateAnxietyEventBody = z.infer<typeof UpdateAnxietyEventBodySchema>;
