/**
 * Geo-detection middleware for Musakonttori products.
 *
 * Reads Vercel's `x-vercel-ip-country` header to detect user's country.
 * Sets cookies for country, locale, and currency preferences.
 * Only sets cookies on first visit (if they don't already exist).
 *
 * Usage in middleware/proxy.ts:
 *
 *   import { applyGeoDetection } from "@musakonttori/ui/geoDetection";
 *
 *   export default async function middleware(req: NextRequest) {
 *     const res = NextResponse.next();
 *     applyGeoDetection(req, res);
 *     // ... rest of middleware
 *     return res;
 *   }
 */
interface GeoRequest {
    headers: Headers | Record<string, string | null>;
    cookies: {
        get(name: string): {
            value: string;
        } | undefined;
    };
}
interface GeoResponse {
    cookies: {
        set(name: string, value: string, opts?: {
            maxAge?: number;
            path?: string;
            sameSite?: "lax" | "strict" | "none";
            httpOnly?: boolean;
        }): void;
    };
}
/**
 * Resolve the default locale for a visitor.
 *
 * Priority:
 *   1. Käyttäjätunnuksen default-kieli (`preferredLocale` — esim. sessionista).
 *   2. Aiemmin valittu kieli (`mk_locale`-eväste).
 *   3. Geo: Suomi → fi, muut maat → en.
 */
export declare function geoDefaultLocale(req: GeoRequest, preferredLocale?: string | null): "fi" | "en";
/**
 * Apply geo-detection cookies based on Vercel country header.
 * Only sets cookies if they don't already exist (respects user choice).
 */
export declare function applyGeoDetection(req: GeoRequest, res: GeoResponse): void;
export {};
//# sourceMappingURL=geoDetection.d.ts.map