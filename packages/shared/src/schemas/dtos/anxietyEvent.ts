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
  pre_notes: AnxietyEventNotesSchema,
  pre_anxiety_level: AnxietyEventSliderSchema,
  pre_excitement_level: AnxietyEventSliderSchema,
  post_notes: AnxietyEventNotesSchema,
  post_anxiety_level: AnxietyEventSliderSchema.nullable(),
  post_excitement_level: AnxietyEventSliderSchema.nullable(),
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

// CompleteAnxietyEvent
export const CompleteAnxietyEventByIdPayloadSchema = z.object({
  postNotes: AnxietyEventNotesSchema,
  postAnxietyLevel: AnxietyEventSliderSchema,
  postExcitementLevel: AnxietyEventSliderSchema,
});

export type CompleteAnxietyEventByIdPayload = z.infer<typeof CompleteAnxietyEventByIdPayloadSchema>;

export const CompleteAnxietyEventByIdQueryResultSchema = AnxietyEventSchema.pick({
  id: true,
});

export type CompleteAnxietyEventByIdQueryResult = z.infer<
  typeof CompleteAnxietyEventByIdQueryResultSchema
>;

export const CompleteAnxietyEventByIdResponseSchema = AnxietyEventSchema.pick({
  id: true,
});

export type CompleteAnxietyEventByIdResponse = z.infer<
  typeof CompleteAnxietyEventByIdResponseSchema
>;
