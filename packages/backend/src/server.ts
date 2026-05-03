import { createApp } from './loaders/express/express.js';
import { BACKEND_ENV } from './env.js';
import { logger } from './utils/logger/logger.js';

const port = BACKEND_ENV.PORT;
const app = createApp();
const server = app.listen(port, () =>
  console.log(`[server]: Server is running at http://localhost:${port}`),
);
process.on('uncaughtException', (error) => {
  logger.error(error);
  gracefulShutdown();
});
process.on('unhandledRejection', (reason: unknown) => {
  logger.error(reason);
  gracefulShutdown();
});

export function gracefulShutdown() {
  logger.info('Server shutting down unexpectedly due to non-operational error.');
  server.close(() => {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
  setTimeout(() => {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }, 7500);
}
