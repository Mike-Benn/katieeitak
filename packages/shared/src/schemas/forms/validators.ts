import { z } from 'zod';
import { anxietyEventTypeOptions } from '../../constants/options.js';

// New Anxiety Event field validators
export const AnxietyEventDateSchema = z.iso.datetime({
  error: 'Please select a date.',
});
export const AnxietyEventIdSchema = z.string().min(1, 'Id is required.');

export const AnxietyEventTypeSchema = z.enum(
  anxietyEventTypeOptions.map((option) => option.value),
  {
    error: 'Please select an event type.',
  },
);
export const AnxietyEventSliderSchema = z.number().min(0).max(10);
export const AnxietyEventNotesSchema = z.string().max(300);
export const AnxietyEventTitleSchema = z
  .string({
    error: 'Please enter a short title for the event.',
  })
  .max(20, 'Title must be 20 characters or less.')
  .min(1, 'Please enter a title.');
export type AnxietyEventType = z.infer<typeof AnxietyEventTypeSchema>;

// Mark book read field validators
export const MarkBookReadPagesFieldSchema = z
  .string()
  .transform((val) => (val === '' ? null : Number(val)))
  .pipe(z.number().int().nonnegative().nullable());
export const MarkBookReadWordsFieldSchema = z
  .string()
  .transform((val) => (val === '' ? null : Number(val)))
  .pipe(z.number().int().nonnegative().nullable());
export const MarkBookReadRatingFieldSchema = z
  .number()
  .min(0.5, 'Must be at least 0.5')
  .max(5, 'Cannot exceed 5 stars')
  .multipleOf(0.5, 'Must be in half-star increments');

export const MarkBookReadFormSchema = z.object({
  pagesRead: MarkBookReadPagesFieldSchema,
  wordsRead: MarkBookReadWordsFieldSchema,
  rating: MarkBookReadRatingFieldSchema,
});
