import serverlessHttp from 'serverless-http';
import { createApp } from './app.js';

/**
 * AWS Lambda entry point (API Gateway HTTP API / REST proxy integration).
 *
 * The app is created once at module scope so it is reused across warm
 * invocations — building it per request would re-register every route.
 */
const app = createApp();

export const handler = serverlessHttp(app);
