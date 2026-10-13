# ADR-0003 — Explicit PostgreSQL SQL and Versioned Migrations

**Date:** 2026-10-13  
**Status:** Accepted — developer review 2026-10-13

## Context

The target roles value PostgreSQL/MySQL, SQL, reliable APIs and concurrency control. A portfolio should demonstrate actual queries and transaction semantics instead of relying entirely on an ORM abstraction.

## Decision

Use PostgreSQL and `pg` (node-postgres) with parameterized queries. Keep schema changes in ordered, versioned SQL files applied by a tested migration mechanism. Centralize transaction management in the infrastructure adapter; cases of use own transaction boundaries through ports. Test against actual PostgreSQL in CI.

## Alternatives considered

- **Prisma:** convenient model and client generation; hides some low-level SQL decisions relevant to the portfolio.
- **Kysely:** type-safe query builder and strong alternative; may be revisited if raw SQL creates unmanageable type duplication.
- **Untracked DDL scripts:** rejected because schema drift is hard to review/reproduce.

## Consequences

More manual SQL/types, but visible competence in indexes, safe queries, locks and migrations. Migration runner implementation remains an issue-level decision; we must avoid building a bespoke migration tool without reason.
