# Customer authentication presentation

Import components and styles explicitly:

```tsx
import { CustomerAuthForm, CustomerAuthPage, CustomerAuthDialog } from '@musakonttori/ui/customer-auth';
import type { CustomerAuthFormProps } from '@musakonttori/ui/customer-auth';
import '@musakonttori/ui/customer-auth.css';
```

- `CustomerAuthForm`: labeled email/password fields, visibility control, enabled
  provider links, pending state, recoverable request errors and policy/navigation links.
- `CustomerAuthPage`: supplied split-panel design; takes `form`, `brand`,
  `navigation`, optional `controls` and `className`.
- `CustomerAuthDialog`: same form inside Radix dialog; controlled `open` and
  `onOpenChange`, localized `closeLabel`, `productName`, optional `trigger` and
  `controls`. Include a trigger for automatic focus return. Without a trigger,
  the caller must restore focus to its opener when closing.

All text comes from the consuming application's translations. Brand data contains
product name, optional logo, headline/accent, description and benefit items.
Pass enabled provider links only; do not show unavailable Google/Facebook flows.
`links.reset` and `links.terms` are optional: omit unavailable destinations instead
of linking to an example URL. `links.register` and `links.privacy` are required.

`onSubmit({ email, password }): Promise<void>` delegates to the product's Accounts
adapter. It must await the request and redirect only after verified success. Return
translated credential/rate-limit failures through `errorMessage`. Thrown transport
failures show `labels.requestFailed`, never raw exception text. The library does
not send requests, create sessions, persist credentials or implement redirect policy.

## Registration

Set `form.intent` to `"sign-up"` for new-password autofill and the registration
password length (8–200). The default remains `"sign-in"`; no existing consumer
needs changes. Optional `beforeCredentials` and `afterCredentials` React slots
render inside the same form and disabled fieldset, so native required-field
validation and pending state also cover product-specific fields. Do not put
another form inside either slot. Keep slot values in the consuming component
and include them in its existing registration action alongside the unchanged
`onSubmit({ email, password })` callback values.

Supply registration-specific labels and point `links.register` at sign-in with
the matching `labels.registerPrompt` and `labels.register`. Omit `links.reset`
and providers when those actions do not belong to the registration flow.
Use scoped `mk-auth-choice-group`, `mk-auth-choices`, `mk-auth-choice` and
`mk-auth-hint` styles for semantic radio fields and associated help text; every
visible label/hint still comes from the consuming application's translations.

Use the shared theme provider/tokens and load Sora/Manrope in the product. Auth
styles honor `--font-display` / `--font-body`, falling back to shared typography
tokens. The dark brand panel remains dark in either form-panel theme, as in the
reference design. Stable `--mk-brand-red` keeps white action text AA-compliant.

Full examples: `src/stories/CustomerAuth.stories.tsx`. Existing `CustomerSignIn` and
`SignInLayout` APIs are unchanged; migrate products explicitly, one at a time.
