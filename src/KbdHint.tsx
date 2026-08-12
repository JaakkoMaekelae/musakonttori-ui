import { cn } from "./utils";

export interface KbdHintProps {
  keys: string[];
  className?: string;
}

/**
 * Musakonttori KbdHint - näppäinoikotietojen näyttö.
 *
 * Renderöi `<kbd>`-elementit + -erottimella.
 *
 * @example
 * <KbdHint keys={["⌘", "K"]} />
 * <KbdHint keys={["Ctrl", "S"]} />
 */
export function KbdHint({ keys, className }: KbdHintProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {keys.map((key, i) => (
        <span key={i} className="inline-flex items-center gap-0.5">
          <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded bg-[var(--mk-palette-bg-surface,#1E2130)] border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] text-[10px] font-mono font-semibold text-[var(--mk-palette-text-tertiary,#7E8292)] leading-none">
            {key}
          </kbd>
          {i < keys.length - 1 && (
            <span className="text-[9px] text-[var(--mk-palette-text-tertiary,#6B7280)] mx-0.5">
              +
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
