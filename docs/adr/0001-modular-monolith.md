# ADR-0001 — Modular Monolith with Separate Vue Web App

**Date:** 2026-10-13  
**Status:** Accepted

## Context

The workflow requires shared transactions, consistent authorization and a straightforward deployment model. Distributed services would add operational complexity without a corresponding product requirement.

## Decision

Use one modular Node.js/Express backend, a separate Vue 3 web app and PostgreSQL. Split backend code by business modules with clear domain/application/infrastructure/HTTP boundaries. API and web may be built/deployed separately; the backend is **one service**, not a microservices platform.

## Consequences

Pros: simple local environment, fast tests, explicit transaction boundaries, smaller CI/CD surface. Trade-off: modular discipline is enforced by code review and tests rather than process isolation. A message broker is not justified for the initial synchronous workflow.
