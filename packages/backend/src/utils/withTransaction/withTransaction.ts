import type { PoolClient } from 'pg';
import { pool } from '@/db/db.js';
import { logger } from '../logger/logger.js';
export default async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>,
): Promise<T> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        client.release(rollbackError as Error);
        client = undefined;
        logger.error(rollbackError);
      }
    }
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}
