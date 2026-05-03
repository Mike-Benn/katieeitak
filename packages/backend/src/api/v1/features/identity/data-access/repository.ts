import { pool } from '@/db/db.js';
import type { PoolClient } from 'pg';
import type { User } from '@katieeitak/shared';

// Repository
export const IdentityRepository = {
  findUserByAuthId: async (auth0_id: string, client?: PoolClient) => {
    const connection = client ?? pool;
    const query = `
            SELECT name
            FROM users
            WHERE auth0_id = $1
        `;
    const values = [auth0_id];
    const { rows } = await connection.query<User>(query, values);
    return rows[0];
  },
  createUser: async (auth0_id: string, client?: PoolClient) => {
    const connection = client ?? pool;
    const query = `
        INSERT INTO users (auth0_id)
        VALUES ($1)
        RETURNING name
    `;
    const values = [auth0_id];
    const { rows } = await connection.query<User>(query, values);
    return rows[0];
  },
};
