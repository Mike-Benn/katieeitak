import { z } from 'zod';

// states
export const MasterStateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  nickname: z.string(),
  plate_url: z.string(),
  flag_url: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type MasterState = z.infer<typeof MasterStateSchema>;

export const StateSchema = MasterStateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  flag_url: true,
}).extend({
  state_date_seen: z.iso.datetime().nullable(),
  capitol_date_seen: z.iso.datetime().nullable(),
});

export type State = z.infer<typeof StateSchema>;
// plate races
export const MasterPlateRaceSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  date_concluded: z.iso.datetime().nullable(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export type MasterPlateRace = z.infer<typeof MasterPlateRaceSchema>;

// seen_plates
export const MasterSeenPlateSchema = z.object({
  id: z.string(),
  state_id: z.number().int(),
  plate_race_id: z.string(),
  date_seen: z.iso.datetime(),
});

export type MasterSeenPlate = z.infer<typeof MasterSeenPlateSchema>;

// seen_states

export const MasterSeenStateSchema = z.object({
  id: z.string(),
  state_id: z.number().int(),
  user_id: z.string(),
  date_seen: z.iso.datetime(),
});

export type MasterSeenState = z.infer<typeof MasterSeenStateSchema>;

// seen_capitols

export const MasterSeenCapitolSchema = z.object({
  id: z.string(),
  state_id: z.number().int(),
  user_id: z.string(),
  date_seen: z.iso.datetime(),
});

export type MasterSeenCapitol = z.infer<typeof MasterSeenCapitolSchema>;

/**********************************************************************************************/

export const PlatesSeenCountSchema = z.number().int().nonnegative().max(51);

export type PlatesSeenCount = z.infer<typeof PlatesSeenCountSchema>;

export const PlateRaceDescriptionsCursorSchema = z.object({
  date: z.string(),
  id: z.string(),
});

export type PlateRaceDescriptionsCursor = z.infer<typeof PlateRaceDescriptionsCursorSchema>;

export const GetCurrentPlateRaceDescriptionQueryResultSchema = MasterPlateRaceSchema.pick({
  id: true,
  title: true,
  created_at: true,
  date_concluded: true,
}).extend({
  plates_seen_count: PlatesSeenCountSchema,
});

export const PlateRaceDescriptionSchema = MasterPlateRaceSchema.pick({
  id: true,
  created_at: true,
  date_concluded: true,
  title: true,
}).extend({
  plates_seen_count: PlatesSeenCountSchema,
});

export type PlateRaceDescription = z.infer<typeof PlateRaceDescriptionSchema>;

export type GetCurrentPlateRaceDescriptionQueryResult = z.infer<
  typeof GetCurrentPlateRaceDescriptionQueryResultSchema
>;

export const GetCurrentPlateRaceDescriptionResponseSchema = MasterPlateRaceSchema.pick({
  id: true,
  title: true,
  created_at: true,
  date_concluded: true,
})
  .extend({
    plates_seen_count: PlatesSeenCountSchema,
  })
  .nullable();

export type GetCurrentPlateRaceDescriptionResponse = z.infer<
  typeof GetCurrentPlateRaceDescriptionResponseSchema
>;

export const GetPastPlateRaceDescriptionsQueryResultSchema = MasterPlateRaceSchema.pick({
  id: true,
  title: true,
  created_at: true,
}).extend({
  plates_seen_count: PlatesSeenCountSchema,
  date_concluded: MasterPlateRaceSchema.shape.date_concluded.unwrap(),
});

export type GetPastPlateRaceDescriptionsQueryResult = z.infer<
  typeof GetPastPlateRaceDescriptionsQueryResultSchema
>;

export const GetPastPlateRaceDescriptionsResponseSchema = z.object({
  plateRaceDescriptions: z.array(PlateRaceDescriptionSchema),
  nextCursor: PlateRaceDescriptionsCursorSchema.nullable(),
});

export type GetPastPlateRaceDescriptionsResponse = z.infer<
  typeof GetPastPlateRaceDescriptionsResponseSchema
>;

export const GetPastPlateRaceDescriptionsRequestQuerySchema = z
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

export type GetPastPlateRaceDescriptionsRequestQuery = z.infer<
  typeof GetPastPlateRaceDescriptionsRequestQuerySchema
>;

export const GetCurrentPlateRaceIdByUserIdQueryResultSchema = MasterPlateRaceSchema.pick({
  id: true,
});

export type GetCurrentPlateRaceIdByUserIdQueryResult = z.infer<
  typeof GetCurrentPlateRaceIdByUserIdQueryResultSchema
>;

export const GetPlateRaceDataQueryResultSchema = MasterStateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  plate_url: true,
}).extend({
  date_seen: z.iso.datetime().nullable(),
});

export type GetPlateRaceDataQueryResult = z.infer<typeof GetPlateRaceDataQueryResultSchema>;

export const GetPlateRaceDataResponseSchema = z
  .object({
    plateRace: MasterPlateRaceSchema.pick({
      id: true,
      title: true,
      created_at: true,
      date_concluded: true,
    }),
    plateList: z.array(GetPlateRaceDataQueryResultSchema),
    count: PlatesSeenCountSchema,
  })
  .nullable();

export type GetPlateRaceDataResponse = z.infer<typeof GetPlateRaceDataResponseSchema>;

export const GetPlateRaceByPlateRaceIdAndUserIdQueryResultSchema = MasterPlateRaceSchema.pick({
  id: true,
  title: true,
  created_at: true,
  date_concluded: true,
});

export type GetPlateRaceByPlateRaceIdAndUserIdQueryResult = z.infer<
  typeof GetPlateRaceByPlateRaceIdAndUserIdQueryResultSchema
>;

export const LicensePlateSchema = MasterStateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  plate_url: true,
}).extend({
  date_seen: z.iso.datetime().nullable(),
});

export type LicensePlate = z.infer<typeof LicensePlateSchema>;

export const CreatePlateRaceByUserIdRequestBodySchema = MasterPlateRaceSchema.pick({
  title: true,
});

export type CreatePlateRaceByUserIdRequestBody = z.infer<
  typeof CreatePlateRaceByUserIdRequestBodySchema
>;

export const CreatePlateRaceByUserIdQueryResultSchema = MasterPlateRaceSchema.pick({
  id: true,
  title: true,
});

export type CreatePlateRaceByUserIdQueryResult = z.infer<
  typeof CreatePlateRaceByUserIdQueryResultSchema
>;

export const CreatePlateRaceByUserIdResponseSchema = MasterPlateRaceSchema.pick({
  id: true,
  title: true,
});

export type CreatePlateRaceByUserIdResponse = z.infer<typeof CreatePlateRaceByUserIdResponseSchema>;

export const CompletePlateRaceQueryResultSchema = MasterPlateRaceSchema.pick({
  id: true,
});

export type CompletePlateRaceQueryResult = z.infer<typeof CompletePlateRaceQueryResultSchema>;

export const CompletePlateRaceResponseSchema = MasterPlateRaceSchema.pick({
  id: true,
});

export type CompletePlateRaceResponse = z.infer<typeof CompletePlateRaceResponseSchema>;

export const MarkPlateSeenQueryResultSchema = MasterSeenPlateSchema.pick({
  id: true,
  state_id: true,
  date_seen: true,
});

export type MarkPlateSeenQueryResult = z.infer<typeof MarkPlateSeenQueryResultSchema>;

export const MarkPlateSeenResponseSchema = MasterSeenPlateSchema.pick({
  id: true,
  state_id: true,
  date_seen: true,
});

export type MarkPlateSeenResponse = z.infer<typeof MarkPlateSeenResponseSchema>;

export const MarkPlateSeenRequestBodySchema = z.object({
  stateId: z.number().int().nonnegative(),
});
export type MarkPlateSeenRequestBody = z.infer<typeof MarkPlateSeenRequestBodySchema>;

export const UnmarkPlateSeenQueryResultSchema = MasterSeenPlateSchema.pick({
  state_id: true,
});

export type UnmarkPlateSeenQueryResult = z.infer<typeof UnmarkPlateSeenQueryResultSchema>;

export const UnmarkPlateSeenResponseSchema = MasterSeenPlateSchema.pick({
  state_id: true,
});

export type UnmarkPlateSeenResponse = z.infer<typeof UnmarkPlateSeenResponseSchema>;

export const GetStatesSeenQueryResultSchema = MasterStateSchema.pick({
  id: true,
  name: true,
  nickname: true,
  flag_url: true,
}).extend({
  state_date_seen: z.iso.datetime().nullable(),
  capitol_date_seen: z.iso.datetime().nullable(),
});

export type GetStatesSeenQueryResult = z.infer<typeof GetStatesSeenQueryResultSchema>;

export const GetStatesSeenResponseSchema = z.array(GetStatesSeenQueryResultSchema);

export type GetStatesSeenResponse = z.infer<typeof GetStatesSeenResponseSchema>;

export const MarkStateSeenRequestBodySchema = z.object({
  stateId: z.number().int().nonnegative(),
});

export type MarkStateSeenRequestBody = z.infer<typeof MarkStateSeenRequestBodySchema>;

export const MarkStateSeenQueryResultSchema = MasterSeenStateSchema.pick({
  id: true,
  state_id: true,
  date_seen: true,
});

export type MarkStateSeenQueryResult = z.infer<typeof MarkStateSeenQueryResultSchema>;

export const MarkStateSeenResponseSchema = MasterSeenStateSchema.pick({
  id: true,
  state_id: true,
  date_seen: true,
});

export type MarkStateSeenResponse = z.infer<typeof MarkStateSeenResponseSchema>;

export const UnmarkStateSeenQueryResultSchema = MasterSeenStateSchema.pick({
  state_id: true,
});

export type UnmarkStateSeenQueryResult = z.infer<typeof UnmarkStateSeenQueryResultSchema>;

export const UnmarkStateSeenResponseSchema = MasterSeenStateSchema.pick({
  state_id: true,
});

export type UnmarkStateSeenResponse = z.infer<typeof UnmarkStateSeenResponseSchema>;

export const MarkCapitolSeenRequestBodySchema = z.object({
  stateId: z.number().int().nonnegative(),
});

export type MarkCapitolSeenRequestBody = z.infer<typeof MarkCapitolSeenRequestBodySchema>;

export const MarkCapitolSeenQueryResultSchema = MasterSeenCapitolSchema.pick({
  id: true,
  state_id: true,
  date_seen: true,
});

export type MarkCapitolSeenQueryResult = z.infer<typeof MarkCapitolSeenQueryResultSchema>;

export const MarkCapitolSeenResponseSchema = MasterSeenCapitolSchema.pick({
  id: true,
  state_id: true,
  date_seen: true,
});

export type MarkCapitolSeenResponse = z.infer<typeof MarkCapitolSeenResponseSchema>;

export const UnmarkCapitolSeenQueryResultSchema = MasterSeenCapitolSchema.pick({
  state_id: true,
});

export type UnmarkCapitolSeenQueryResult = z.infer<typeof UnmarkCapitolSeenQueryResultSchema>;

export const UnmarkCapitolSeenResponseSchema = MasterSeenCapitolSchema.pick({
  state_id: true,
});

export type UnmarkCapitolSeenResponse = z.infer<typeof UnmarkCapitolSeenResponseSchema>;
