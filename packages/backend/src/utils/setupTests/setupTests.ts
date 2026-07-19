import { vi } from 'vitest';

vi.mock('@/env.js', () => ({
  ENV: {
    NODE_ENV: 'test',
    CORS_ORIGINS: 'test',
    DB_URL: 'test',
    AUDIENCE: 'test',
    AUTH0_DOMAIN: 'test',
  },
}));
