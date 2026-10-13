# ADR-0005 — Short-Lived PRs, Pragmatic TDD and Required CI

**Date:** 2026-10-13  
**Status:** Accepted (CI implementation pending)

## Context

Changes must be reviewable, independently testable and safe to integrate. Large unrelated patches increase regression risk and make failures difficult to isolate.

## Decision

Break work into small Issues with explicit acceptance criteria, implement real vertical slices, use TDD for domain policies, and validate lint/types/tests/build before merge. Use short-lived branches, PR descriptions and Conventional Commits. Prefer squash merging coherent PRs. Record the verification performed and avoid merging changes with known failing required checks.

## Consequences

Initial CI setup takes time but helps prevent regressions and failed PRs. Main branch should remain stable. Deployment remains a separate, explicitly reviewed release activity.
