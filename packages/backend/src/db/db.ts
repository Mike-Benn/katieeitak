import { Pool, types } from 'pg';
import { BACKEND_ENV } from '@/env.js';

types.setTypeParser(1082, function (stringValue) {
  return new Date(stringValue).toISOString();
});

types.setTypeParser(1184, function (stringValue) {
  return new Date(stringValue).toISOString();
});

const pool = new Pool({
  connectionString: BACKEND_ENV.DB_URL,
});

export { pool };
