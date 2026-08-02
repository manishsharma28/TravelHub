import { defineBackend } from '@aws-amplify/backend';
import { FunctionUrlAuthType, HttpMethod } from 'aws-cdk-lib/aws-lambda';
import { api } from './functions/api/resource';

/**
 * Amplify Gen 2 backend definition.
 *
 * The Express app is deployed as a single Lambda fronted by a Function URL.
 * The site calls it through the "/api/*" rewrite configured in the Amplify
 * console (see AMPLIFY-DEPLOY.md), so the browser only ever sees same-origin
 * requests and no CORS preflight is needed in production.
 */
const backend = defineBackend({ api });

const apiLambda = backend.api.resources.lambda;

const functionUrl = apiLambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedOrigins: ['*'],
    allowedMethods: [HttpMethod.GET, HttpMethod.POST],
    allowedHeaders: ['content-type'],
  },
});

// Printed in the deploy logs and written to amplify_outputs.json — use this
// value as the rewrite target for /api/<*> in the Amplify console.
backend.addOutput({
  custom: {
    apiFunctionUrl: functionUrl.url,
  },
});
