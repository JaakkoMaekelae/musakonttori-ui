export interface ServiceEntry {
    key: string;
    name: string;
    taglineFi: string;
    taglineEn: string;
    icon: string;
    pricingModel: "subscription" | "one-time" | "tiered" | "free" | "composite";
    pricingSummaryFi: string;
    pricingSummaryEn: string;
    plans: {
        name: string;
        price: string;
        featuresFi: string[];
        featuresEn: string[];
    }[];
    ctaLabelFi: string;
    ctaLabelEn: string;
    url: (locale: string) => string;
    available: boolean;
}
export declare const SERVICES: ServiceEntry[];
export interface ServiceCatalogProps {
    locale?: string;
    hideFooterCta?: boolean;
}
export declare function ServiceCatalog({ locale, hideFooterCta }: ServiceCatalogProps): import("react").JSX.Element;
//# sourceMappingURL=ServiceCatalog.d.ts.map