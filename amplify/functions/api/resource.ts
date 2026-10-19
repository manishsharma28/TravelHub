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
  environment: {
    // Enquiries are sent with Zoho SMTP. SMTP_PASS is the mailbox password and
    // must be set on the function in the Amplify console — never committed.
    ENQUIRY_EMAIL_TO: 'info@unmappedtrips.com',
    ENQUIRY_EMAIL_FROM: 'info@unmappedtrips.com',
    SMTP_HOST: 'smtp.zoho.in',
    SMTP_PORT: '465',
    SMTP_USER: 'info@unmappedtrips.com',
  },
});
