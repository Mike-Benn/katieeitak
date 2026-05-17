import { z } from 'zod';
import { anxietyEventTypeOptions } from '../../constants/options.js';

const eventTypes = anxietyEventTypeOptions.map((option) => option.value) as [string, ...string[]];

// New Anxiety Event field validators
export const AnxietyEventDateSchema = z.iso.datetime({
  error: 'Please select a date.',
});
export const AnxietyEventTypeSchema = z.enum(eventTypes, {
  error: 'Please select an event type.',
});
export const AnxietyEventSliderSchema = z.number().min(0).max(10);
export const AnxietyEventNotesSchema = z.string().max(300);
export const AnxietyEventDescriptionSchema = z.string().max(30);
export type AnxietyEventType = z.infer<typeof AnxietyEventTypeSchema>;
