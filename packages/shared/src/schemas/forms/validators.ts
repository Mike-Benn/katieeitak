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
  .string('Pages read must be a whole number')
  .transform((val) => (val === '' ? null : Number(val)))
  .pipe(
    z
      .number('Pages read must be a whole number')
      .int('Pages read must be a whole number')
      .nonnegative('Pages read must be a whole number')
      .nullable(),
  );
export const MarkBookReadWordsFieldSchema = z
  .string('Words read must be a whole number')
  .transform((val) => (val === '' ? null : Number(val)))
  .pipe(
    z
      .number('Words read must be a whole number')
      .int('Words read must be a whole number')
      .nonnegative('Words read must be a whole number')
      .nullable(),
  );

export const MarkBookReadRatingFieldSchema = z
  .number('Rating is required')
  .int('Rating is required')
  .min(1, 'Rating must be between 1-5 stars')
  .max(10, 'Rating must be between 1-5 stars');

export const MarkBookReadFormSchema = z.object({
  pagesRead: MarkBookReadPagesFieldSchema,
  wordsRead: MarkBookReadWordsFieldSchema,
  rating: MarkBookReadRatingFieldSchema,
});

export const PatchReadBookFormSchema = MarkBookReadFormSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'You must provide at least one field to update.',
  },
);

export type MarkBookReadForm = z.infer<typeof MarkBookReadFormSchema>;
