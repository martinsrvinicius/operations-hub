# ADR-0004 — Department-Scoped Approval Workflow with Auditing

**Date:** 2026-10-13  
**Status:** Accepted — developer review 2026-10-13

## Context

A request workflow must prevent conflicting decisions, unauthorized access and missing audit records. Generic status updates without explicit invariants are insufficient.

## Decision

One organization, multiple departments. Request initial status is SUBMITTED. Eligible same-department manager may atomically claim (IN_REVIEW) and then approve or reject. Decisions are terminal. Manager must be the recorded assignee and must never approve/reject a self-authored request. Administrator is not an implicit approver. Important transitions write append-only audit events in the same transaction.

## Alternatives considered

- **Free-form status changes:** rejected due to weak business invariants and auditability.
- **Multi-stage approvals:** deferred; adds policy complexity not needed for MVP.
- **Microservice workflow engine:** rejected as unjustified for one organization and one workflow.

## Consequences

Claims require concurrency protection and integration tests; cross-department access must be filtered in the API. Historical requests retain their originating department, even if author is transferred later.
