# Use Cases and Behavior Examples

**Status:** Accepted specification. These are behavior specifications, **not executed tests**.

## UC-01 — Submit a request

**Given** a logged-in Requester in Finance; **when** they submit a valid title and description; **then** the API creates a request with server-derived department and author, `SUBMITTED` status, a UUID, timestamps and one `REQUEST_CREATED` audit event. It returns HTTP 201.

Invalid input (empty title, overly long title, missing description) yields a structured 422 response and no database writes. A client cannot overwrite department, creator, assignment or status through the request payload.

## UC-02 — Restrict visibility

**Given** a Finance Requester created request A and another Finance Requester created B; **then** the first user can view A but not B. A manager in Finance can view both; a manager in Operations cannot view either. A resource outside the actor's visibility returns 404 rather than revealing that it exists.

## UC-03 — Claim a request

**Given** a `SUBMITTED` request in Finance, unassigned and created by another user; **when** a Finance Manager claims it; **then** the request becomes `IN_REVIEW`, records that manager as assignee and writes a `REQUEST_CLAIMED` audit event atomically.

Two simultaneous claims must not assign the request to different managers. One succeeds; the other receives HTTP 409. A manager from another department or the author cannot claim it.

## UC-04 — Approve

**Given** an `IN_REVIEW` request assigned to a Finance Manager, created by another person; **when** the assignee approves; **then** `APPROVED` is stored with one ApprovalDecision and one `REQUEST_APPROVED` audit event in the same database transaction.

A different manager, a Requester, an Administrator without manager role, and a manager trying to approve their own request cannot approve it. Repeated approval receives HTTP 409.

## UC-05 — Reject

**Given** an eligible `IN_REVIEW` request; **when** the assigned manager rejects with a nonblank reason; **then** `REJECTED` and the decision/audit record are persisted atomically. Rejecting without a reason yields HTTP 422 and no writes.

## UC-06 — Audit history

An authorized request owner, departmental manager or administrator can read a request's chronological audit events. Audit metadata is explicitly whitelisted; it must not include passwords, session tokens or unrelated personal information. Audit records are append-only in the application's business API.

## UC-07 — Disable user (later MVP slice)

Only administrators can disable a user. That user cannot make further authenticated calls. A policy for reassigning already-claimed requests must be approved before this feature is implemented.

## Manual demo story (fake data)

1. A Finance Requester logs in and creates “Replace conference projector”.
2. The request appears in Finance's manager queue; another department does not see it.
3. A Finance Manager claims it. A competing claim is rejected.
4. The Manager approves the request; the requester sees the final status and audited decision.
5. A reviewer tests an unauthorized API call and observes denial without data disclosure.
