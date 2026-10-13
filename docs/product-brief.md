# Product Brief — Operations Hub

**Status:** Accepted product baseline | **Product type:** Fictional portfolio application | **Audience:** Software engineering recruiters and technical interviewers.

## Problem

Internal teams lose track of service requests, ownership, approvals and the reasons behind a decision. Spreadsheets and unstructured messages obscure who requested, reviewed and approved what.

## Product outcome

A small but realistic application with transparent approval workflows, secure department scoping, reliable persistence, explicit error handling and traceable transitions. Engineering quality and explainable design take priority over feature count.

## Users

- **Requester:** creates and reads their own requests; sees the associated history.
- **Manager:** can also submit requests, reads requests in their department, claims an eligible request, and approves or rejects requests assigned to them (never their own).
- **Administrator:** manages users and department membership and reads administrative data; **does not automatically gain permission to approve**.

Each user belongs to exactly one department in the MVP. The organization has several departments but is **not a multi-tenant SaaS**.

## MVP capabilities

1. Login, logout and current-user endpoint; permission enforcement on the server.
2. List, create and view requests with reliable access filtering.
3. Claim an unassigned request; manager review; approve or reject with a reason where required.
4. Audit events written in the same DB transaction as the affected state transition.
5. Status filtering and stable pagination; responsive, accessible views and informative error states.
6. Seeded demo users with non-sensitive fake data; documented API and reproducible setup.
7. Basic administrative user management (enable/disable user and change department/role) after the workflow is proven.

## Deliberately out of scope

Payments; public signup; invitations; password reset and email delivery; messaging and WebSockets; AI features; file attachments; notifications; real customer data; multi-tenancy; microservices; Kubernetes; mobile apps; complex analytics.

## Success criteria

- A developer unfamiliar with the code can start the full stack using documented commands and Docker.
- A requester can submit, a departmental manager can claim and decide, and authorization rules cannot be bypassed through direct API requests.
- Invalid transitions, wrong-department access and simultaneous claims are covered by automated tests.
- API contracts, data constraints and deployment assumptions are documented.
- Branch checks are green, the demo is reproducible, and the developer can defend key technical trade-offs in an English interview.

## Delivery constraint

The design baseline is approved. Publication to GitHub requires repository creation; actual deployment requires a separate security and cost review. No implementation or deployment exists in OH-001.
