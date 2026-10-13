import { createApp } from './app.js';

function getPort(raw: string | undefined): number {
  if (raw === undefined) return 3001;
  if (!/^[0-9]+$/.test(raw)) throw new Error('PORT must be an integer between 1 and 65535');
  const port = Number(raw);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  return port;
}

const port = getPort(process.env.PORT);
const app = createApp();
const server = app.listen(port, '127.0.0.1', () => {
  console.info(`Operations Hub API listening on http://127.0.0.1:${port}`);
});

process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());
