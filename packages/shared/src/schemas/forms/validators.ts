import { z } from 'zod';
import { anxietyEventTypeOptions } from '../../constants/options.js';

// New Anxiety Event field validators
export const AnxietyEventDateSchema = z.coerce.date();
export const AnxietyEventTypeSchema = z.enum(anxietyEventTypeOptions.map((option) => option.value));
export const AnxietyEventSliderSchema = z.number().min(0).max(10);
export const AnxietyEventNotesSchema = z.string().max(300);
export type AnxietyEventType = z.infer<typeof AnxietyEventTypeSchema>;
