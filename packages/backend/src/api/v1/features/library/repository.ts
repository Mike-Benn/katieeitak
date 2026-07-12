import type { Pool, PoolClient } from 'pg';
import {
  type MarkedBookReadQueryResult,
  type MarkedBookReadPayload,
  type GetMarkedBookQueryResult,
  type PatchReadBookByIdPayload,
  type PatchReadBookByIdQueryResult,
} from '@katieeitak/shared';
import { pool } from '@/db/db.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES, ERROR_MESSAGES, SAFE_ERROR_MESSAGES } from '@/api/v1/constants/errors.js';

interface MarkBookReadParams {
  markedBookPayload: MarkedBookReadPayload;
  user_id: string;
  client?: PoolClient;
}

interface GetReadBookParams {
  user_id: string;
  ol_book_key: string;
  client?: PoolClient;
}

interface PatchReadBookByIdParams {
  id: string;
  client?: PoolClient;
  user_id: string;
  payload: PatchReadBookByIdPayload;
}

export class LibraryRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public markBookRead = async ({ markedBookPayload, user_id, client }: MarkBookReadParams) => {
    const connection = client ?? this.pool;
    const query = `
      INSERT INTO read_books (user_id, ol_book_key, title, ol_author_key, author_name, cover_i, word_count, page_count, rating)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      user_id,
      markedBookPayload.ol_book_key,
      markedBookPayload.title,
      markedBookPayload.ol_author_key,
      markedBookPayload.author_name,
      markedBookPayload.cover_i,
      markedBookPayload.word_count,
      markedBookPayload.page_count,
      markedBookPayload.rating,
    ];
    const { rows } = await connection.query<MarkedBookReadQueryResult>(query, values);
    const markedBook = rows[0];
    if (!markedBook) {
      throw new AppError({
        message: "'markBookRead' returned undefined result, impossible state.",
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return markedBook;
  };

  public getMarkedBook = async ({ user_id, ol_book_key, client }: GetReadBookParams) => {
    const connection = client ?? pool;
    const query = `
      SELECT id, word_count, page_count, rating
      FROM read_books
      WHERE user_id = $1 AND ol_book_key = $2
    `;
    const values = [user_id, ol_book_key];
    const { rows } = await connection.query<GetMarkedBookQueryResult>(query, values);
    return rows[0];
  };

  public patchReadBookById = async ({ id, user_id, payload, client }: PatchReadBookByIdParams) => {
    const connection = client ?? pool;
    let paramIndex = 1;
    const values = [];
    const setClauses: string[] = [];

    if (payload.page_count !== undefined) {
      setClauses.push(` page_count = $${paramIndex++}`);
      values.push(payload.page_count);
    }

    if (payload.word_count !== undefined) {
      setClauses.push(` word_count = $${paramIndex++}`);
      values.push(payload.word_count);
    }

    if (payload.rating) {
      setClauses.push(` rating = $${paramIndex++}`);
      values.push(payload.rating);
    }
    if (paramIndex === 1) {
      throw new AppError({
        message: ERROR_MESSAGES.EMPTY_PATCH_PAYLOAD,
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.INTERNAL_SERVER_ERROR,
        safeMessage: SAFE_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
    const query = `
      UPDATE read_books
      SET ${setClauses.join(', ')}
      WHERE user_id = $${paramIndex++} AND id = $${paramIndex}
      RETURNING id, word_count, page_count, rating, ol_book_key
    `;
    values.push(user_id, id);
    const { rows } = await connection.query<PatchReadBookByIdQueryResult>(query, values);
    const readBook = rows[0];
    if (!readBook) {
      throw new AppError({
        message: ERROR_MESSAGES.RESOURCE_NOT_FOUND,
        isOperational: true,
        statusCode: 404,
        name: ERROR_NAMES.RESOURCE_NOT_FOUND,
        safeMessage: SAFE_ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      });
    }
    return readBook;
  };
  //public patchMarkedBookById = async ({ id, user_id, client }: PatchMarkedBookByIdParams) => {};
}
