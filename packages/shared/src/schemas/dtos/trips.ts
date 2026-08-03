import { z } from 'zod';

// plates
export const MasterLicensePlateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  nickname: z.string(),
  plate_url: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type MasterLicensePlate = z.infer<typeof MasterLicensePlateSchema>;

// seen_plates
export const MasterSeenPlateSchema = z.object({
  id: z.string(),
  plate_id: z.number().int(),
  trip_id: z.string(),
  date_seen: z.iso.datetime(),
});

export type MasterSeenPlate = z.infer<typeof MasterSeenPlateSchema>;

// trips
export const MasterTripSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  date_concluded: z.iso.datetime(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type MasterTrip = z.infer<typeof MasterTripSchema>;

export const GetCurrentTripIdByUserIdQueryResultSchema = MasterTripSchema.pick({
  id: true,
  user_id: true,
  title: true,
  created_at: true,
});

export type GetCurrentTripIdByUserIdQueryResult = z.infer<
  typeof GetCurrentTripIdByUserIdQueryResultSchema
>;

export const GetTripPlateListByTripIdQueryResultSchema = MasterLicensePlateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  plate_url: true,
}).extend({
  date_seen: z.iso.datetime().nullable(),
});

export type GetTripPlateListByTripIdQueryResult = z.infer<
  typeof GetTripPlateListByTripIdQueryResultSchema
>;

export const GetCurrentTripByUserIdResponseSchema = z
  .array(GetTripPlateListByTripIdQueryResultSchema)
  .nullable();
export type GetCurrentTripByUserIdResponse = z.infer<typeof GetCurrentTripByUserIdResponseSchema>;

export const LicensePlateSchema = MasterLicensePlateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  plate_url: true,
}).extend({
  date_seen: z.iso.datetime().nullable(),
});

export type LicensePlate = z.infer<typeof LicensePlateSchema>;

export const CreateTripByUserIdRequestBodySchema = MasterTripSchema.pick({
  title: true,
});

export type CreateTripByUserIdRequestBody = z.infer<typeof CreateTripByUserIdRequestBodySchema>;

export const CreateTripByUserIdQueryResultSchema = MasterTripSchema.pick({
  id: true,
  title: true,
});

export type CreateTripByUserIdQueryResult = z.infer<typeof CreateTripByUserIdQueryResultSchema>;

export const CreateTripByUserIdResponseSchema = MasterTripSchema.pick({
  id: true,
  title: true,
});

export type CreateTripByUserIdResponse = z.infer<typeof CreateTripByUserIdResponseSchema>;

export const CompleteTripByIdQueryResultSchema = MasterTripSchema.pick({
  id: true,
});

export type CompleteTripByIdQueryResult = z.infer<typeof CompleteTripByIdQueryResultSchema>;

export const CompleteTripByIdResponseSchema = MasterTripSchema.pick({
  id: true,
});

export type CompleteTripByIdResponse = z.infer<typeof CompleteTripByIdResponseSchema>;

export const MarkPlateSeenQueryResultSchema = MasterSeenPlateSchema.pick({
  id: true,
  plate_id: true,
  date_seen: true,
});

export type MarkPlateSeenQueryResult = z.infer<typeof MarkPlateSeenQueryResultSchema>;

export const MarkPlateSeenResponseSchema = MasterSeenPlateSchema.pick({
  id: true,
  plate_id: true,
  date_seen: true,
});

export type MarkPlateSeenResponse = z.infer<typeof MarkPlateSeenResponseSchema>;

export const MarkPlateSeenRequestBodySchema = MasterSeenPlateSchema.pick({
  plate_id: true,
});

export type MarkPlateSeenRequestBody = z.infer<typeof MarkPlateSeenRequestBodySchema>;
