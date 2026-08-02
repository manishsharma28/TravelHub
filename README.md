# TravelHub

A travel-packages marketplace for Himalayan holidays — browse curated tour packages, filter by
price/theme/duration/destination, and send enquiries to operators.

React 18 · TypeScript · Tailwind CSS v4 · Vite 6 · Express 4 · AWS Amplify

## Quick start

```bash
npm install
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:4000/api/health

`npm run dev` runs both workspaces together. Vite proxies `/api/*` to the Express server, so the
client always uses same-origin relative URLs — exactly how it behaves once deployed.

## Repository layout

```
TravelHub/
├── amplify.yml                 # Amplify build spec (backend deploy + frontend build)
├── amplify/                    # Amplify Gen 2 backend definition
│   ├── backend.ts              # Declares the API Lambda + Function URL
│   └── functions/api/
│       ├── resource.ts         # Function config (runtime, memory, timeout)
│       └── handler.ts          # Re-exports the Express Lambda handler
│
├── shared/                     # Types shared by both sides (@travelhub/shared)
│   └── src/index.ts            # TravelPackage, PackageQuery, EnquiryPayload, …
│
├── backend/                    # Express API (@travelhub/backend)
│   └── src/
│       ├── app.ts              # createApp() — routes/middleware, no port binding
│       ├── server.ts           # Local entry point (listens on :4000)
│       ├── lambda.ts           # Lambda entry point (serverless-http wrapper)
│       ├── routes/             # packages.ts, enquiries.ts
│       ├── lib/query.ts        # Filtering, sorting, faceting, pagination
│       └── data/packages.ts    # Seed catalogue
│
└── frontend/                   # Vite SPA (@travelhub/frontend)
    └── src/
        ├── pages/              # Home, Packages, PackageDetail, About, NotFound
        ├── components/         # PackageCard, FilterSidebar, EnquiryForm, Header, Footer
        └── lib/                # api.ts (typed client), useApi.ts, format.ts
```

### Why `app.ts` is separate from `server.ts` / `lambda.ts`

Amplify does not run a long-lived Node process — it hosts static files plus Lambda functions. So the
Express app is built by a `createApp()` factory that never calls `listen()`. Two thin entry points
import it:

- `server.ts` calls `listen()` for local development.
- `lambda.ts` wraps it with `serverless-http` for deployment.

One codebase, both environments, no conditional branching.

## npm scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run API and web together |
| `npm run dev:api` / `dev:web` | Run one side only |
| `npm run build` | Build shared → backend → frontend |
| `npm run build:web` | Build for Amplify hosting (shared + frontend) |
| `npm run typecheck` | Typecheck every workspace |

## API

Base path `/api`. Full query support on the listing endpoint.

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET | `/api/packages` | Filter, sort, paginate — see params below |
| GET | `/api/packages/facets` | Filter counts for the sidebar |
| GET | `/api/packages/featured` | Homepage picks |
| GET | `/api/packages/:idOrSlug` | Detail + related packages |
| GET | `/api/destinations` | Destination cards |
| GET | `/api/testimonials` | Reviews |
| POST | `/api/enquiries` | Submit an enquiry (validated) |

**Query parameters** — `destination`, `search`, `themes`, `budgetCategories`, `minPrice`,
`maxPrice`, `minNights`, `maxNights`, `sort`, `page`, `pageSize`. Array filters accept comma-joined
values (`?themes=Adventure,Trekking`).

```bash
curl "http://localhost:4000/api/packages?themes=Trekking&maxPrice=20000&sort=price-asc"
```

Facet counts are computed with the facet's own dimension excluded, so selecting one destination
doesn't zero out the counts next to the others.

All query and body input is validated with Zod; invalid input returns `400` with per-field messages
that the enquiry form renders inline.

## Deployment

See [AMPLIFY-DEPLOY.md](AMPLIFY-DEPLOY.md) for the full walkthrough — including the `/api/*` rewrite
that makes the frontend and API share one origin.

## Notes

- Package data is an in-memory seed catalogue (`backend/src/data/packages.ts`). Swap it for a
  database by replacing the `source` argument in `backend/src/lib/query.ts` — nothing else in the
  request path touches that module.
- Enquiries are stored in an in-array sink for the demo. Lambda recycles instances, so persist them
  in DynamoDB (and send mail via SES) before going live.
- Images are hotlinked from Unsplash for the demo.
