import type { AnxietyEventBody, AnxietyEvent, UpdateAnxietyEventBody } from '@katieeitak/shared';
import type { PoolClient } from 'pg';
import { pool } from '@/db/db.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES } from '@/api/v1/constants/errors.js';

interface CreateEventParams {
  userId: string;
  body: AnxietyEventBody;
  client?: PoolClient;
}

interface GetEventsByUserIdParams {
  userId: string;
  client?: PoolClient;
}

interface UpdateAnxietyEventByEventIdParams {
  userId: string;
  client?: PoolClient;
  eventId: number;
  eventChanges: UpdateAnxietyEventBody;
}

export const AnxietyRepository = {
  createEvent: async ({ userId, body, client }: CreateEventParams) => {
    const connection = client ?? pool;
    const query = `
            INSERT INTO anxiety_events (user_id, event_type, notes, anxiety_level, excitement_level, date_occurred, title)
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
  },
  getEventsByUserId: async ({ userId, client }: GetEventsByUserIdParams) => {
    const connection = client ?? pool;
    const query = `
      SELECT * FROM anxiety_events
      WHERE user_id = $1
      ORDER BY date_occurred DESC
      LIMIT 10
    `;
    const values = [userId];
    const { rows } = await connection.query<AnxietyEvent>(query, values);
    return rows;
  },
  updateAnxietyEventByEventId: async ({
    userId,
    eventId,
    eventChanges,
    client,
  }: UpdateAnxietyEventByEventIdParams) => {
    const connection = client ?? pool;
    let paramIndex = 1;
    const values = [];
    const setClauses: string[] = [];
    if (eventChanges.eventDate) {
      setClauses.push(` date_occurred = $${paramIndex++}`);
      values.push(eventChanges.eventDate);
    }
    if (eventChanges.eventNotes) {
      setClauses.push(` notes = $${paramIndex++}`);
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
      setClauses.push(` anxiety_level = $${paramIndex++}`);
      values.push(eventChanges.anxietyLevel);
    }
    if (eventChanges.excitementLevel) {
      setClauses.push(` excitement_level = $${paramIndex++}`);
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
  },
};
