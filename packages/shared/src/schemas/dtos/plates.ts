import { z } from 'zod';

export const LicensePlateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  nickname: z.string(),
  plate_url: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type LicensePlate = z.infer<typeof LicensePlateSchema>;

export const GetLicensePlatesQueryResultSchema = LicensePlateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  plate_url: true,
});

export type GetLicensePlatesQueryResult = z.infer<typeof GetLicensePlatesQueryResultSchema>;

export const GetLicensePlatesResponseSchema = z.object({
  licensePlates: z.array(
    LicensePlateSchema.pick({
      id: true,
      name: true,
      nickname: true,
      plate_url: true,
    }),
  ),
});

export type GetLicensePlatesResponse = z.infer<typeof GetLicensePlatesResponseSchema>;
