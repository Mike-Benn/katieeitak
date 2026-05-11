import type { DBAnxietyEventSchema } from '../db/anxiety_events.js';
import type { z } from 'zod';

export type AnxietyEvent = z.infer<typeof DBAnxietyEventSchema>;
