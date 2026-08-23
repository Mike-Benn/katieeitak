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
  date_concluded: z.iso.datetime().nullable(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type MasterTrip = z.infer<typeof MasterTripSchema>;

export const TripStatusSchema = z.enum(['current', 'past']);

export type TripStatus = z.infer<typeof TripStatusSchema>;

export const PlatesSeenCountSchema = z.number().int().nonnegative().max(51);

export type PlatesSeenCount = z.infer<typeof PlatesSeenCountSchema>;

export const TripDescriptionsCursorSchema = z.object({
  date: z.string(),
  id: z.string(),
});

export type TripDescriptionsCursor = z.infer<typeof TripDescriptionsCursorSchema>;

export const GetCurrentTripDescriptionQueryResultSchema = MasterTripSchema.pick({
  id: true,
  title: true,
  created_at: true,
  date_concluded: true,
}).extend({
  plates_seen_count: PlatesSeenCountSchema,
});

export const PlateRaceDescriptionSchema = MasterTripSchema.pick({
  id: true,
  created_at: true,
  date_concluded: true,
  title: true,
}).extend({
  plates_seen_count: z.number().int().nonnegative(),
});

export type PlateRaceDescription = z.infer<typeof PlateRaceDescriptionSchema>;

export type GetCurrentTripDescriptionQueryResult = z.infer<
  typeof GetCurrentTripDescriptionQueryResultSchema
>;

export const GetCurrentTripDescriptionResponseSchema = MasterTripSchema.pick({
  id: true,
  title: true,
  created_at: true,
  date_concluded: true,
})
  .extend({
    plates_seen_count: PlatesSeenCountSchema,
  })
  .nullable();

export type GetCurrentTripDescriptionResponse = z.infer<
  typeof GetCurrentTripDescriptionResponseSchema
>;

export const GetPastTripDescriptionsQueryResultSchema = MasterTripSchema.pick({
  id: true,
  title: true,
  created_at: true,
}).extend({
  plates_seen_count: PlatesSeenCountSchema,
  date_concluded: MasterTripSchema.shape.date_concluded.unwrap(),
});

export type GetPastTripDescriptionsQueryResult = z.infer<
  typeof GetPastTripDescriptionsQueryResultSchema
>;

export const GetPastTripDescriptionsResponseSchema = z.object({
  tripDescriptions: z.array(PlateRaceDescriptionSchema),
  nextCursor: TripDescriptionsCursorSchema.nullable(),
});

export type GetPastTripDescriptionsResponse = z.infer<typeof GetPastTripDescriptionsResponseSchema>;

export const GetPastTripDescriptionsRequestQuerySchema = z
  .object({
    cursorDate: z.iso.datetime().optional(),
    cursorId: z
      .string()
      .regex(/^\d+$/, {
        message: 'Invalid ID format. Expected a numeric database ID.',
      })
      .optional(),
    limit: z.coerce.number().int().positive().max(5).default(5),
  })
  .refine((data) => (data.cursorDate === null) === (data.cursorId === null), {
    message: 'cursorDate and cursorId must be provided together',
  });

export type GetPastTripDescriptionsRequestQuery = z.infer<
  typeof GetPastTripDescriptionsRequestQuerySchema
>;

export const GetCurrentTripIdByUserIdQueryResultSchema = MasterTripSchema.pick({
  id: true,
});

export type GetCurrentTripIdByUserIdQueryResult = z.infer<
  typeof GetCurrentTripIdByUserIdQueryResultSchema
>;

export const GetTripDataQueryResultSchema = MasterLicensePlateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  plate_url: true,
}).extend({
  date_seen: z.iso.datetime().nullable(),
});

export type GetTripDataQueryResult = z.infer<typeof GetTripDataQueryResultSchema>;

export const GetTripDataResponseSchema = z
  .object({
    trip: MasterTripSchema.pick({
      id: true,
      title: true,
      created_at: true,
      date_concluded: true,
    }),
    plateList: z.array(GetTripDataQueryResultSchema),
    count: z.number().int().nonnegative().max(51),
  })
  .nullable();

export type GetTripDataResponse = z.infer<typeof GetTripDataResponseSchema>;

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

export const CompleteTripQueryResultSchema = MasterTripSchema.pick({
  id: true,
});

export type CompleteTripQueryResult = z.infer<typeof CompleteTripQueryResultSchema>;

export const CompleteTripResponseSchema = MasterTripSchema.pick({
  id: true,
});

export type CompleteTripResponse = z.infer<typeof CompleteTripResponseSchema>;

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

export const MarkPlateSeenRequestBodySchema = z.object({
  plateId: z.number().int(),
});
export type MarkPlateSeenRequestBody = z.infer<typeof MarkPlateSeenRequestBodySchema>;

export const UnmarkPlateSeenQueryResultSchema = MasterSeenPlateSchema.pick({
  plate_id: true,
});

export type UnmarkPlateSeenQueryResult = z.infer<typeof UnmarkPlateSeenQueryResultSchema>;

export const UnmarkPlateSeenResponseSchema = MasterSeenPlateSchema.pick({
  plate_id: true,
});

export type UnmarkPlateSeenResponse = z.infer<typeof UnmarkPlateSeenResponseSchema>;

export const GetTripByTripIdAndUserIdQueryResultSchema = MasterTripSchema.pick({
  id: true,
  title: true,
  created_at: true,
  date_concluded: true,
});

export type GetTripByTripIdAndUserIdQueryResult = z.infer<
  typeof GetTripByTripIdAndUserIdQueryResultSchema
>;
