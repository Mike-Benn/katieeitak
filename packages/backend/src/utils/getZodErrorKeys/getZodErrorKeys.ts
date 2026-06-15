import type { z } from 'zod';

interface GetZodErrorKeys<T> {
  parseResult: z.ZodSafeParseError<T>;
}

export function getZodErrorKeys<T>({ parseResult }: GetZodErrorKeys<T>) {
  return parseResult.error.issues.map((err) => err.path[0]).join(', ');
}
