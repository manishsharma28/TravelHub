# Deploying Unmapped Trips to AWS Amplify

This repo deploys as a **single Amplify app**: the Vite SPA is served as static files from the CDN,
and the Express API runs as a Lambda function defined in `amplify/`.

## How the pieces fit

```
Browser
  │
  ├── GET /                       → S3/CloudFront → frontend/dist/index.html
  ├── GET /packages/manali-…      → SPA fallback  → index.html (React Router)
  │
  └── GET https://<id>.lambda-url…/api/packages → Lambda Function URL
                                                   └── serverless-http → Express
```

The frontend build reads the API's Function URL from `amplify_outputs.json` (written by the backend
phase; see `scripts/print-api-url.mjs`) and bakes it in as `VITE_API_BASE_URL`, so the site calls the
Lambda directly. CORS is handled by the Function URL's own config in `amplify/backend.ts`. If no URL
is found, the build leaves `VITE_API_BASE_URL` empty and the site falls back to same-origin `/api`
requests, which then need the console rewrite in step 5.

## One-time setup

### 1. Push the repo to Git

Amplify deploys from a connected Git branch.

```bash
cd TravelHub
git add .
git commit -m "Initial TravelHub build"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Create the Amplify app

AWS Console → **Amplify** → **Create new app** → **Deploy from Git** → pick your provider and the
repository/branch.

Amplify detects `amplify.yml` at the repo root and uses it. Confirm the build settings show:

- Build command: `npm run build:web`
- Output directory: `frontend/dist`

### 3. Grant the build role deploy permissions

The Gen 2 backend deploy (`npx ampx pipeline-deploy`) needs an IAM service role. In the Amplify app:

**App settings → IAM roles → Create and use a new service role** (or attach an existing one with
`AmplifyBackendDeployFullAccess`).

If your account has never used CDK in this region, bootstrap it once locally:

```bash
npx cdk bootstrap aws://<account-id>/<region>
```

### 4. Deploy

The first build runs both phases. In the build log's **Backend** section, find the output:

```
apiFunctionUrl = https://<id>.lambda-url.<region>.on.aws/
```

Copy that URL — you need it for the rewrite.

### 5. Add the rewrite rules

The `/api/*` rule is only a fallback now (see above), but the SPA rule is still needed so deep links
like `/about` return 200 instead of 404.

**App settings → Rewrites and redirects → Add rule**:

| Source address | Target address | Type |
| --- | --- | --- |
| `/api/<*>` | `https://<id>.lambda-url.<region>.on.aws/api/<*>` | 200 (Rewrite) |

> Order matters. This rule must sit **above** the SPA fallback below, otherwise `/api/...` requests
> get served `index.html`.

Then add the SPA fallback **below** it, replacing the `/<*>` rule Amplify adds by default:

| Source address | Target address | Type |
| --- | --- | --- |
| `</^[^.]+$\|\.(?!(css\|gif\|ico\|jpg\|jpeg\|js\|png\|txt\|svg\|woff\|woff2\|ttf\|map\|json\|webp)$)([^.]+$)/>` | `/index.html` | 200 (Rewrite) |

(Type the source without the backslashes — they only escape `|` for this table.) The regex skips
static files, so `/assets/*.js` and `/assets/*.css` are served as-is. A bare `/<*>` → `/index.html`
200 rule would also rewrite those, and the site renders a blank page.

Rules are per Amplify app: if the custom domain is attached to a different app, add them there too.
`https://<your-domain>/api/health` should now return `{"status":"ok",...}`.

### 6. Verify the enquiry email address in SES

Every "Get Free Quotes" submission is emailed to `info@unmappedtrips.com` through Amazon SES, sent
from that same address with Reply-To set to the traveller. SES only sends from verified addresses:

1. AWS Console → **Amazon SES**, switched to the **same region as the Amplify app**.
2. **Identities → Create identity → Email address** → `info@unmappedtrips.com` → Create.
3. Open the verification email in that inbox and click the link. The identity shows **Verified**.

That is enough even while the account is in the SES sandbox, because mail only ever goes to this one
verified address. (Verifying the whole `unmappedtrips.com` domain instead also works.) The address is
set in `amplify/functions/api/resource.ts`. Until it is verified, submissions fail with a "couldn't
send your enquiry" message and the error appears in the function's CloudWatch logs.

## Environment variables

Set these under **App settings → Environment variables** as needed:

| Variable | Value | Notes |
| --- | --- | --- |
| `VITE_API_BASE_URL` | *(unset)* | Leave unset — the build fills it from `amplify_outputs.json` |
| `CORS_ORIGINS` | `https://your-domain.com` | Only for an API not behind the Function URL; Express adds no CORS headers otherwise |

## Verifying a deploy

```bash
curl https://<your-app>.amplifyapp.com/api/health
curl "https://<your-app>.amplifyapp.com/api/packages?sort=price-asc&pageSize=2"
```

Then load the site and confirm a hard refresh on a deep link like
`/packages/manali-solang-snow-escape-5d` renders instead of 404ing — that exercises the SPA fallback.

## Troubleshooting

**`/api/*` returns the HTML page** (the site shows "Request failed with status 404", and
`curl -I https://<your-domain>/api/health` shows a 301 to `/api/health/` from `AmazonS3`). The
`/api/<*>` rule is missing from this app, or the SPA fallback is matching first. Add the rule, and
make sure it sits above the fallback in the rewrites list.

**404 from the Lambda.** The rewrite target must keep the `/api` prefix — the Express routes are
mounted at `/api`. Target `.../api/<*>`, not `.../<*>`.

**Backend phase skipped.** The branch isn't linked to a backend environment, or the service role is
missing. Check **App settings → IAM roles**.

**Packages don't load / "Request failed with status 404".** Check the frontend build log for
`API base URL is [...]`. Empty brackets mean no `amplify_outputs.json` was found — usually the backend
phase didn't run (see "Backend phase skipped"); add the `/api/<*>` rewrite from step 5 as a fallback.

**CORS errors in the browser.** The Function URL's CORS config (`amplify/backend.ts`) must allow the
request's method and headers. Don't also set `CORS_ORIGINS`, or the headers are sent twice.

**Cold starts feel slow.** Normal for the first request after idle. Raise `memoryMB` in
`amplify/functions/api/resource.ts` for faster cold starts, or move to provisioned concurrency.

## Alternative: separate frontend and backend

If you'd rather not use Gen 2 functions, deploy the API separately (App Runner, ECS, EC2, or a
standalone Lambda) and point the site at it by setting `VITE_API_BASE_URL` to the API's URL. In that
case set `CORS_ORIGINS` on the API to your Amplify domain, since requests become cross-origin.
