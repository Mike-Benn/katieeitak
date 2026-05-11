import {
  AnxietyEventDateSchema,
  AnxietyEventSliderSchema,
  AnxietyEventTypeSchema,
  AnxietyEventNotesSchema,
} from '../forms/validators.js';
import { z } from 'zod';

export const DBAnxietyEventSchema = z.object({
  id: z.string(),
  type: AnxietyEventTypeSchema,
  notes: AnxietyEventNotesSchema,
  anxiety_level: AnxietyEventSliderSchema,
  excitement_level: AnxietyEventSliderSchema,
  date: AnxietyEventDateSchema,
});
