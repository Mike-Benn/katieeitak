import { ERROR_MESSAGES, ERROR_NAMES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import type {
  AnxietyEvent,
  AnxietyEventBody,
  AnxietyEventCursor,
  AnxietyEventStatus,
  CompleteAnxietyEventByIdPayload,
  CompleteAnxietyEventByIdQueryResult,
  UpdateAnxietyEventBody,
} from '@katieeitak/shared';
import type { Pool, PoolClient } from 'pg';
import { convertStringToNumber } from '@/utils/convertStringToNumber/convertStringToNumber.js';

interface CreateEventParams {
  userId: string;
  body: AnxietyEventBody;
  client?: PoolClient;
}

interface CountEventsByUserIdParams {
  userId: string;
  client?: PoolClient;
}

interface GetAnxietyEventsByUserIdParams {
  limit: number;
  client?: PoolClient;
  userId: string;
  cursor: AnxietyEventCursor | null;
  status: AnxietyEventStatus;
}
interface UpdateAnxietyEventByEventIdParams {
  userId: string;
  client?: PoolClient;
  eventId: number;
  eventChanges: UpdateAnxietyEventBody;
}

interface CompleteAnxietyEventByIdParams {
  userId: string;
  id: string;
  payload: CompleteAnxietyEventByIdPayload;
  client?: PoolClient;
}

export class AnxietyRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public createEvent = async ({ userId, body, client }: CreateEventParams) => {
    const connection = client ?? this.pool;
    const query = `
            INSERT INTO anxiety_events (user_id, event_type, pre_notes, pre_anxiety_level, pre_excitement_level, date_occurred, title)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
    const values = [
      userId,
      body.eventType,
      body.eventNotes,
      body.anxietyLevel,
      body.excitementLevel,
      body.eventDate,
      body.eventTitle,
    ];
    const { rows } = await connection.query<AnxietyEvent>(query, values);
    const anxietyEvent = rows[0];
    if (!anxietyEvent) {
      throw new AppError({
        message: 'Create anxiety event returned undefined result, impossible state.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return anxietyEvent;
  };

  public countEventsByUserId = async ({ userId, client }: CountEventsByUserIdParams) => {
    const connection = client ?? this.pool;
    const query = `
      SELECT COUNT(*) AS num_found
      FROM anxiety_events
      WHERE user_id = $1
    `;
    const values = [userId];
    const { rows } = await connection.query<{ num_found: string }>(query, values);
    return convertStringToNumber({ str: rows[0]?.num_found });
  };

  public getAnxietyEventsByUserId = async ({
    limit,
    client,
    userId,
    cursor,
    status,
  }: GetAnxietyEventsByUserIdParams) => {
    const connection = client ?? this.pool;
    const values: unknown[] = [userId];
    let cursorClause = '';
    if (cursor) {
      values.push(cursor.date, cursor.id);
      cursorClause = 'AND (date_occurred, id) > ($2, $3)';
    }
    values.push(limit + 1);
    const statusClause =
      status === 'upcoming'
        ? ' AND post_anxiety_level IS NULL'
        : ' AND post_anxiety_level IS NOT NULL';
    const query = `
      SELECT * FROM anxiety_events
      WHERE user_id = $1 ${statusClause}
      ${cursorClause}
      ORDER BY date_occurred ASC, id ASC
      LIMIT $${values.length}
    `;
    const { rows } = await connection.query<AnxietyEvent>(query, values);
    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const last = items[items.length - 1];
    return {
      items,
      nextCursor: hasMore && last ? { date: last.date_occurred, id: last.id } : null,
    };
  };

  public updateAnxietyEventByEventId = async ({
    userId,
    eventId,
    eventChanges,
    client,
  }: UpdateAnxietyEventByEventIdParams) => {
    const connection = client ?? this.pool;
    let paramIndex = 1;
    const values = [];
    const setClauses: string[] = [];
    if (eventChanges.eventDate) {
      setClauses.push(` date_occurred = $${paramIndex++}`);
      values.push(eventChanges.eventDate);
    }
    if (eventChanges.eventNotes) {
      setClauses.push(` pre_notes = $${paramIndex++}`);
      values.push(eventChanges.eventNotes);
    }
    if (eventChanges.eventTitle) {
      setClauses.push(` title = $${paramIndex++}`);
      values.push(eventChanges.eventTitle);
    }
    if (eventChanges.eventType) {
      setClauses.push(` event_type = $${paramIndex++}`);
      values.push(eventChanges.eventType);
    }
    if (eventChanges.anxietyLevel) {
      setClauses.push(` pre_anxiety_level = $${paramIndex++}`);
      values.push(eventChanges.anxietyLevel);
    }
    if (eventChanges.excitementLevel) {
      setClauses.push(` pre_excitement_level = $${paramIndex++}`);
      values.push(eventChanges.excitementLevel);
    }

    if (paramIndex === 1) {
      throw new AppError({
        message:
          'Event changes object has no defined keys, this should be validated in the router.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.INTERNAL_SERVER_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }

    const query = `
      UPDATE anxiety_events
      SET ${setClauses.join(', ')}
      WHERE user_id = $${paramIndex} AND id = $${paramIndex + 1}
      RETURNING *
    `;
    values.push(userId, eventId);
    const { rows } = await connection.query<AnxietyEvent>(query, values);
    const anxietyEvent = rows[0];
    if (!anxietyEvent) {
      throw new AppError({
        message: 'No event found or user does not have permission to update this event.',
        isOperational: true,
        statusCode: 404,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
        safeMessage: 'Resource not found',
      });
    }
    return anxietyEvent;
  };

  public completeAnxietyEventById = async ({
    userId,
    id,
    payload,
    client,
  }: CompleteAnxietyEventByIdParams) => {
    const connection = client ?? this.pool;
    const query = `
      UPDATE anxiety_events
      SET post_notes = $1, post_anxiety_level = $2, post_excitement_level = $3
      WHERE user_id = $4 AND id = $5
      RETURNING id
    `;
    const values = [
      payload.postNotes,
      payload.postAnxietyLevel,
      payload.postExcitementLevel,
      userId,
      id,
    ];
    const { rows } = await connection.query<CompleteAnxietyEventByIdQueryResult>(query, values);
    const anxietyEvent = rows[0];
    if (!anxietyEvent) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        isOperational: true,
        statusCode: 404,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      });
    }
    return anxietyEvent;
  };
}
