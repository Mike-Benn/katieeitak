import { type Pool, type PoolClient } from 'pg';
import {
  type CompleteTripByIdQueryResult,
  type CreateTripByUserIdQueryResult,
  type GetCurrentTripIdByUserIdQueryResult,
  type GetTripPlateListByTripIdQueryResult,
  type MarkPlateSeenQueryResult,
} from '@katieeitak/shared';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_MESSAGES, ERROR_NAMES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';
import {
  type CompleteTripByIdDto,
  type CreateTripByUserIdDto,
  type MarkPlateSeenDto,
} from '@/api/v1/features/trips/dto.js';

interface GetCurrentTripByUserIdParams {
  userId: string;
  client?: PoolClient;
}

interface GetTripPlateListByTripIdParams {
  tripId: string;
  client?: PoolClient;
}

interface CreateTripByUserIdParams {
  userId: string;
  data: CreateTripByUserIdDto;
  client?: PoolClient;
}

interface CompleteTripByUserIdParams {
  userId: string;
  data: CompleteTripByIdDto;
  client?: PoolClient;
}

interface MarkPlateSeenParams {
  data: MarkPlateSeenDto;
  client?: PoolClient;
}

export class TripRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public getCurrentTripByUserId = async ({ userId, client }: GetCurrentTripByUserIdParams) => {
    const connection = client ?? this.pool;
    const values = [userId];
    const query = `
        SELECT id, user_id, title, created_at
        FROM trips
        WHERE user_id = $1 AND trips.date_concluded IS NULL
        LIMIT 1
    `;
    const { rows } = await connection.query<GetCurrentTripIdByUserIdQueryResult>(query, values);
    return rows[0];
  };

  public getTripPlateListByTripId = async ({ tripId, client }: GetTripPlateListByTripIdParams) => {
    const connection = client ?? this.pool;
    const values = [tripId];
    const query = `
        SELECT p.id, p.name, p.nickname, p.plate_url, sp.date_seen
        FROM plates AS p
        LEFT JOIN seen_plates AS sp
        ON p.id = sp.plate_id AND sp.trip_id = $1
    `;
    const { rows } = await connection.query<GetTripPlateListByTripIdQueryResult>(query, values);
    return rows;
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

  public completeTripById = async ({ userId, data, client }: CompleteTripByUserIdParams) => {
    const connection = client ?? this.pool;
    const values = [userId, data.id];
    const query = `
      UPDATE trips
      SET date_concluded = NOW()
      WHERE user_id = $1 AND id = $2
      RETURNING id
    `;
    const { rows } = await connection.query<CompleteTripByIdQueryResult>(query, values);
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
}
