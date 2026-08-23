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
  pre_anxiety_level: AnxietyEventSliderSchema.nullable(),
  pre_excitement_level: AnxietyEventSliderSchema.nullable(),
  post_notes: AnxietyEventNotesSchema,
  post_anxiety_level: AnxietyEventSliderSchema.nullable(),
  post_excitement_level: AnxietyEventSliderSchema.nullable(),
  is_unplanned: z.boolean(),
  date_occurred: AnxietyEventDateSchema,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});
export type AnxietyEvent = z.infer<typeof AnxietyEventSchema>;

export const AnxietyEventCursorSchema = z.object({
  date: z.string(),
  id: z.string(),
});

export type AnxietyEventCursor = z.infer<typeof AnxietyEventCursorSchema>;

export const AnxietyEventStatusSchema = z.enum(['upcoming', 'completed']);

export type AnxietyEventStatus = z.infer<typeof AnxietyEventStatusSchema>;

export const AnxietyEventOccurrenceTypeSchema = z.enum(['expected', 'unplanned']);

export type AnxietyEventOccurrenceType = z.infer<typeof AnxietyEventOccurrenceTypeSchema>;

export const GetAnxietyEventsRequestQuerySchema = z
  .object({
    cursorDate: z.iso.datetime().optional(),
    cursorId: z
      .string()
      .regex(/^\d+$/, {
        message: 'Invalid ID format. Expected a numeric database ID.',
      })
      .optional(),
    status: AnxietyEventStatusSchema,
    limit: z.coerce.number().int().positive().max(50).optional(),
    occurrenceType: AnxietyEventOccurrenceTypeSchema,
  })
  .refine((data) => (data.cursorDate === null) === (data.cursorId === null), {
    message: 'cursorDate and cursorId must be provided together',
  });
export type GetAnxietyEventsRequestQuery = z.infer<typeof GetAnxietyEventsRequestQuerySchema>;

export const GetAnxietyEventsResponseSchema = z.object({
  anxietyEvents: z.array(AnxietyEventSchema),
  nextCursor: AnxietyEventCursorSchema.nullable(),
});
export type GetAnxietyEventsResponse = z.infer<typeof GetAnxietyEventsResponseSchema>;

// CompleteAnxietyEvent //
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

export const UncompleteAnxietyEventByIdQueryResultSchema = AnxietyEventSchema.pick({
  id: true,
});

export type UncompleteAnxietyEventByIdQueryResult = z.infer<
  typeof UncompleteAnxietyEventByIdQueryResultSchema
>;

export const UncompleteAnxietyEventByIdResponseSchema = AnxietyEventSchema.pick({
  id: true,
});

export type UncompleteAnxietyEventByIdResponse = z.infer<
  typeof UncompleteAnxietyEventByIdResponseSchema
>;

export const DeleteAnxietyEventByIdQueryResultSchema = AnxietyEventSchema.pick({
  id: true,
});

export type DeleteAnxietyEventByIdQueryResult = z.infer<
  typeof DeleteAnxietyEventByIdQueryResultSchema
>;

export const DeleteAnxietyEventByIdResponseSchema = AnxietyEventSchema.pick({
  id: true,
});

export type DeleteAnxietyEventByIdResponse = z.infer<typeof DeleteAnxietyEventByIdResponseSchema>;
