# @musakonttori/ui

Shared Musakonttori UI components and design tokens.

**Documentation:** [Architecture](docs/architecture.md) · [Disaster recovery](docs/disaster-recovery.md) ·
[Ecosystem architecture](../MUSAKONTTORI_ARCHITECTURE.md)

## Usage

```tsx
import { Avatar, Badge, Button, Chip } from "@musakonttori/ui";
```

Named subpath exports are also available (`@musakonttori/ui/button` and so on).

## Development

```bash
pnpm dev            # tsc --watch
pnpm build          # build tokens + tsc -p tsconfig.build.json → dist/
pnpm build:tokens   # regenerate design tokens
pnpm typecheck      # tsc --noEmit
pnpm lint
pnpm test           # vitest run
pnpm storybook      # storybook dev -p 6006
```

## Components

- **Button** — primary, secondary, ghost and destructive variants with size options; auto-spinner on
  async `onClick`
- **Badge** — read-only statuses with semantic tones and optional status dots
- **Chip** — metadata, selectable filters and removable values. Selection and removal are separate modes
  to keep the markup accessible
- **Avatar** — user or organization image with generated initials, image-error fallback, sizes, shapes,
  tones and localized presence labels
- **AvatarGroup** — accessible overlapping layout for multiple avatars

### Chip or Badge?

Use a `Badge` when the value communicates state, such as "Julkaistu" or "Virhe".
Use a `Chip` when the value is content or a control, such as a category, selected city, or quick filter.

```tsx
<Badge variant="success" dot>
  Julkaistu
</Badge>

<Chip selected={period === "week"} onPress={() => setPeriod("week")}>
  Tällä viikolla
</Chip>

<Chip removeLabel="Poista Helsinki" onRemove={() => removeCity("Helsinki")}>
  Helsinki
</Chip>
```

### Avatar

Always pass the full localized display name. The component generates the fallback initials and replaces
a failed image automatically.

```tsx
<Avatar
  name="Aino Aurora Laine"
  src={profile.imageUrl}
  status="online"
  statusLabel="Paikalla"
/>
```

## Conventions

- **Styling**: Tailwind CSS 4 + class-variance-authority + tailwind-merge + clsx
- **Primitives**: Radix UI (Dialog, Select, Slot, Tabs)
- **Icons**: lucide-react
- **Toasts**: sonner
- **Testing**: Vitest + Testing Library + jsdom
- **Peer framework**: React 19.2.8, Next 16.2.12

## Release Discipline

Two kinds of change carry different blast radius:

| Change | Affects |
|--------|---------|
| Component API or markup | consumers of that component |
| **Design token** (colour, spacing, radius) | every surface in every product at once |

Token changes deserve the same review as an API change — a contrast token can break WCAG 2.2 AA
compliance platform-wide. Always review Storybook visually before releasing: a type check passes happily
on an invisible button.
