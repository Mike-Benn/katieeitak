import { z } from 'zod';
import {
  AnxietyEventDateSchema,
  AnxietyEventSliderSchema,
  AnxietyEventTypeSchema,
  AnxietyEventNotesSchema,
} from '../forms/validators.js';

export const DBUserSchema = z.object({
  id: z.string(),
  auth0_id: z.string(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const DBAnxietyEventSchema = z.object({
  id: z.string(),
  type: AnxietyEventTypeSchema,
  notes: AnxietyEventNotesSchema,
  anxiety_level: AnxietyEventSliderSchema,
  excitement_level: AnxietyEventSliderSchema,
  date: AnxietyEventDateSchema,
});
