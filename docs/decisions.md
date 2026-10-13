# Product and Architecture Decision Log

**Baseline accepted:** 13 October 2026, following review of the Phase 0 summary.  
**State:** design decisions accepted, implementation not started.  
**Scope:** Single-organization request workflow using synthetic development data.

| ID | Decision | State | Rationale / reference |
|---|---|---|---|
| D-01 | Single organization, multiple departments; no multi-tenancy | Accepted | Department-scoped authorization without premature tenant complexity |
| D-02 | `SUBMITTED → IN_REVIEW → APPROVED / REJECTED`; managers claim before deciding; no self-approval | Accepted | Rules support TDD, concurrency control and audit |
| D-03 | Requester, Manager, Administrator, with separate ownership, department and approval rights | Accepted | Demonstrates authorization policy distinct from frontend access control |
| D-04 | Server-side opaque sessions, secure cookies, password hashing, CSRF defense | Accepted | ADR-0002; security details are implementation tasks, not finished features |
| D-05 | PostgreSQL, parameterized SQL with `pg`, versioned SQL migrations | Accepted | ADR-0003; validates SQL and explicit transactions |
| D-06 | Six-table minimum schema with an append-only audit trail | Accepted | ADR-0004; schema subject to incremental migration review |
| D-07 | Public demo hosting and deployment provider | Deferred | Needs working MVP and a security/cost review |
| D-08 | Repository name `operations-hub` | Accepted | Source and architecture are maintained in the same repository |

## Details deliberately deferred to implementation issues

These do **not** block OH-001; they must be resolved before their owning implementation is merged:

- **OH-004:** compare a standard migration tool (for example `node-pg-migrate`) with an intentionally small runner. Decide using a short written trade-off; never run untracked schema updates.
- **OH-005:** define and test the precise cookie origin, Origin validation and CSRF protection strategy for same-origin browser clients.
- **OH-008 / OH-013:** define whether pagination includes a total count, and freeze the result shape in OpenAPI before the list UI is considered done.
- **OH-014:** for the initial user-deactivation implementation, reject deactivation (409) while an assigned in-review request exists; do not leave unowned workflow records. Reassignment is out of scope until separately specified.
- **OH-017:** evaluate demo hosting, TLS, database backups, exposure/cost controls and secrets handling; no deployment is authorized by this decision log.

## Engineering workflow

Use short-lived feature branches, focused code reviews, pragmatic TDD, Conventional Commits and automated checks before merge (ADR-0005). Integration requires documented acceptance criteria and a successful verification run.

## Changes to the baseline

Any changed security rule, data ownership rule, workflow transition or persistence strategy requires a documented change in the relevant ADR and an updated acceptance test. The goal is traceability, not bureaucratic paperwork.
