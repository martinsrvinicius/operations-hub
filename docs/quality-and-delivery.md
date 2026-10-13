# Engineering Workflow and Evidence

**Status:** Accepted engineering principles; CI still to be implemented in OH-003.

## Development loop per issue

1. Write issue with user value, acceptance criteria, authorization cases and DB implications.
2. Identify pure domain behavior; where justified, start with a failing test (Red).
3. Add minimum implementation to pass it (Green).
4. Refactor without changing behavior. Add integration test for real SQL/HTTP boundaries.
5. Check lint, formatting, typecheck, tests, build and dependency/secret hygiene.
6. Review your actual diff, security assumptions, migrations and documentation.
7. Open one small, focused PR with reproducible verification; merge only after checks pass.

Never invent commits or deliberately hide mistakes. Squash merging completed PRs is a normal review practice; it does not mean falsifying the underlying development history.

## Test matrix

| Level | Main targets | Tools (candidates) |
|---|---|---|
| Domain unit | State transitions, self-approval ban, reason validation | Vitest |
| Application unit | Use-case orchestration with test doubles for ports | Vitest |
| Integration | SQL transaction rollback, concurrency, scoped visibility | PostgreSQL (Docker), Vitest |
| HTTP integration | Login, auth denial, 404/409/422, serializers, cookies | Supertest + real test DB |
| Frontend component | Forms, loading/error/empty states, navigation | Vue Test Utils + Vitest |
| E2E | Login → create → claim → approve; unauthorized denial | Playwright against real stack |

Do not implement one brittle mock per internal function. Test observable behavior and important failure modes.

## Phase 1 CI checks (proposed)

- `format:check`, `lint`, `typecheck`, `test:unit`, `test:integration`, `build`.
- PostgreSQL is started in an isolated test job; migrations applied to a clean database.
- GitHub Actions runs on PRs against `main`; workflow file permissions kept minimal; lockfiles committed.
- Prevent secrets/credentials in source control; dependency audit runs with actionable thresholds (initially advisory until policy is defined).
- End-to-end smoke test enters mandatory checks when the first complete workflow exists.

**Never put production tokens/secrets in workflows or PR logs.** PRs originating from forks should not receive privileged credentials.

## Conventional Commit examples (illustrative, not generated history)

```text
docs: specify request workflow and authorization policy
chore: scaffold TypeScript workspaces and local database
ci: add lint typecheck tests and build gates
test(requests): describe claim conflicts and access rules
feat(requests): implement atomic request claim
refactor(requests): centralize transition policy
```

## Pull request template

Use `.github/PULL_REQUEST_TEMPLATE.md`: scope, linked issue, acceptance criteria, evidence, security/data considerations, trade-offs and screenshots where appropriate.

## Release quality gate

External evaluator can clone, run, read the architecture and OpenAPI, execute tests and follow a short demo. Release `v1.0.0` requires a manually authorized public deployment strategy and review of demo security, cost controls and data isolation.
