# Ordered Backlog — Operations Hub

**Status:** Accepted planning backlog. Issue IDs are planning labels only; no GitHub Issues have been created yet.

| ID | Phase | Candidate Issue | Acceptance / output | Dependency |
|---|---|---|---|---|
| OH-001 | 0 | Publish approved product brief, workflow, RBAC, ADRs and data model | Docs baseline accepted, links valid, initial PR reviewed | None |
| OH-002 | 1 | Scaffold Vue, Node, TypeScript workspaces | Local web/API start; strict types; scripts and lockfiles | OH-001 |
| OH-003 | 1 | Establish automated quality checks | Lint, format, typecheck, unit tests, build in a PR pipeline | OH-002 |
| OH-004 | 1–2 | Add Docker PostgreSQL and versioned migrations | Fresh clone brings up DB; migrate/test/seed work | OH-002 |
| OH-005 | 2 | Implement login, logout and secure session verification | 401 vs 200 covered; safe cookies; no plaintext passwords | OH-004 |
| OH-006 | 2 | Implement server-side RBAC and department policy | Negative tests for owner/dept/role; no data leakage | OH-005 |
| OH-007 | 3 | Implement create request in API and SQL | 201, 422, immutable owner/dept, transactional audit; tests | OH-006 |
| OH-008 | 3 | Implement request create/list/detail in Vue | Accessible form; success/error/loading; Vue tests | OH-007 |
| OH-009 | 3 | Add first critical E2E user journey | Login → create → view; Playwright CI smoke | OH-008 |
| OH-010 | 4 | Claim request atomically | Only eligible manager; two simultaneous claims produce one 200 and one 409 | OH-007 |
| OH-011 | 4 | Implement review decision and audit | Reason validation; self-approval denied; transaction coverage | OH-010 |
| OH-012 | 4 | Build manager queue and decision UI | Workflow demonstrable via browser and tests | OH-011 |
| OH-013 | 5 | Add filters, paging and polished UX | Stable paging, accessible responsive views, empty/error states | OH-012 |
| OH-014 | 5 | Implement basic admin user management | Admin-only change; deactivation/assignment policy resolved | OH-011 |
| OH-015 | 6 | Security and resilience review | Structured logs, dependency and vulnerability checks, negative test matrix | OH-013/014 |
| OH-016 | 6 | Finish OpenAPI, architecture and setup docs | Reproducible clone; Swagger/OpenAPI checked | OH-015 |
| OH-017 | 7 | Release readiness and demo plan | Manual approval, safe hosting strategy, clean release v1.0.0 | OH-016 |

## Suggested first PR sequence after repository creation

1. Documentation PR: OH-001, including approved ADRs.
2. Foundation PR: OH-002, with only the minimum scaffolding and package scripts.
3. CI PR: OH-003, with checks that demonstrably pass.
4. PostgreSQL PR: OH-004, with a migration smoke test.
5. Identity PR: OH-005, with sessions and negative tests.
6. Authorization PR: OH-006, with explicit role and department cases.
7. First vertical business slice: OH-007 + OH-008, split into reviewable PRs as needed.

Do not start a half-built dashboard, fake distributed services, complex reporting or AI integrations before the business workflow is demonstrably correct.

## Issue size guide

Prefer a single feature or technical capability that can be reviewed without scanning unrelated modules. Split large issues when they would require unrelated migrations, workflows and UI changes in one PR. Commit only after local validation; PRs may contain several coherent commits that are squash-merged at completion.
