import type { AnxietyEventBody, AnxietyEvent } from '@katieeitak/shared';
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

export const AnxietyRepository = {
  createEvent: async ({ userId, body, client }: CreateEventParams) => {
    const connection = client ?? pool;
    const query = `
            INSERT INTO anxiety_events (user_id, event_type, notes, anxiety_level, excitement_level, date_occurred)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *

        `;
    const values = [
      userId,
      body.eventType,
      body.eventNotes,
      body.anxietyLevel,
      body.excitementLevel,
      body.eventDate,
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
};
