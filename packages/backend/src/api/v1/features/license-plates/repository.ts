import { ERROR_NAMES } from '@/api/v1/constants/errors.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { type GetLicensePlatesQueryResult } from '@katieeitak/shared';
import { type Pool } from 'pg';

export class LicensePlateRepository {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  public getLicensePlates = async (client = undefined) => {
    const connection = client ?? this.pool;
    const query = `
        SELECT id, name, nickname, plate_url FROM plates
    `;
    const { rows } = await connection.query<GetLicensePlatesQueryResult>(query);
    if (rows.length !== 51) {
      throw new AppError({
        message: 'Invalid number of license plates returned, impossible state',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return rows;
  };
}
