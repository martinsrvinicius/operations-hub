# ADR-0002 — Opaque Server-Side Sessions for Browser Authentication

**Date:** 2026-10-13  
**Status:** Accepted — developer review 2026-10-13

## Context

The frontend is a browser-based Vue app served with a same-site API. JWT is common but browser token storage, rotation and revocation complicate a demonstration of secure session management.

## Decision

Use cryptographically random opaque session tokens in Secure, HttpOnly, SameSite=Lax cookies under HTTPS. Persist only a SHA-256 hash (or keyed equivalent) of the raw token in PostgreSQL with user, expiry and timestamps. Check session validity and account active state on authorized requests; revoke on logout. Store password hashes using Argon2id. Provide login rate limits. Enforce same-origin/Origin and additional CSRF controls on unsafe cookie-authenticated methods (details settled during security implementation, not assumed away).

## Alternatives considered

- **Stateless access JWT:** easy inter-service verification, but unnecessary with one backend; revocation becomes nontrivial.
- **JWT + refresh token:** demonstrable but adds storage, rotation and misuse risks that distract from approval workflow.

## Consequences

Session table and cleanup are required. HTTPS and cookie path/domain strategy must be defined with deploy topology. Session fixation, brute-force and CSRF threats become explicit test cases.
