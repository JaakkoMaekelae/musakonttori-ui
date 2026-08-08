# Disaster Recovery Plan — @musakonttori/ui

**Product:** Shared UI component library and design tokens (Button, Badge, Chip, Avatar, AvatarGroup, …)
with Storybook
**Criticality:** Tier 3 — a bad release degrades appearance across products; it rarely stops a transaction
**Distribution:** internal package consumed by product repositories, built from source

> Read together with [MUSAKONTTORI_DISASTER_RECOVERY_STANDARD.md](../../MUSAKONTTORI_DISASTER_RECOVERY_STANDARD.md).

---

## 1. Recovery Objectives

| Metric | Target | Rationale |
|--------|--------|-----------|
| **RPO** | 0 — all source is in git | No runtime state. |
| **RTO** | 4 hours | Visual regressions are embarrassing and erode trust in the brand, but they do not block payments, ticket scanning or publishing. |

---

## 2. Disaster Scenarios

### 2.1 Bad Release Breaks Product UIs

**Impact:** Every product that installs the new version renders incorrectly — broken layout, invisible
buttons, unreadable contrast. In the worst case a Tier 1 flow becomes unusable because its primary
action button is not visible, which turns a cosmetic failure into a revenue failure.

**Detection:** visual regressions reported after a version bump · Storybook diffs · accessibility
contrast failures in CI.

**Recovery procedure:**
1. Revert the offending commit; do not fix forward while products are rendering incorrectly.
2. Rebuild and verify: `pnpm build && pnpm typecheck && pnpm test`.
3. Notify product owners with the specific components affected so they can check their critical flows
   rather than the whole app.
4. Any product whose Tier 1 flow is affected rolls back its own deployment immediately rather than
   waiting for this library.

---

### 2.2 Design Token Change with Wide Effects

**Impact:** Token changes (colour, spacing, radius) propagate everywhere at once. A contrast token change
can silently break WCAG compliance across the whole product family — see
`MUSAKONTTORI_WCAG_2_1_2_2_ACCESSIBILITY_AUDIT_STANDARD.md`.

**Recovery procedure:**
1. Revert the token change.
2. Re-run the accessibility checks that should have caught it.
3. Re-introduce the change behind a version bump that products adopt deliberately, not automatically.

**Rule:** token changes deserve the same care as an API change. They are a shared contract with every
product's visual layer, and with the brand system in `MUSAKONTTORI_BRAND` documentation.

---

### 2.3 Build Toolchain Failure

**Impact:** The library cannot be built, so products cannot install or update it. Existing installs
continue working.

**Recovery procedure:** rebuild from a clean clone to distinguish a local environment problem from a
real one; pin the toolchain versions if a transitive update broke the build; consumers stay on their
current version in the meantime — there is no urgency to ship a broken build.

---

### 2.4 Source Loss

**Recovery:** clone from GitHub, or from any developer's local copy. Built output also exists inside every
consuming product's `node_modules`, which is enough to reconstruct the component set if it ever came to that.

---

## 3. Backup Strategy

| Asset | Method | Retention | Recovery |
|-------|--------|-----------|----------|
| Source code | GitHub + developer clones | Full history | `git clone` |
| Built `dist/` | Reproducible via `pnpm build` | — | Rebuild |
| Design tokens | Source-controlled, generated via `pnpm build:tokens` | Full history | Regenerate |
| Storybook | Reproducible via `pnpm build-storybook` | — | Rebuild |

---

## 4. Detailed Procedures

### 4.1 Emergency revert

```bash
git revert <bad-commit>
pnpm build && pnpm typecheck && pnpm test
# notify product owners, naming the affected components
```

### 4.2 Pre-release verification

```bash
pnpm test
pnpm build:tokens
pnpm build-storybook   # review the affected components visually — this is a UI library
```
Visual review is not optional here. Type checks pass happily on an invisible button.

---

## 5. Communication

Notify product owners in `#incidents` with the component list. Products decide for themselves whether
their critical flows are affected — that judgement belongs with the people who own the flow.

---

## 6. Testing Schedule

| Drill | Frequency | Success criteria |
|-------|-----------|------------------|
| Emergency revert rehearsal | Annually | Products back on a good version within 4 h |
| Accessibility contrast check | Every token change | WCAG 2.1/2.2 AA maintained |
| Clean-clone build | Quarterly | Builds with no undocumented steps |
| Storybook visual review | Every release | No unintended visual change |

---

## 7. Recovery Checklist

- [ ] Revert first
- [ ] Rebuild, typecheck, test
- [ ] Name the affected components to product owners
- [ ] Confirm no Tier 1 flow in any product is visually blocked
- [ ] Re-run accessibility checks before re-releasing

---

## 8. Dependencies

| Dependency | Status page | Impact |
|------------|-------------|--------|
| GitHub | https://www.githubstatus.com | Products cannot install |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-08-07 | Engineering | Initial plan |
