import { z } from 'zod';
import {
  AnxietyEventTitleSchema,
  AnxietyEventDateSchema,
  AnxietyEventTypeSchema,
  AnxietyEventNotesSchema,
  AnxietyEventSliderSchema,
} from '../forms/validators.js';

export const AnxietyEventSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: AnxietyEventTitleSchema,
  event_type: AnxietyEventTypeSchema,
  notes: AnxietyEventNotesSchema,
  anxiety_level: AnxietyEventSliderSchema,
  excitement_level: AnxietyEventSliderSchema,
  date_occurred: AnxietyEventDateSchema,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});
export type AnxietyEvent = z.infer<typeof AnxietyEventSchema>;
export const GetAnxietyEventsResponseSchema = z.object({
  num_found: z.number().int().nonnegative(),
  offset: z.number().int().nonnegative(),
  anxietyEvents: z.array(AnxietyEventSchema),
});
export type GetAnxietyEventsResponse = z.infer<typeof GetAnxietyEventsResponseSchema>;
