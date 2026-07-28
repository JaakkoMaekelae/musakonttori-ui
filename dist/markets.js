/**
 * Canonical country → locale → currency mapping for all Musakonttori products.
 *
 * Country detected from Vercel `x-vercel-ip-country` header.
 * Language and currency are selectable per country.
 * EUR is always available as a currency option.
 */
export const MARKETS = [
    { country: "FI", locale: "fi", flag: "🇫🇮", name: "Suomi", currency: "EUR", symbol: "€" },
    { country: "SE", locale: "sv", flag: "🇸🇪", name: "Sverige", currency: "SEK", symbol: "kr" },
    { country: "NO", locale: "nb", flag: "🇳🇴", name: "Norge", currency: "NOK", symbol: "kr" },
    { country: "DK", locale: "da", flag: "🇩🇰", name: "Danmark", currency: "DKK", symbol: "kr" },
    { country: "DE", locale: "de", flag: "🇩🇪", name: "Deutschland", currency: "EUR", symbol: "€" },
    { country: "AT", locale: "de", flag: "🇦🇹", name: "Österreich", currency: "EUR", symbol: "€" },
    { country: "CH", locale: "de", flag: "🇨🇭", name: "Schweiz", currency: "CHF", symbol: "Fr" },
    { country: "NL", locale: "nl", flag: "🇳🇱", name: "Nederland", currency: "EUR", symbol: "€" },
    { country: "BE", locale: "nl", flag: "🇧🇪", name: "België", currency: "EUR", symbol: "€" },
    { country: "FR", locale: "fr", flag: "🇫🇷", name: "France", currency: "EUR", symbol: "€" },
    { country: "EE", locale: "et", flag: "🇪🇪", name: "Eesti", currency: "EUR", symbol: "€" },
    { country: "LV", locale: "lv", flag: "🇱🇻", name: "Latvija", currency: "EUR", symbol: "€" },
    { country: "LT", locale: "lt", flag: "🇱🇹", name: "Lietuva", currency: "EUR", symbol: "€" },
    { country: "IT", locale: "it", flag: "🇮🇹", name: "Italia", currency: "EUR", symbol: "€" },
    { country: "ES", locale: "es", flag: "🇪🇸", name: "España", currency: "EUR", symbol: "€" },
    { country: "PT", locale: "pt", flag: "🇵🇹", name: "Portugal", currency: "EUR", symbol: "€" },
    { country: "PL", locale: "pl", flag: "🇵🇱", name: "Polska", currency: "EUR", symbol: "€" },
    // English fallback for non-European countries
    { country: "GB", locale: "en", flag: "🇬🇧", name: "United Kingdom", currency: "GBP", symbol: "£" },
    { country: "US", locale: "en", flag: "🇺🇸", name: "United States", currency: "USD", symbol: "$" },
];
/** All unique currencies with their symbols. EUR always first. */
export const MARKET_CURRENCIES = (() => {
    const seen = new Map();
    // EUR always first
    seen.set("EUR", "€");
    for (const m of MARKETS) {
        if (!seen.has(m.currency))
            seen.set(m.currency, m.symbol);
    }
    return Array.from(seen, ([code, symbol]) => ({ code, symbol }));
})();
/** All unique locales with labels. */
export const APP_LOCALES = [
    { code: "fi", flag: "🇫🇮", label: "Suomi" },
    { code: "en", flag: "🌐", label: "English" },
    { code: "sv", flag: "🇸🇪", label: "Svenska" },
    { code: "nb", flag: "🇳🇴", label: "Norsk" },
    { code: "da", flag: "🇩🇰", label: "Dansk" },
    { code: "de", flag: "🇩🇪", label: "Deutsch" },
    { code: "nl", flag: "🇳🇱", label: "Nederlands" },
    { code: "fr", flag: "🇫🇷", label: "Français" },
    { code: "et", flag: "🇪🇪", label: "Eesti" },
    { code: "lv", flag: "🇱🇻", label: "Latviešu" },
    { code: "lt", flag: "🇱🇹", label: "Lietuvių" },
    { code: "it", flag: "🇮🇹", label: "Italiano" },
    { code: "es", flag: "🇪🇸", label: "Español" },
    { code: "pt", flag: "🇵🇹", label: "Português" },
    { code: "pl", flag: "🇵🇱", label: "Polski" },
];
/** Look up market by country code. Falls back to FI if not found. */
export function getMarketByCountry(country) {
    if (!country)
        return MARKETS[0]; // FI default
    const m = MARKETS.find((m) => m.country === country.toUpperCase());
    return m ?? MARKETS[0];
}
/** Look up market by locale. Falls back to FI. */
export function getMarketByLocale(locale) {
    const m = MARKETS.find((m) => m.locale === locale);
    return m ?? MARKETS[0];
}
/** Get the default locale for a country. */
export function getLocaleForCountry(country) {
    return getMarketByCountry(country).locale;
}
/** Get the currency for a country. */
export function getCurrencyForCountry(country) {
    return getMarketByCountry(country).currency;
}
/**
 * Cookie names for country/locale/currency preferences.
 * Set by middleware on first visit, respected on subsequent visits.
 */
export const COUNTRY_COOKIE = "mk_country";
export const LOCALE_COOKIE = "mk_locale";
export const CURRENCY_COOKIE = "mk_currency";
