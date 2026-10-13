# HTTP API Contract Outline (Baseline)

**Status:** Agreed endpoint inventory (subject to endpoint-level implementation review), not a published OpenAPI specification. Base path: `/api/v1`. Content-Type: `application/json`. Authentication uses a browser session cookie per accepted ADR-0002.

| Method | Route | Actors | Outcome |
|---|---|---|---|
| `POST` | `/auth/login` | Unauthenticated | Login; set HttpOnly session cookie |
| `POST` | `/auth/logout` | Authenticated | Invalidate current session |
| `GET` | `/auth/me` | Authenticated | Profile incl. role and department |
| `POST` | `/requests` | Requester / Manager | Create request → 201 |
| `GET` | `/requests` | Authenticated | Scoped list; `status`, `page`, `pageSize` |
| `GET` | `/requests/{id}` | Authorized owner / manager / admin | Detail or 404 |
| `POST` | `/requests/{id}/claim` | Eligible Manager | Claim → 200; conflict → 409 |
| `POST` | `/requests/{id}/decision` | Assigned Manager | `{outcome: "APPROVED" | "REJECTED", reason?: string}` |
| `GET` | `/requests/{id}/audit-events` | Authorized owner / manager / admin | Chronological, scoped history |
| `GET` | `/admin/users` | Administrator | User list, later MVP slice |
| `PATCH` | `/admin/users/{id}` | Administrator | Change active/role/department, later MVP slice |

## Create request example

```json
{"title":"Replace conference projector","description":"Current projector fails to turn on."}
```

The server derives `created_by`, `department_id` and the initial `SUBMITTED` status from session/business logic. Those properties are **not** writable by clients.

## Error envelope proposal

```json
{
  "error": {
    "code": "REQUEST_NOT_CLAIMABLE",
    "message": "This request can no longer be claimed.",
    "requestId": "b4b12d3b-8ce2-4a8f-ae3d-15fc88879544"
  }
}
```

Suggested semantics: **400** malformed JSON; **401** missing/expired session; **403** authenticated but role forbids operation on an otherwise visible resource; **404** nonexistent OR hidden resource; **409** transition conflict/concurrent claim; **422** valid JSON with invalid field/domain input; **429** login rate limit; **500** unexpected server error without leaked internals.

## HTTP contract design rules

- API uses consistent field casing (`camelCase` JSON; `snake_case` SQL).
- IDs are server-generated UUIDs; timestamps are ISO 8601 UTC.
- Pagination defaults: page 1, pageSize 20, max pageSize 50, ordering newest first with ID tiebreaker. Total count is optional; document actual output before implementation.
- Write endpoints are protected against cross-site requests when cookie auth is used; SameSite cookies alone must not be treated as the entire CSRF strategy.
- No client-supplied SQL fragments, field names or unrestricted sort keys.
- `/health/live` and `/health/ready` may be outside `/api/v1`; readiness checks DB connectivity without returning credentials.
- Document OpenAPI under `docs/api/openapi.yaml` when the first endpoint is implemented; validate in CI.
