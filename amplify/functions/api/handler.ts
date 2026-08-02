/**
 * Lambda entry point for the Amplify Gen 2 function.
 *
 * Amplify bundles this file with esbuild, so importing the backend workspace
 * source directly pulls the Express app (and its deps) into the artifact —
 * there is no separate build step for the function.
 */
export { handler } from '../../../backend/src/lambda.js';
