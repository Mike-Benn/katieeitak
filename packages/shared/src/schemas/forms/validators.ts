import { z } from 'zod';
import { anxietyEventTypeOptions } from '../../constants/options.js';

// New Anxiety Event field validators
export const AnxietyEventDateSchema = z.iso.datetime({
  error: 'Please select a date.',
});

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
  .max(20, 'Title must be 20 characters or less.');
export type AnxietyEventType = z.infer<typeof AnxietyEventTypeSchema>;
