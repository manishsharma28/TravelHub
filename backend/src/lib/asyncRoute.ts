import type { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wraps an async handler so a rejected promise reaches Express's error
 * middleware instead of hanging the request.
 *
 * Express 4 does not await handlers, so an unhandled rejection inside one is
 * silently dropped and the client waits until it times out. The in-memory
 * repository never rejects, but a DynamoDB call can (throttling, timeouts),
 * so every async route goes through here.
 */
export const asyncRoute =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    handler(req, res, next).catch(next);
  };
