# Requirements and Acceptance Criteria

**Status:** Accepted baseline. Identifiers are stable candidates for linking future GitHub Issues, tests and PRs.

## Functional requirements

| ID | Requirement | Priority | Evidence |
|---|---|---|---|
| FR-01 | Authenticate existing users, terminate sessions and expose current session profile. | Must | Login/logout API and session tests |
| FR-02 | Enforce role, ownership and department access **in the API**; frontend checks are UX only. | Must | Negative authorization tests |
| FR-03 | Create a request in `SUBMITTED` state, owned by the creator's department. | Must | API + DB integration + UI test |
| FR-04 | Requester reads only their own requests; manager reads own department; admin may read all. | Must | Scoped query tests |
| FR-05 | Eligible manager claims a submitted, unassigned request, transitioning it to `IN_REVIEW`. | Must | Atomic concurrent-claim tests |
| FR-06 | Only the assigned manager may approve or reject; no self-approval. | Must | Rule unit tests + API tests |
| FR-07 | Rejection requires a reason; an approved request may have an optional reason. | Must | Domain + SQL constraints |
| FR-08 | Every create, claim and decision action has an immutable audit event with actor and time. | Must | Transaction rollback tests |
| FR-09 | List endpoints support status filters, stable ordering and bounded pagination. | Should | Boundary and integration tests |
| FR-10 | Admin can disable users and manage role/department, subject to integrity restrictions. | Should | Admin-only API tests |
| FR-11 | Responsive request list, creation, detail and review screens with errors/loading/empty states. | Must | Component + E2E tests |
| FR-12 | Human-readable OpenAPI docs and executable local development guide. | Must | CI contract check and setup review |

## Nonfunctional requirements

| ID | Expectation | Verification |
|---|---|---|
| NFR-01 | TypeScript strict mode in web/API; central lint and formatting. | CI checks |
| NFR-02 | Seeded development dataset contains fake names and fake domains only. | Review + CI secret scan |
| NFR-03 | No cross-department leaks in list/detail/error behavior. | Integration tests |
| NFR-04 | State changes and audit events commit or roll back together. | PostgreSQL integration tests |
| NFR-05 | Database schema changes use versioned migrations and documented rollback considerations. | Clean database migration test |
| NFR-06 | Passwords never stored in plaintext; sessions secure; login limits documented. | Security tests and review |
| NFR-07 | Logs include request ID and avoid credentials, session tokens and sensitive request descriptions. | Logging tests and review |
| NFR-08 | CI validates lint, types, unit/integration tests and builds on PRs. | GitHub Actions checks |
| NFR-09 | No arbitrary code-coverage target; critical workflows and denial cases must be tested. | Test matrix |
| NFR-10 | A clean clone can be started locally with minimal configuration. | Setup smoke test |

## Business invariants (candidate)

1. A request is created in `SUBMITTED`, with `created_by` and `department_id` captured server-side from the authenticated user.
2. A request belongs to one department; managers cannot inspect or claim a request from another department.
3. Only `SUBMITTED → IN_REVIEW → APPROVED | REJECTED` is allowed in the MVP.
4. Claims are exclusive; competing manager claims cannot both succeed.
5. Only the assigned manager can decide a request; self-approval is forbidden even if the author holds the Manager role.
6. A rejected request has a nonblank reason. Approved requests may have an optional reason.
7. Terminal states do not transition further in MVP; reopening is out of scope.
8. Write operations affecting status/assignment/decision must atomically write audit history.
9. Requests visible to a Requester are always filtered by creator ID; administrative access is explicitly checked.
10. Disabling a user terminates effective access; handling already-assigned requests must be resolved before user management ships.

## Definition of Ready for a feature

A single user outcome; acceptance criteria with at least one failure case; authorization policy; API shape; SQL/data impact; testing strategy; scope small enough for meaningful PR review.

## Definition of Done

Tests executed successfully; no secrets or real customer content; new cases documented; API/schema/docs updated; PR diff reviewed; build passes; implementation and trade-offs explainable without relying on an assistant.
