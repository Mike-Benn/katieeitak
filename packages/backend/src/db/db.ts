import { Pool } from 'pg';
import { BACKEND_ENV } from '@/env.js';

const pool = new Pool({
  connectionString: BACKEND_ENV.DB_URL,
});

export { pool };
