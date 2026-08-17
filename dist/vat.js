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
/** Standard / reduced / super-reduced rates per EU member state (percent). */
export const EU_VAT_RATES = {
    AT: { standard: 20, reduced: 10, superReduced: 0 },
    BE: { standard: 21, reduced: 6, superReduced: 0 },
    BG: { standard: 20, reduced: 9, superReduced: 0 },
    CY: { standard: 19, reduced: 5, superReduced: 0 },
    CZ: { standard: 21, reduced: 12, superReduced: 0 },
    DE: { standard: 19, reduced: 7, superReduced: 0 },
    DK: { standard: 25, reduced: 0, superReduced: 0 },
    EE: { standard: 22, reduced: 9, superReduced: 0 },
    EL: { standard: 24, reduced: 13, superReduced: 6 },
    ES: { standard: 21, reduced: 10, superReduced: 4 },
    FI: { standard: 25.5, reduced: 14, superReduced: 10 },
    FR: { standard: 20, reduced: 10, superReduced: 5.5 },
    HR: { standard: 25, reduced: 13, superReduced: 5 },
    HU: { standard: 27, reduced: 18, superReduced: 5 },
    IE: { standard: 23, reduced: 13.5, superReduced: 9 },
    IT: { standard: 22, reduced: 10, superReduced: 4 },
    LT: { standard: 21, reduced: 9, superReduced: 5 },
    LU: { standard: 17, reduced: 8, superReduced: 3 },
    LV: { standard: 21, reduced: 12, superReduced: 0 },
    MT: { standard: 18, reduced: 7, superReduced: 5 },
    NL: { standard: 21, reduced: 9, superReduced: 0 },
    PL: { standard: 23, reduced: 8, superReduced: 5 },
    PT: { standard: 23, reduced: 13, superReduced: 6 },
    RO: { standard: 19, reduced: 9, superReduced: 5 },
    SE: { standard: 25, reduced: 12, superReduced: 6 },
    SI: { standard: 22, reduced: 9.5, superReduced: 0 },
    SK: { standard: 23, reduced: 10, superReduced: 5 },
};
export const EU_COUNTRY_NAMES = {
    AT: "Austria", BE: "Belgium", BG: "Bulgaria", CY: "Cyprus",
    CZ: "Czech Republic", DE: "Germany", DK: "Denmark", EE: "Estonia",
    EL: "Greece", ES: "Spain", FI: "Finland", FR: "France",
    HR: "Croatia", HU: "Hungary", IE: "Ireland", IT: "Italy",
    LT: "Lithuania", LU: "Luxembourg", LV: "Latvia", MT: "Malta",
    NL: "Netherlands", PL: "Poland", PT: "Portugal", RO: "Romania",
    SE: "Sweden", SI: "Slovenia", SK: "Slovakia",
};
export const EU_COUNTRY_CODES = Object.keys(EU_VAT_RATES);
const OSS_THRESHOLD_EUR = 10000;
const IOSS_THRESHOLD_EUR = 150;
export function isEUCountry(countryCode) {
    return countryCode.toUpperCase() in EU_VAT_RATES;
}
export function getProductVATRate(countryCode, productType = "general") {
    const rates = EU_VAT_RATES[countryCode.toUpperCase()];
    if (!rates)
        return 0;
    switch (productType) {
        case "books":
        case "food":
            return rates.reduced;
        case "children":
        case "medical":
            return rates.superReduced;
        case "general":
        default:
            return rates.standard;
    }
}
export function getVATRate(countryCode, productType) {
    return getProductVATRate(countryCode, productType ?? "general");
}
export function determineVATScheme(sellerCountry, buyerCountry, orderTotalEUR) {
    const seller = sellerCountry.toUpperCase();
    const buyer = buyerCountry.toUpperCase();
    if (seller === buyer)
        return "DOMESTIC";
    const isSellerEU = seller in EU_VAT_RATES;
    const isBuyerEU = buyer in EU_VAT_RATES;
    if (!isBuyerEU && orderTotalEUR <= IOSS_THRESHOLD_EUR) {
        return "IOSS";
    }
    if (isSellerEU && isBuyerEU && orderTotalEUR <= OSS_THRESHOLD_EUR * 100) {
        return "OSS";
    }
    return "STANDARD";
}
export function calculateVAT(orderTotalCents, sellerCountry, buyerCountry, productType) {
    const orderTotalEUR = orderTotalCents / 100;
    const scheme = determineVATScheme(sellerCountry, buyerCountry, orderTotalEUR);
    const vatRate = getProductVATRate(buyerCountry, productType ?? "general");
    const vatAmountCents = Math.round(orderTotalCents * (vatRate / 100));
    return {
        vatRate,
        vatAmountCents,
        totalWithoutVATCents: orderTotalCents,
        totalWithVATCents: orderTotalCents + vatAmountCents,
        scheme,
        sellerCountry: sellerCountry.toUpperCase(),
        buyerCountry: buyerCountry.toUpperCase(),
    };
}
/**
 * Basic EU VAT number shape check (country prefix + 7–12 digits). Does not
 * perform a VIES lookup — callers that need full verification must hit VIES.
 */
export function validateVATID(vatId) {
    const match = vatId.trim().toUpperCase().match(/^([A-Z]{2})(\d{7,12})$/);
    if (!match) {
        return { valid: false, countryCode: null, formattedId: vatId };
    }
    const countryCode = match[1];
    const number = match[2];
    if (!EU_VAT_RATES[countryCode]) {
        return { valid: false, countryCode, formattedId: vatId };
    }
    return { valid: true, countryCode, formattedId: `${countryCode}${number}` };
}
