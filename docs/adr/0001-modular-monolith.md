# ADR-0001 — Modular Monolith with Separate Vue Web App

**Date:** 2026-10-13  
**Status:** Accepted in Portfolio Plan v1.0 (high-level decision)

## Context

The portfolio needs clear Vue 3/Node.js/REST/PostgreSQL skills and a design defensible in a technical interview. Distributed deployment would add operational complexity without user demand.

## Decision

Use one modular Node.js/Express backend, a separate Vue 3 web app and PostgreSQL. Split backend code by business modules with clear domain/application/infrastructure/HTTP boundaries. API and web may be built/deployed separately; the backend is **one service**, not a microservices platform.

## Consequences

Pros: simple local environment, fast tests, explicit transaction boundaries, smaller CI/CD surface. Trade-off: modular discipline is enforced by code review and tests rather than process isolation. We intentionally do not demonstrate RabbitMQ here; the Queue Manager portfolio project covers that skill.
