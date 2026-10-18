// Prints the deployed API's Lambda Function URL (without a trailing slash) from
// amplify_outputs.json, which the Amplify backend phase writes. The frontend build
// uses it as VITE_API_BASE_URL so the site calls the API directly and does not
// depend on an /api rewrite rule in the Amplify console. Prints nothing when the
// file or value is missing, leaving the site on same-origin /api requests.
import { existsSync, readFileSync } from 'node:fs';

const outputs = new URL('../amplify_outputs.json', import.meta.url);

if (existsSync(outputs)) {
  const url = JSON.parse(readFileSync(outputs, 'utf8')).custom?.apiFunctionUrl;
  if (typeof url === 'string') process.stdout.write(url.replace(/\/+$/, ''));
}
