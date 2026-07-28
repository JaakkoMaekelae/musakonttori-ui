/**
 * Canonical country → locale → currency mapping for all Musakonttori products.
 *
 * Country detected from Vercel `x-vercel-ip-country` header.
 * Language and currency are selectable per country.
 * EUR is always available as a currency option.
 */
export interface CountryMarket {
    country: string;
    locale: string;
    flag: string;
    name: string;
    currency: string;
    symbol: string;
}
export declare const MARKETS: readonly CountryMarket[];
export type Market = (typeof MARKETS)[number];
/** All unique currencies with their symbols. EUR always first. */
export declare const MARKET_CURRENCIES: readonly {
    code: string;
    symbol: string;
}[];
/** All unique locales with labels. */
export declare const APP_LOCALES: readonly {
    code: string;
    flag: string;
    label: string;
}[];
/** Look up market by country code. Falls back to FI if not found. */
export declare function getMarketByCountry(country: string | null | undefined): CountryMarket;
/** Look up market by locale. Falls back to FI. */
export declare function getMarketByLocale(locale: string): CountryMarket;
/** Get the default locale for a country. */
export declare function getLocaleForCountry(country: string | null | undefined): string;
/** Get the currency for a country. */
export declare function getCurrencyForCountry(country: string | null | undefined): string;
/**
 * Cookie names for country/locale/currency preferences.
 * Set by middleware on first visit, respected on subsequent visits.
 */
export declare const COUNTRY_COOKIE = "mk_country";
export declare const LOCALE_COOKIE = "mk_locale";
export declare const CURRENCY_COOKIE = "mk_currency";
//# sourceMappingURL=markets.d.ts.map