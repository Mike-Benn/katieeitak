export const ERROR_NAMES = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DB_QUERY_ERROR: 'DB_QUERY_ERROR',
  DB_ZOD_ERROR: 'DB_ZOD_ERROR',
  MALFORMED_REQUEST: 'MALFORMED_REQUEST',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  BAD_GATEWAY: 'BAD_GATEWAY',
  OL_SCHEMA_ERROR: 'OL_SCHEMA_ERROR', // Open Library response schema mismatch
} as const;

export const ERROR_MESSAGES = {
  INVALID_ID_PATH_PARAMETER_FORMAT:
    'Incorrect path parameter format, must be a numerically, positive, integer string',
} as const;
