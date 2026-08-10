"use client";

export interface SkipLinkProps {
  /** Target element ID to focus. Default: "main-content" */
  targetId?: string;
  /** Link text. Default: "Siirry sisältöön" */
  label?: string;
  className?: string;
}

/**
 * Musakonttori SkipLink - WCAG 2.1 ohituslinkki.
 *
 * Siirtää fokuksen pääsisältöön. Piilotettu visuaalisesti,
 * näkyviin vain focus-tilassa (Tab-näppäin).
 *
 * @example
 * <SkipLink />
 * <SkipLink label="Skip to content" targetId="content" />
 */
export function SkipLink({
  targetId = "main-content",
  label = "Siirry sisältöön",
  className = "",
}: SkipLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const main = document.getElementById(targetId);
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--mk-palette-bg-brand,#DC2626)] focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-[var(--mk-palette-primary,#BF2227)] focus:ring-offset-2 ${className}`}
    >
      {label}
    </a>
  );
}
