/**
 * EU VAT — shared rate table + calculation for all Musakonttori products.
 *
 * Pure module: no React, no Next.js, no logger, no random data. Safe to import
 * from both server actions and client bundles. The buyer's country (place of
 * supply for B2C digital services) determines the rate.
 *
 * Canonical source of the rate table. The Market app's
 * `server/services/oss-ioss-service.ts` historically owned this — that module
 * keeps the OSS/IOSS report generation and should re-export from here rather
 * than maintain its own copy.
 */
export type VATSchemeType = "DOMESTIC" | "OSS" | "IOSS" | "STANDARD";
export type ProductType = "general" | "books" | "food" | "children" | "medical";
export interface VatRates {
    standard: number;
    reduced: number;
    superReduced: number;
}
export interface VATResult {
    vatRate: number;
    vatAmountCents: number;
    totalWithoutVATCents: number;
    totalWithVATCents: number;
    scheme: VATSchemeType;
    sellerCountry: string;
    buyerCountry: string;
}
/** Standard / reduced / super-reduced rates per EU member state (percent). */
export declare const EU_VAT_RATES: Record<string, VatRates>;
export declare const EU_COUNTRY_NAMES: Record<string, string>;
export declare const EU_COUNTRY_CODES: string[];
export declare function isEUCountry(countryCode: string): boolean;
export declare function getProductVATRate(countryCode: string, productType?: ProductType): number;
export declare function getVATRate(countryCode: string, productType?: string): number;
export declare function determineVATScheme(sellerCountry: string, buyerCountry: string, orderTotalEUR: number): VATSchemeType;
export declare function calculateVAT(orderTotalCents: number, sellerCountry: string, buyerCountry: string, productType?: string): VATResult;
export interface VATIdValidation {
    valid: boolean;
    countryCode: string | null;
    formattedId: string;
}
/**
 * Basic EU VAT number shape check (country prefix + 7–12 digits). Does not
 * perform a VIES lookup — callers that need full verification must hit VIES.
 */
export declare function validateVATID(vatId: string): VATIdValidation;
//# sourceMappingURL=vat.d.ts.map