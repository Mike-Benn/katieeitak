import { ERROR_MESSAGES, ERROR_NAMES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import {
  type UnmarkStateSeenQueryResult,
  type GetStatesSeenQueryResult,
  type MarkStateSeenQueryResult,
  type MarkCapitolSeenQueryResult,
  type UnmarkCapitolSeenQueryResult,
} from '@katieeitak/shared';
import type { Pool, PoolClient } from 'pg';

interface GetStatesSeenParams {
  client?: PoolClient;
  userId: string;
}

interface MarkStateSeenParams {
  client?: PoolClient;
  userId: string;
  stateId: number;
}

interface UnmarkStateSeenParams {
  client?: PoolClient;
  stateId: string;
  userId: string;
}

interface MarkCapitolSeenParams {
  client?: PoolClient;
  userId: string;
  stateId: number;
}

interface UnmarkCapitolSeenParams {
  client?: PoolClient;
  stateId: string;
  userId: string;
}

export class StateRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public getStatesSeen = async ({ client, userId }: GetStatesSeenParams) => {
    const connection = client ?? this.pool;
    const values = [userId];
    const query = `
      SELECT 
        s.id, 
        s.name, 
        s.nickname, 
        s.flag_url, 
        ss.date_seen AS state_seen_date,
        sc.date_seen AS capitol_seen_date
      FROM states AS s
      LEFT JOIN seen_states AS ss 
        ON s.id = ss.state_id AND ss.user_id = $1
      LEFT JOIN seen_capitols AS sc 
        ON s.id = sc.state_id AND sc.user_id = $1
      ORDER BY s.name ASC
    `;
    const { rows } = await connection.query<GetStatesSeenQueryResult>(query, values);
    if (rows.length !== 51) {
      throw new AppError({
        message: 'An invalid number of state records were selected.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.INTERNAL_SERVER_ERROR,
        safeMessage: SAFE_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
    const filteredRows = rows.filter((state) => state.name !== 'Washington, D.C.');
    return filteredRows;
  };

  public markStateSeen = async ({ client, stateId, userId }: MarkStateSeenParams) => {
    const connection = client ?? this.pool;
    const values = [stateId, userId];
    const query = `
      INSERT INTO seen_states (state_id, user_id)
      VALUES ($1, $2)
      RETURNING id, state_id, date_seen
    `;
    const { rows } = await connection.query<MarkStateSeenQueryResult>(query, values);
    if (!rows[0]) {
      throw new AppError({
        message: 'Insert seen state returned undefined result, impossible state.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return rows[0];
  };

  public unmarkStateSeen = async ({ client, stateId, userId }: UnmarkStateSeenParams) => {
    const connection = client ?? this.pool;
    const values = [stateId, userId];
    const query = `
      DELETE
      FROM seen_states
      WHERE state_id = $1 AND user_id = $2
      RETURNING state_id
    `;
    const { rows } = await connection.query<UnmarkStateSeenQueryResult>(query, values);
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

  public markCapitolSeen = async ({ client, stateId, userId }: MarkCapitolSeenParams) => {
    const connection = client ?? this.pool;
    const values = [stateId, userId];
    const query = `
      INSERT INTO seen_capitols (state_id, user_id)
      VALUES ($1, $2)
      RETURNING id, state_id, date_seen
    `;
    const { rows } = await connection.query<MarkCapitolSeenQueryResult>(query, values);
    if (!rows[0]) {
      throw new AppError({
        message: 'Insert seen capitol returned undefined result, impossible state.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return rows[0];
  };

  public unmarkCapitolSeen = async ({ client, stateId, userId }: UnmarkCapitolSeenParams) => {
    const connection = client ?? this.pool;
    const values = [stateId, userId];
    const query = `
      DELETE
      FROM seen_capitols
      WHERE state_id = $1 AND user_id = $2
      RETURNING state_id
    `;
    const { rows } = await connection.query<UnmarkCapitolSeenQueryResult>(query, values);
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
