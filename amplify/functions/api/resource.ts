import { defineFunction } from '@aws-amplify/backend';

/**
 * The TravelHub REST API, running the Express app from backend/src/app.ts.
 *
 * `entry` points at a thin re-export of the compiled handler so Amplify's
 * bundler pulls the whole backend workspace into the function artifact.
 */
export const api = defineFunction({
  name: 'travelhub-api',
  entry: './handler.ts',
  timeoutSeconds: 30,
  memoryMB: 512,
  runtime: 20,
});
