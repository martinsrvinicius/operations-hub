# ADR-0005 — Short-Lived PRs, Pragmatic TDD and Required CI

**Date:** 2026-10-13  
**Status:** Accepted in Portfolio Plan v1.0 (principles; CI scripts to be implemented)

## Context

Recruiters should see a history of coherent, reviewable changes and reliable software quality rather than dozens of premature commits and repeated fixes.

## Decision

Break work into small Issues with explicit acceptance criteria, implement real vertical slices, use TDD for domain policies, and validate lint/types/tests/build before merge. Use short-lived branches, PR descriptions and Conventional Commits. Prefer squash merging coherent PRs. Preserve authentic history; do not forge activity or imply the code was written unaided when AI assisted.

## Consequences

Initial CI setup takes time but helps prevent regressions and failed PRs. Main branch should remain stable. GitHub repository creation, push/merge and deployment remain subject to the developer's permission.
