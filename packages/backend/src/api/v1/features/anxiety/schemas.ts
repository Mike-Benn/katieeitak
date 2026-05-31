import { z } from 'zod';

export const UpdateAnxietyEventPathSchema = z.coerce.number().int().positive();
