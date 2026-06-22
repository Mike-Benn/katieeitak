import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['packages/frontend', 'packages/backend', 'packages/shared'],
  },
});
