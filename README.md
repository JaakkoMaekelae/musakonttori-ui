# @musakonttori/ui

Shared Musakonttori UI components.

## Usage

```tsx
import { Avatar, Badge, Button, Chip } from "@musakonttori/ui";
```

## Components

- **Button** — Primary, secondary, ghost, and destructive variants with size options.
- **Badge** — Read-only statuses with semantic tones and optional status dots.
- **Chip** — Metadata, selectable filters, and removable values. Selection and removal are separate modes to keep the markup accessible.
- **Avatar** — User or organization image with generated initials, image-error fallback, sizes, shapes, tones, and localized presence labels.
- **AvatarGroup** — Accessible overlapping layout for multiple avatars.

### Chip or Badge?

Use a `Badge` when the value communicates state, such as “Julkaistu” or “Virhe”.
Use a `Chip` when the value is content or a control, such as a category, selected
city, or quick filter.

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

Always pass the full localized display name. The component generates the
fallback initials and replaces a failed image automatically.

```tsx
<Avatar
  name="Aino Aurora Laine"
  src={profile.imageUrl}
  status="online"
  statusLabel="Paikalla"
/>
```
