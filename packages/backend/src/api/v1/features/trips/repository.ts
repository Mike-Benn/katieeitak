import { type Pool, type PoolClient } from 'pg';
import {
  type CompleteTripQueryResult,
  type CreateTripByUserIdQueryResult,
  type GetTripDataQueryResult,
  type MarkPlateSeenQueryResult,
  type UnmarkPlateSeenQueryResult,
  type GetCurrentTripIdByUserIdQueryResult,
  type GetTripByTripIdAndUserIdQueryResult,
  type GetCurrentTripDescriptionQueryResult,
  type TripDescriptionsCursor,
  type GetPastTripDescriptionsQueryResult,
} from '@katieeitak/shared';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_MESSAGES, ERROR_NAMES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';
import {
  type CompleteTripDto,
  type CreateTripByUserIdDto,
  type MarkPlateSeenDto,
  type UnmarkPlateSeenDto,
} from '@/api/v1/features/trips/dto.js';

interface CreateTripByUserIdParams {
  userId: string;
  data: CreateTripByUserIdDto;
  client?: PoolClient;
}

interface MarkPlateSeenParams {
  data: MarkPlateSeenDto;
  client?: PoolClient;
}

interface UnmarkPlateSeenParams {
  data: UnmarkPlateSeenDto;
  client?: PoolClient;
}

interface CompleteTripParams {
  data: CompleteTripDto;
  client?: PoolClient;
}

interface GetCurrentTripByUserIdParams {
  client?: PoolClient;
  userId: string;
}

interface GetTripDataParams {
  client?: PoolClient;
  tripId: string;
}

interface GetTripByTripIdAndUserIdParams {
  client?: PoolClient;
  userId: string;
  tripId: string;
}

interface GetCurrentTripDescription {
  client?: PoolClient;
  userId: string;
}

interface GetPastTripDescriptionsParams {
  limit: number;
  client?: PoolClient;
  userId: string;
  cursor: TripDescriptionsCursor | null;
}

export class TripRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public getCurrentTripDescription = async ({ client, userId }: GetCurrentTripDescription) => {
    const connection = client ?? this.pool;
    const values = [userId];
    const query = `
    SELECT 
      t.id, 
      t.title, 
      t.created_at, 
      t.date_concluded,
      COUNT(sp.trip_id)::int AS plates_seen_count
    FROM trips t
    LEFT JOIN seen_plates sp ON t.id = sp.trip_id
    WHERE t.user_id = $1 AND t.date_concluded IS NULL
    GROUP BY t.id`;
    const { rows } = await connection.query<GetCurrentTripDescriptionQueryResult>(query, values);
    return rows[0] || null;
  };

  public getPastTripDescriptions = async ({
    client,
    limit,
    userId,
    cursor,
  }: GetPastTripDescriptionsParams) => {
    const connection = client ?? this.pool;
    const values: unknown[] = [userId];
    let cursorClause = '';
    if (cursor) {
      values.push(cursor.date, cursor.id);
      cursorClause = 'AND (t.date_concluded, t.id) > ($2, $3)';
    }
    values.push(limit + 1);
    const query = `
      SELECT 
        t.id, 
        t.title, 
        t.created_at, 
        t.date_concluded,
        COUNT(sp.trip_id)::int AS plates_seen_count
      FROM trips t
      LEFT JOIN seen_plates sp ON t.id = sp.trip_id
      WHERE t.user_id = $1 AND t.date_concluded IS NOT NULL ${cursorClause}
      GROUP BY t.id
      ORDER BY t.date_concluded ASC, t.id ASC
      LIMIT $${values.length}
    `;

    const { rows } = await connection.query<GetPastTripDescriptionsQueryResult>(query, values);
    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const last = items[items.length - 1];

    return {
      items,
      nextCursor: hasMore && last ? { date: last.date_concluded, id: last.id } : null,
    };
  };

  public getCurrentTripByUserId = async ({ client, userId }: GetCurrentTripByUserIdParams) => {
    const connection = client ?? this.pool;
    const values = [userId];
    const query = `
      SELECT id
      FROM trips
      WHERE user_id = $1 AND date_concluded IS NULL
      LIMIT 1
    `;
    const { rows } = await connection.query<GetCurrentTripIdByUserIdQueryResult>(query, values);
    return rows[0];
  };

  public getTripData = async ({ tripId, client }: GetTripDataParams) => {
    const connection = client ?? this.pool;
    const values = [tripId];
    const query = `
      SELECT p.id, p.name, p.nickname, p.plate_url, sp.date_seen
      FROM plates AS p
      LEFT JOIN seen_plates AS sp
      ON p.id = sp.plate_id AND sp.trip_id = $1
    `;
    const { rows } = await connection.query<GetTripDataQueryResult>(query, values);
    return rows;
  };
  public getTripByTripIdAndUserId = async ({
    userId,
    tripId,
    client,
  }: GetTripByTripIdAndUserIdParams) => {
    const connection = client ?? this.pool;
    const values = [userId, tripId];
    const query = `
      SELECT id, title, created_at, date_concluded
      FROM trips
      WHERE user_id = $1 AND id = $2
    `;
    const { rows } = await connection.query<GetTripByTripIdAndUserIdQueryResult>(query, values);
    if (rows[0]) {
      return rows[0];
    } else {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        isOperational: true,
        statusCode: 404,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      });
    }
  };

  public createTripByUserId = async ({ userId, data, client }: CreateTripByUserIdParams) => {
    const connection = client ?? this.pool;
    const values = [userId, data.title];
    const query = `
        INSERT INTO trips (user_id, title)
        VALUES ($1, $2)
        RETURNING id, title
    `;
    const { rows } = await connection.query<CreateTripByUserIdQueryResult>(query, values);
    const newTrip = rows[0];
    if (!newTrip) {
      throw new AppError({
        message: 'Create trip returned undefined result, impossible state.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return newTrip;
  };

  public completeTrip = async ({ data, client }: CompleteTripParams) => {
    const connection = client ?? this.pool;
    const values = [data.userId, data.tripId];
    const query = `
      UPDATE trips
      SET date_concluded = NOW()
      WHERE user_id = $1 AND id = $2
      RETURNING id
    `;
    const { rows } = await connection.query<CompleteTripQueryResult>(query, values);
    const completedTrip = rows[0];
    if (!completedTrip) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        isOperational: true,
        statusCode: 404,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      });
    }
    return completedTrip;
  };

  public markPlateSeen = async ({ data, client }: MarkPlateSeenParams) => {
    const connection = client ?? this.pool;
    const values = [data.plateId, data.tripId];
    const query = `
      INSERT INTO seen_plates (plate_id, trip_id)
      VALUES ($1, $2)
      RETURNING id, plate_id, date_seen
    `;
    const { rows } = await connection.query<MarkPlateSeenQueryResult>(query, values);
    if (!rows[0]) {
      throw new AppError({
        message: 'Insert seen plate returned undefined result, impossible state.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return rows[0];
  };

  public unmarkPlateSeen = async ({ data, client }: UnmarkPlateSeenParams) => {
    const connection = client ?? this.pool;
    const values = [data.plateId, data.tripId];
    const query = `
      DELETE 
      FROM seen_plates
      WHERE plate_id = $1 AND trip_id = $2
      RETURNING plate_id
    `;
    const { rows } = await connection.query<UnmarkPlateSeenQueryResult>(query, values);
    if (!rows[0]) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        isOperational: true,
        statusCode: 404,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      });
    }
    return rows[0];
  };
}
