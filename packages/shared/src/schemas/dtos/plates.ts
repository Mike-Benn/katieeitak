import { z } from 'zod';

export const MasterLicensePlateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  nickname: z.string(),
  plate_url: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type MasterLicensePlate = z.infer<typeof MasterLicensePlateSchema>;

export const LicensePlateSchema = MasterLicensePlateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  plate_url: true,
});

export type LicensePlate = z.infer<typeof LicensePlateSchema>;

export const GetLicensePlatesQueryResultSchema = LicensePlateSchema;

export type GetLicensePlatesQueryResult = z.infer<typeof GetLicensePlatesQueryResultSchema>;

export const GetLicensePlatesResponseSchema = z.array(LicensePlateSchema);

export type GetLicensePlatesResponse = z.infer<typeof GetLicensePlatesResponseSchema>;
