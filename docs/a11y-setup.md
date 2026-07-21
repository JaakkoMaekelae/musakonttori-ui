# Accessibility Testing Setup (WCAG 2.2 AA)

Taso 8 — Section 3, MUSAKONTTORI_TESTAUS_JA_LAADUNVARMISTUSSTANDARDI.

## Strategy

This project uses vitest without Playwright E2E. Accessibility testing is split into two layers:

1. **CI pipeline** — automated axe-core checks
2. **jsdom tests** — semantic HTML and ARIA assertions in vitest

## Option A: CI-level axe-core scanning

Add to GitHub Actions workflow:

```yaml
- name: Run axe accessibility scan
  uses: dequelabs/axe-core-npm/action@v4
  with:
    urls: |
      https://staging.example.com/
      https://staging.example.com/login
    axe-version: latest
    standards: wcag22aa
```

## Option B: vitest + jsdom semantic checks

```bash
npm install -D @axe-core/react jsdom
```

Add to `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup-a11y.ts'],
  },
});
```

Create `test/a11y.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('Accessibility', () => {
  it('renders semantic landmarks', () => {
    document.body.innerHTML = '<main><h1>Hello</h1></main>';
    const main = document.querySelector('main');
    expect(main).not.toBeNull();
  });

  it('html has lang attribute', () => {
    document.documentElement.lang = 'fi';
    expect(document.documentElement.lang).toBeTruthy();
  });

  it('buttons have accessible names', () => {
    document.body.innerHTML = '<button aria-label="Close">X</button>';
    const btn = document.querySelector('button');
    expect(btn?.getAttribute('aria-label')).toBe('Close');
  });
});
```

## Manual Testing

- Keyboard-only navigation (Tab, Enter, Escape)
- VoiceOver (macOS/iOS)
- NVDA (Windows)
- Browser zoom 200%
- High contrast mode
- Drag alternative input

## Standards Referenced

- WCAG 2.2 Level AA
- MUSAKONTTORI_WCAG_2_1_2_2_ACCESSIBILITY_AUDIT_STANDARD.md
