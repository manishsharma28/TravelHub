import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import { packagesRouter } from './routes/packages.js';
import { enquiriesRouter } from './routes/enquiries.js';

/**
 * Builds the Express app without binding a port. Both entry points import this:
 *   - src/server.ts  → listens locally for `npm run dev`
 *   - src/lambda.ts  → wraps it for API Gateway on Amplify
 * Keeping construction separate from listening is what lets one codebase serve both.
 */
export const createApp = (): Express => {
  const app = express();

  // Amplify / API Gateway terminates TLS upstream; trust the proxy so
  // req.protocol and req.ip reflect the original client request.
  app.set('trust proxy', true);
  app.disable('x-powered-by');

  const allowedOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins.length > 0 ? allowedOrigins : true,
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: false,
    }),
  );
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  app.use('/api', packagesRouter);
  app.use('/api', enquiriesRouter);

  app.use((req, res) => {
    res.status(404).json({ error: `No route matched ${req.method} ${req.path}` });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[travelhub] unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};
