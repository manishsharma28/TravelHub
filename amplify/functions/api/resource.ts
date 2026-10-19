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
    // Zoho SMTP for enquiry mail. The password is deployed with the function
    // so production can send without a separate console secret.
    ENQUIRY_EMAIL_TO: 'info@unmappedtrips.com',
    ENQUIRY_EMAIL_FROM: 'info@unmappedtrips.com',
    SMTP_HOST: 'smtp.zoho.in',
    SMTP_PORT: '465',
    SMTP_USER: 'info@unmappedtrips.com',
    SMTP_PASS: '@#Unmapped046',
  },
});
