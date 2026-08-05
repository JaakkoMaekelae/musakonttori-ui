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
import { getLocaleForCountry, getCurrencyForCountry, COUNTRY_COOKIE, LOCALE_COOKIE, CURRENCY_COOKIE } from "./markets";
/**
 * Apply geo-detection cookies based on Vercel country header.
 * Only sets cookies if they don't already exist (respects user choice).
 */
export function applyGeoDetection(req, res) {
    const existingCountry = req.cookies.get(COUNTRY_COOKIE)?.value;
    if (existingCountry)
        return; // user already has a preference
    const country = getHeader(req.headers, "x-vercel-ip-country") ?? getHeader(req.headers, "cf-ipcountry");
    if (!country || country === "XX")
        return; // unknown/private
    const locale = getLocaleForCountry(country);
    const currency = getCurrencyForCountry(country);
    const cookieOpts = {
        maxAge: 365 * 24 * 60 * 60, // 1 year
        path: "/",
        sameSite: "lax",
        httpOnly: false,
    };
    res.cookies.set(COUNTRY_COOKIE, country, cookieOpts);
    res.cookies.set(LOCALE_COOKIE, locale, cookieOpts);
    res.cookies.set(CURRENCY_COOKIE, currency, cookieOpts);
}
function getHeader(headers, name) {
    if (headers instanceof Headers)
        return headers.get(name);
    return headers[name] ?? null;
}
