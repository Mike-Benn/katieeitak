import {
  AnxietyEventDateSchema,
  AnxietyEventSliderSchema,
  AnxietyEventTypeSchema,
  AnxietyEventNotesSchema,
} from '../forms/validators.js';
import { z } from 'zod';

export const DBAnxietyEventSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  event_type: AnxietyEventTypeSchema,
  notes: AnxietyEventNotesSchema,
  anxiety_level: AnxietyEventSliderSchema,
  excitement_level: AnxietyEventSliderSchema,
  date_occurred: AnxietyEventDateSchema,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});
