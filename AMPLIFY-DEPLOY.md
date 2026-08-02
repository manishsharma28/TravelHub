# Deploying TravelHub to AWS Amplify

This repo deploys as a **single Amplify app**: the Vite SPA is served as static files from the CDN,
and the Express API runs as a Lambda function defined in `amplify/`.

## How the pieces fit

```
Browser
  │
  ├── GET /                       → S3/CloudFront → frontend/dist/index.html
  ├── GET /packages/manali-…      → SPA fallback  → index.html (React Router)
  │
  └── GET /api/packages           → Amplify rewrite → Lambda Function URL
                                                       └── serverless-http → Express
```

Because `/api/*` is rewritten on the **same origin**, the browser never makes a cross-origin request,
so there is no CORS preflight in production. This is why `VITE_API_BASE_URL` is empty by default.

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

### 5. Add the `/api/*` rewrite

**App settings → Rewrites and redirects → Add rule**:

| Source address | Target address | Type |
| --- | --- | --- |
| `/api/<*>` | `https://<id>.lambda-url.<region>.on.aws/api/<*>` | 200 (Rewrite) |

> Order matters. This rule must sit **above** the SPA fallback below, otherwise `/api/...` requests
> get served `index.html`.

Then confirm the SPA fallback exists (Amplify usually adds it automatically):

| Source address | Target address | Type |
| --- | --- | --- |
| `/<*>` | `/index.html` | 200 (Rewrite) |

Redeploy after saving. `https://<your-app>.amplifyapp.com/api/health` should now return
`{"status":"ok",...}`.

## Environment variables

Set these under **App settings → Environment variables** as needed:

| Variable | Value | Notes |
| --- | --- | --- |
| `VITE_API_BASE_URL` | *(empty)* | Leave unset — the rewrite handles routing |
| `CORS_ORIGINS` | `https://your-domain.com` | Only needed if the API is called cross-origin |

## Verifying a deploy

```bash
curl https://<your-app>.amplifyapp.com/api/health
curl "https://<your-app>.amplifyapp.com/api/packages?sort=price-asc&pageSize=2"
```

Then load the site and confirm a hard refresh on a deep link like
`/packages/manali-solang-snow-escape-5d` renders instead of 404ing — that exercises the SPA fallback.

## Troubleshooting

**`/api/*` returns the HTML page.** The SPA fallback is matching first. Move the `/api/<*>` rule
above `/<*>` in the rewrites list.

**404 from the Lambda.** The rewrite target must keep the `/api` prefix — the Express routes are
mounted at `/api`. Target `.../api/<*>`, not `.../<*>`.

**Backend phase skipped.** The branch isn't linked to a backend environment, or the service role is
missing. Check **App settings → IAM roles**.

**CORS errors in the browser.** Something is calling the Lambda URL directly instead of the rewrite.
Confirm `VITE_API_BASE_URL` is empty in the Amplify environment variables and rebuild.

**Cold starts feel slow.** Normal for the first request after idle. Raise `memoryMB` in
`amplify/functions/api/resource.ts` for faster cold starts, or move to provisioned concurrency.

## Alternative: separate frontend and backend

If you'd rather not use Gen 2 functions, deploy the API separately (App Runner, ECS, EC2, or a
standalone Lambda) and point the site at it by setting `VITE_API_BASE_URL` to the API's URL. In that
case set `CORS_ORIGINS` on the API to your Amplify domain, since requests become cross-origin.
