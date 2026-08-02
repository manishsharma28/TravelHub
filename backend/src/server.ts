import { createApp } from './app.js';

/** Local development entry point. Not used by the Lambda deployment. */
const port = Number(process.env.PORT ?? 4000);

createApp().listen(port, () => {
  console.log(`[travelhub] API listening on http://localhost:${port}`);
  console.log(`[travelhub] health check: http://localhost:${port}/api/health`);
});
