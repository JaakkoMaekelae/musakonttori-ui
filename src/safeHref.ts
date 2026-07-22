/**
 * Validate an href before rendering it into an <a> element.
 *
 * Allows only:
 *   - root-relative URLs ("/path")
 *   - absolute http: and https: URLs
 *
 * Anything else (e.g. "javascript:", "data:", protocol-relative edge cases
 * that fail parsing, empty values) is replaced with "#" to prevent
 * script execution via crafted URLs.
 */
export function safeHref(href: string | undefined | null): string {
  if (!href) return "#";
  const trimmed = href.trim();
  if (trimmed.startsWith("/")) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return trimmed;
    }
  } catch {
    // not a valid absolute URL — fall through to safe default
  }
  return "#";
}
