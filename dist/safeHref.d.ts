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
export declare function safeHref(href: string | undefined | null): string;
//# sourceMappingURL=safeHref.d.ts.map