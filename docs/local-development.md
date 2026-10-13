# Local development

## Prerequisites

- Node.js 24 (use `.nvmrc` with a version manager)
- npm (bundled with Node.js)

## Install

```bash
npm install
```

The root repository uses npm workspaces to manage the API and web packages together. A dependency lockfile must be committed before this foundation PR is merged; until then dependency resolution is provisional.

## Start the application

```bash
npm run dev
```

- Web: <http://127.0.0.1:5173>
- API health: <http://127.0.0.1:3001/api/health>

Vite proxies `/api` to the local Express server. The API binds to localhost; it is not exposed publicly by the development configuration.

## Validate

```bash
npm run typecheck
npm run test
npm run build
```

`npm run check` runs these commands in order. This milestone includes a health contract and test foundation, not database, login or request workflows.

## Notes

No application secrets or external services are needed for OH-002. Never commit `.env` files. PostgreSQL and Docker Compose are subsequent milestones.
