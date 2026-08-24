import { type Pool, type PoolClient } from 'pg';
import {
  type PlateRaceDescriptionsCursor,
  type MarkPlateSeenQueryResult,
  type UnmarkPlateSeenQueryResult,
  type GetCurrentPlateRaceDescriptionQueryResult,
  type GetPastPlateRaceDescriptionsQueryResult,
  type GetCurrentPlateRaceIdByUserIdQueryResult,
  type GetPlateRaceDataQueryResult,
  type GetPlateRaceByPlateRaceIdAndUserIdQueryResult,
  type CreatePlateRaceByUserIdQueryResult,
  type CompletePlateRaceQueryResult,
} from '@katieeitak/shared';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_MESSAGES, ERROR_NAMES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';
import {
  type CompletePlateRaceDto,
  type CreatePlateRaceByUserIdDto,
  type MarkPlateSeenDto,
  type UnmarkPlateSeenDto,
} from '@/api/v1/features/plate-races/dto.js';

interface CreatePlateRaceByUserIdParams {
  userId: string;
  data: CreatePlateRaceByUserIdDto;
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

interface CompletePlateRaceParams {
  data: CompletePlateRaceDto;
  client?: PoolClient;
}

interface GetCurrentPlateRaceByUserIdParams {
  client?: PoolClient;
  userId: string;
}

interface GetPlateRaceDataParams {
  client?: PoolClient;
  plateRaceId: string;
}

interface GetPlateRaceByPlateRaceIdAndUserIdParams {
  client?: PoolClient;
  userId: string;
  plateRaceId: string;
}

interface GetCurrentPlateRaceDescription {
  client?: PoolClient;
  userId: string;
}

interface GetPastPlateRaceDescriptionsParams {
  limit: number;
  client?: PoolClient;
  userId: string;
  cursor: PlateRaceDescriptionsCursor | null;
}

export class PlateRaceRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public getCurrentPlateRaceDescription = async ({
    client,
    userId,
  }: GetCurrentPlateRaceDescription) => {
    const connection = client ?? this.pool;
    const values = [userId];
    const query = `
    SELECT 
      pr.id, 
      pr.title, 
      pr.created_at, 
      pr.date_concluded,
      COUNT(sp.plate_race_id)::int AS plates_seen_count
    FROM plate_races pr
    LEFT JOIN seen_plates sp ON pr.id = sp.plate_race_id
    WHERE pr.user_id = $1 AND pr.date_concluded IS NULL
    GROUP BY pr.id`;
    const { rows } = await connection.query<GetCurrentPlateRaceDescriptionQueryResult>(
      query,
      values,
    );
    return rows[0] || null;
  };

  public getPastPlateRaceDescriptions = async ({
    client,
    limit,
    userId,
    cursor,
  }: GetPastPlateRaceDescriptionsParams) => {
    const connection = client ?? this.pool;
    const values: unknown[] = [userId];
    let cursorClause = '';

    if (cursor) {
      values.push(cursor.date, cursor.id);
      cursorClause = `AND (date_trunc('milliseconds', pr.date_concluded), pr.id) > (date_trunc('milliseconds', $2::timestamptz), $3)`;
    }

    values.push(limit + 1);

    const query = `
      SELECT 
        pr.id, 
        pr.title, 
        pr.created_at, 
        date_trunc('milliseconds', pr.date_concluded) AS date_concluded,
        COUNT(sp.plate_race_id)::int AS plates_seen_count
      FROM plate_races pr
      LEFT JOIN seen_plates sp ON pr.id = sp.plate_race_id
      WHERE pr.user_id = $1 AND pr.date_concluded IS NOT NULL ${cursorClause}
      GROUP BY pr.id
      ORDER BY date_trunc('milliseconds', pr.date_concluded) ASC, pr.id ASC
      LIMIT $${values.length}
    `;

    const { rows } = await connection.query<GetPastPlateRaceDescriptionsQueryResult>(query, values);
    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const last = items[items.length - 1];

    return {
      items,
      nextCursor: hasMore && last ? { date: last.date_concluded, id: last.id } : null,
    };
  };

  public getCurrentPlateRaceByUserId = async ({
    client,
    userId,
  }: GetCurrentPlateRaceByUserIdParams) => {
    const connection = client ?? this.pool;
    const values = [userId];
    const query = `
      SELECT id
      FROM plate_races
      WHERE user_id = $1 AND date_concluded IS NULL
      LIMIT 1
    `;
    const { rows } = await connection.query<GetCurrentPlateRaceIdByUserIdQueryResult>(
      query,
      values,
    );
    return rows[0];
  };

  public getPlateRaceData = async ({ plateRaceId, client }: GetPlateRaceDataParams) => {
    const connection = client ?? this.pool;
    const values = [plateRaceId];
    const query = `
      SELECT s.id, s.name, s.nickname, s.plate_url, sp.date_seen
      FROM states AS s
      LEFT JOIN seen_plates AS sp
      ON s.id = sp.state_id AND sp.plate_race_id = $1
    `;
    const { rows } = await connection.query<GetPlateRaceDataQueryResult>(query, values);
    return rows;
  };
  public getPlateRaceByPlateRaceIdAndUserId = async ({
    userId,
    plateRaceId,
    client,
  }: GetPlateRaceByPlateRaceIdAndUserIdParams) => {
    const connection = client ?? this.pool;
    const values = [userId, plateRaceId];
    const query = `
      SELECT id, title, created_at, date_concluded
      FROM plate_races
      WHERE user_id = $1 AND id = $2
    `;
    const { rows } = await connection.query<GetPlateRaceByPlateRaceIdAndUserIdQueryResult>(
      query,
      values,
    );
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

  public createPlateRaceByUserId = async ({
    userId,
    data,
    client,
  }: CreatePlateRaceByUserIdParams) => {
    const connection = client ?? this.pool;
    const values = [userId, data.title];
    const query = `
        INSERT INTO plate_races (user_id, title)
        VALUES ($1, $2)
        RETURNING id, title
    `;
    const { rows } = await connection.query<CreatePlateRaceByUserIdQueryResult>(query, values);
    const newPlateRace = rows[0];
    if (!newPlateRace) {
      throw new AppError({
        message: 'Create plate race returned undefined result, impossible state.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return newPlateRace;
  };

  public completePlateRace = async ({ data, client }: CompletePlateRaceParams) => {
    const connection = client ?? this.pool;
    const values = [data.userId, data.plateRaceId];
    const query = `
      UPDATE plate_races
      SET date_concluded = NOW()
      WHERE user_id = $1 AND id = $2
      RETURNING id
    `;
    const { rows } = await connection.query<CompletePlateRaceQueryResult>(query, values);
    const completedPlateRace = rows[0];
    if (!completedPlateRace) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        isOperational: true,
        statusCode: 404,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      });
    }
    return completedPlateRace;
  };

  public markPlateSeen = async ({ data, client }: MarkPlateSeenParams) => {
    const connection = client ?? this.pool;
    const values = [data.stateId, data.plateRaceId];
    const query = `
      INSERT INTO seen_plates (state_id, plate_race_id)
      VALUES ($1, $2)
      RETURNING id, state_id, date_seen
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
    const values = [data.stateId, data.plateRaceId];
    const query = `
      DELETE 
      FROM seen_plates
      WHERE state_id = $1 AND plate_race_id = $2
      RETURNING state_id
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
