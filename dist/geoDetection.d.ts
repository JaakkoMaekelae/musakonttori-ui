/**
 * Geo-detection middleware for Musakonttori products.
 *
 * Reads Vercel's `x-vercel-ip-country` header to detect user's country.
 * Sets cookies for country, locale, and currency preferences.
 * Only sets cookies on first visit (if they don't already exist).
 *
 * Usage in middleware/proxy.ts:
 *
 *   import { applyGeoDetection } from "@musakonttori/ui/markets";
 *
 *   export default async function middleware(req: NextRequest) {
 *     const res = NextResponse.next();
 *     applyGeoDetection(req, res);
 *     // ... rest of middleware
 *     return res;
 *   }
 */
import type { NextRequest } from "../types";
/**
 * Apply geo-detection cookies based on Vercel country header.
 * Only sets cookies if they don't already exist (respects user choice).
 */
export declare function applyGeoDetection(req: NextRequest | {
    headers: Headers;
    cookies: {
        get(name: string): {
            value: string;
        } | undefined;
    };
}, res: {
    cookies: {
        set(name: string, value: string, opts?: Record<string, unknown>): void;
    };
}): void;
//# sourceMappingURL=geoDetection.d.ts.map