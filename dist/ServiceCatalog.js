"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight, ExternalLink } from "lucide-react";
export const SERVICES = [
    {
        key: "liveguide",
        name: "LiveGuide",
        taglineFi: "Tapahtumahaku ja kaupunkioppaat",
        taglineEn: "Event discovery and city guides",
        icon: "📍",
        pricingModel: "free",
        pricingSummaryFi: "Ilmainen",
        pricingSummaryEn: "Free",
        plans: [
            {
                name: "Free",
                price: "0 €/kk",
                featuresFi: ["Keikkakalenterin selaus", "Artistien seuranta", "Kaupunki-suodatus"],
                featuresEn: ["Browse event calendar", "Follow artists", "City filter"],
            },
        ],
        ctaLabelFi: "Selaa tapahtumia",
        ctaLabelEn: "Browse events",
        url: (locale) => `https://musakonttori-live.vercel.app/${locale}`,
        available: true,
    },
    {
        key: "links",
        name: "Links",
        taglineFi: "Artistin digitaalinen käyntikortti — älykkäät linkit ja bio-sivut",
        taglineEn: "Artist's digital storefront — smart links and bio pages",
        icon: "🔗",
        pricingModel: "subscription",
        pricingSummaryFi: "Alkaen 4,90 €/kk",
        pricingSummaryEn: "From €4.90/mo",
        plans: [
            {
                name: "Starter",
                price: "4,90 €/kk",
                featuresFi: ["5 linkkiä", "Muokattava bio", "Analytiikka", "Pikseliseuranta"],
                featuresEn: ["5 links", "Customizable bio", "Analytics", "Pixel tracking"],
            },
            {
                name: "Pro",
                price: "9,90 €/kk",
                featuresFi: ["Rajoittamaton linkki", "Mukautettu domain", "Prioriteettituki"],
                featuresEn: ["Unlimited links", "Custom domain", "Priority support"],
            },
        ],
        ctaLabelFi: "Luo linkkisivu",
        ctaLabelEn: "Create link page",
        url: (locale) => `https://musakonttori-links.vercel.app/${locale}`,
        available: true,
    },
    {
        key: "promo",
        name: "Promo",
        taglineFi: "Musiikkialan kampanjamoottori — some + sähköposti + AI",
        taglineEn: "Music industry campaign engine — social + email + AI",
        icon: "📢",
        pricingModel: "subscription",
        pricingSummaryFi: "Alkaen 14,90 €/kk",
        pricingSummaryEn: "From €14.90/mo",
        plans: [
            {
                name: "Starter",
                price: "14,90 €/kk",
                featuresFi: ["5 kampanjaa/kk", "Sähköposti + some", "A/B-testaus"],
                featuresEn: ["5 campaigns/mo", "Email + social", "A/B testing"],
            },
            {
                name: "Pro",
                price: "39,90 €/kk",
                featuresFi: ["Rajoittamaton kampanja", "AI-sisällöntuotanto", "ROI-seuranta"],
                featuresEn: ["Unlimited campaigns", "AI content generation", "ROI tracking"],
            },
        ],
        ctaLabelFi: "Aloita kampanja",
        ctaLabelEn: "Start a campaign",
        url: (locale) => `https://musakonttori-promo.vercel.app/${locale}`,
        available: true,
    },
    {
        key: "soundlaunch",
        name: "SoundLaunch",
        taglineFi: "Julkaisunjakelu Spotify, Apple Music, TikTok — kertamaksu per julkaisu",
        taglineEn: "Distribution to Spotify, Apple Music, TikTok — one-time per release",
        icon: "🚀",
        pricingModel: "one-time",
        pricingSummaryFi: "Kertaluontoinen, alkaen 49 €/julkaisu",
        pricingSummaryEn: "One-time, from €49/release",
        plans: [
            {
                name: "Single",
                price: "49 €",
                featuresFi: ["1 kappale", "Spotify, Apple Music, TikTok", "YouTube Content ID", "Perusraportointi"],
                featuresEn: ["1 track", "Spotify, Apple Music, TikTok", "YouTube Content ID", "Basic reporting"],
            },
            {
                name: "EP",
                price: "79 €",
                featuresFi: ["2-6 kappaletta", "Kaikki alustat", "YouTube Content ID", "Edistynyt raportointi"],
                featuresEn: ["2-6 tracks", "All platforms", "YouTube Content ID", "Advanced reporting"],
            },
            {
                name: "Albumi",
                price: "129 €",
                featuresFi: ["7+ kappaletta", "Kaikki alustat", "Dolby Atmos", "Prioriteettijakelu", "Oma tukihenkilö"],
                featuresEn: ["7+ tracks", "All platforms", "Dolby Atmos", "Priority distribution", "Dedicated support"],
            },
        ],
        ctaLabelFi: "Julkaise musiikki",
        ctaLabelEn: "Release music",
        url: () => `https://musakonttori-soundlaunch.vercel.app`,
        available: true,
    },
    {
        key: "mastering",
        name: "Mastering",
        taglineFi: "AI-masterointi — valitse taso tarpeen mukaan",
        taglineEn: "AI mastering — choose your tier",
        icon: "🎛️",
        pricingModel: "tiered",
        pricingSummaryFi: "Alkaen 0 € (1 ilmainen/kk), Studio 59,90 €/kk",
        pricingSummaryEn: "From €0 (1 free/mo), Studio €59.90/mo",
        plans: [
            {
                name: "Free",
                price: "0 €/kk",
                featuresFi: ["1 masterointi/kk", "Perus-presetit", "MP3-lataus"],
                featuresEn: ["1 master/mo", "Basic presets", "MP3 download"],
            },
            {
                name: "Starter",
                price: "14,90 €/kk",
                featuresFi: ["5 masterointia/kk", "Kaikki presets", "WAV + MP3"],
                featuresEn: ["5 masters/mo", "All presets", "WAV + MP3"],
            },
            {
                name: "Artist",
                price: "29,90 €/kk",
                featuresFi: ["15 masterointia/kk", "HD-WAV + MP3", "Referenssiraitojen vertailu"],
                featuresEn: ["15 masters/mo", "HD-WAV + MP3", "Reference track comparison"],
            },
            {
                name: "Studio",
                price: "59,90 €/kk",
                featuresFi: ["Rajoittamaton", "HD-WAV + MP3 + Stems", "Batch-masterointi", "Oma ääniprofiili"],
                featuresEn: ["Unlimited", "HD-WAV + MP3 + Stems", "Batch mastering", "Custom sound profile"],
            },
        ],
        ctaLabelFi: "Masteroi kappale",
        ctaLabelEn: "Master a track",
        url: (locale) => `https://musakonttori-mastering.vercel.app/${locale}`,
        available: true,
    },
    {
        key: "ticketing",
        name: "Ticketing",
        taglineFi: "Lipunmyynti ja kulunvalvonta — myy lippuja helposti",
        taglineEn: "Ticketing and access control — sell tickets easily",
        icon: "🎫",
        pricingModel: "subscription",
        pricingSummaryFi: "Alkaen 14,90 €/kk + 2,5 % per myynti",
        pricingSummaryEn: "From €14.90/mo + 2.5% per sale",
        plans: [
            {
                name: "Starter",
                price: "14,90 €/kk",
                featuresFi: ["5 tapahtumaa", "3 lipputyyppiä", "QR-check-in", "2,5 % per-myynti"],
                featuresEn: ["5 events", "3 ticket types", "QR check-in", "2.5% per sale"],
            },
            {
                name: "Pro",
                price: "39,90 €/kk",
                featuresFi: ["Rajoittamaton tapahtuma", "QR + NFC", "Box Office", "1,5 % per-myynti"],
                featuresEn: ["Unlimited events", "QR + NFC", "Box Office", "1.5% per sale"],
            },
        ],
        ctaLabelFi: "Myy lippuja",
        ctaLabelEn: "Sell tickets",
        url: (locale) => `https://musakonttori-ticketing.vercel.app/${locale}`,
        available: true,
    },
    {
        key: "stageflow",
        name: "StageFlow",
        taglineFi: "Keikka-alusta — yhdistää Ticketing, Marketing ja Linksin",
        taglineEn: "Live event platform — combines Ticketing, Marketing and Links",
        icon: "🎪",
        pricingModel: "composite",
        pricingSummaryFi: "Alkaen 29,90 €/kk (sisältää perustason Ticketing + Marketing + Links)",
        pricingSummaryEn: "From €29.90/mo (includes basic Ticketing + Marketing + Links)",
        plans: [
            {
                name: "Artist",
                price: "29,90 €/kk",
                featuresFi: ["Artistiprofiili", "Keikkojen hallinta", "Faniviestit", "Sisältää: Links Pro + Promo Starter"],
                featuresEn: ["Artist profile", "Event management", "Fan messages", "Includes: Links Pro + Promo Starter"],
            },
            {
                name: "Järjestäjä",
                price: "59,90 €/kk",
                featuresFi: ["Monitapahtuma", "Artistibookkaus", "Sisältää: Ticketing Pro + Promo Pro + Links Pro"],
                featuresEn: ["Multi-event", "Artist booking", "Includes: Ticketing Pro + Promo Pro + Links Pro"],
            },
        ],
        ctaLabelFi: "Tutustu StageFlowiin",
        ctaLabelEn: "Explore StageFlow",
        url: (locale) => `https://musakonttori-stageflow.vercel.app/${locale}`,
        available: true,
    },
    {
        key: "market",
        name: "Market",
        taglineFi: "Verkkokauppa artisteille — myy merch, levyt, liput",
        taglineEn: "E-commerce for artists — sell merch, records, tickets",
        icon: "🛒",
        pricingModel: "subscription",
        pricingSummaryFi: "Alkaen 0 € (ilmainen), Pro 39,90 €/kk",
        pricingSummaryEn: "From €0 (free), Pro €39.90/mo",
        plans: [
            {
                name: "Free",
                price: "0 €/kk",
                featuresFi: ["5 tuotetta", "Perus-teema", "Maksut Stripe", "10 % komissio"],
                featuresEn: ["5 products", "Basic theme", "Stripe payments", "10% commission"],
            },
            {
                name: "Starter",
                price: "19,90 €/kk",
                featuresFi: ["50 tuotetta", "Muokattava teema", "Stripe-maksut", "5 % komissio", "Analytiikka"],
                featuresEn: ["50 products", "Custom theme", "Stripe payments", "5% commission", "Analytics"],
            },
            {
                name: "Pro",
                price: "39,90 €/kk",
                featuresFi: ["Rajoittamaton tuote", "Oma domain", "Varastohallinta", "2 % komissio", "Prioriteettituki"],
                featuresEn: ["Unlimited products", "Custom domain", "Inventory mgmt", "2% commission", "Priority support"],
            },
        ],
        ctaLabelFi: "Avaa kauppa",
        ctaLabelEn: "Open store",
        url: (locale) => `https://musakonttori-market.vercel.app/${locale}`,
        available: true,
    },
];
const modelBadge = {
    subscription: { labelFi: "Kk-maksu", labelEn: "Monthly", color: "bg-blue-50 text-blue-700 border-blue-200" },
    "one-time": { labelFi: "Kertamaksu", labelEn: "One-time", color: "bg-amber-50 text-amber-700 border-amber-200" },
    tiered: { labelFi: "Tasohinnoittelu", labelEn: "Tiered", color: "bg-purple-50 text-purple-700 border-purple-200" },
    free: { labelFi: "Ilmainen", labelEn: "Free", color: "bg-green-50 text-green-700 border-green-200" },
    composite: { labelFi: "Yhdistelmä", labelEn: "Composite", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
};
export function ServiceCatalog({ locale = "fi", hideFooterCta = false, excludeKeys = [] }) {
    const isFi = locale === "fi";
    const services = excludeKeys.length > 0 ? SERVICES.filter((svc) => !excludeKeys.includes(svc.key)) : SERVICES;
    return (_jsx("section", { className: "sect", id: "kaikki-palvelut", children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "sect-header", children: [_jsx("span", { className: "eyebrow", children: isFi ? "Musakonttori-ekosysteemi" : "Musakonttori ecosystem" }), _jsx("h2", { children: isFi ? "Kaikki palvelut" : "All services" }), _jsx("p", { className: "sect-lead max-w-2xl mx-auto", children: isFi
                                ? "Jokaisella palvelulla on oma hinnoittelumallinsa. Valitse tarvitsemasi palvelut — mitä enemmän käytät, sitä edullisemmaksi kokonaisuus tulee."
                                : "Each service has its own pricing model. Choose the services you need — the more you use, the better the overall price." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((svc) => {
                        const badge = modelBadge[svc.pricingModel] ?? { labelFi: svc.pricingModel, labelEn: svc.pricingModel, color: "bg-gray-50 text-gray-600 border-gray-200" };
                        const href = svc.url(locale);
                        return (_jsxs("div", { className: `relative flex flex-col rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg ${svc.available ? "border-gray-200" : "border-dashed border-gray-300 opacity-60"}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx("span", { className: "text-3xl", children: svc.icon }), _jsx("span", { className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.color}`, children: isFi ? badge.labelFi : badge.labelEn })] }), _jsx("h3", { className: "text-lg font-bold text-gray-900", children: svc.name }), _jsx("p", { className: "text-sm text-gray-500 mt-1 mb-4", children: isFi ? svc.taglineFi : svc.taglineEn }), _jsx("p", { className: "text-sm font-semibold text-[var(--mk-palette-primary,#BF2227)] mb-4", children: isFi ? svc.pricingSummaryFi : svc.pricingSummaryEn }), _jsx("div", { className: "space-y-3 flex-1", children: svc.plans.map((plan) => (_jsxs("div", { className: "rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5", children: [_jsxs("div", { className: "flex items-baseline justify-between mb-1", children: [_jsx("span", { className: "text-xs font-semibold text-gray-700", children: plan.name }), _jsx("span", { className: "text-sm font-bold text-gray-900", children: plan.price })] }), _jsxs("ul", { className: "space-y-0.5", children: [(isFi ? plan.featuresFi : plan.featuresEn).slice(0, 3).map((f) => (_jsxs("li", { className: "flex items-start gap-1.5 text-xs text-gray-500", children: [_jsx("span", { className: "mt-0.5 shrink-0 text-green-500", children: "\u2713" }), f] }, f))), (isFi ? plan.featuresFi : plan.featuresEn).length > 3 && (_jsx("li", { className: "text-xs text-gray-400 pl-4", children: isFi ? `+${(isFi ? plan.featuresFi : plan.featuresEn).length - 3} lisää` : `+${(isFi ? plan.featuresFi : plan.featuresEn).length - 3} more` }))] })] }, plan.name))) }), _jsx("div", { className: "mt-5 pt-4 border-t border-gray-100", children: svc.available ? (_jsxs("a", { href: href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined, className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--mk-palette-primary,#BF2227)] text-white px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity", children: [isFi ? svc.ctaLabelFi : svc.ctaLabelEn, href.startsWith("http") ? (_jsx(ExternalLink, { className: "h-3.5 w-3.5" })) : (_jsx(ArrowRight, { className: "h-3.5 w-3.5" }))] })) : (_jsx("span", { className: "inline-flex w-full items-center justify-center rounded-full bg-gray-100 text-gray-400 px-6 py-2.5 text-sm font-semibold cursor-not-allowed", children: isFi ? svc.ctaLabelFi : svc.ctaLabelEn })) })] }, svc.key));
                    }) }), !hideFooterCta && (_jsxs("div", { className: "mt-12", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8", children: [
                                { count: 2, discount: 20, standalone: "n. 20 €", standaloneEn: "approx. €20", bundle: "n. 16 €", bundleEn: "approx. €16", labelFi: "Perusduo", labelEn: "Basic Duo", descFi: "Esim. Links + Promo", descEn: "e.g. Links + Promo" },
                                { count: 4, discount: 44, standalone: "n. 40 €", standaloneEn: "approx. €40", bundle: "n. 22 €", bundleEn: "approx. €22", labelFi: "Kasvupaketti", labelEn: "Growth Pack", descFi: "Esim. Links + Promo + SoundLaunch + Mastering", descEn: "e.g. Links + Promo + SoundLaunch + Mastering", highlighted: true },
                                { count: 8, discount: 49, standalone: "65,23 €", standaloneEn: "€65.23", bundle: "32,90 €", bundleEn: "€32.90", labelFi: "Kaikki palvelut", labelEn: "All Services", descFi: "Koko ekosysteemi yhdellä hinnalla", descEn: "The entire ecosystem, one price" },
                            ].map((pkg) => (_jsxs("div", { className: `rounded-2xl border p-6 text-center transition-shadow hover:shadow-md ${pkg.highlighted
                                    ? "border-[var(--mk-palette-primary,#BF2227)] bg-[var(--mk-palette-primary-subtle,rgba(191,34,39,0.04))] ring-1 ring-[var(--mk-palette-primary,#BF2227)]/20"
                                    : "border-gray-200 bg-white"}`, children: [pkg.highlighted && (_jsx("span", { className: "inline-block mb-2 rounded-full bg-[var(--mk-palette-primary,#BF2227)] text-white text-xs font-bold px-3 py-0.5", children: isFi ? "Suosituin" : "Most Popular" })), _jsxs("div", { className: "text-sm font-semibold text-gray-500 mb-1", children: [pkg.count, " ", isFi ? "palvelua" : "services"] }), _jsxs("div", { className: "text-3xl font-bold text-gray-900 mb-1", children: [isFi ? pkg.bundle : pkg.bundleEn, _jsx("span", { className: "text-base font-normal text-gray-400", children: isFi ? "/kk" : "/mo" })] }), _jsxs("div", { className: "text-xs text-green-600 font-medium mb-3", children: ["-", pkg.discount, " % ", isFi ? "bundlessa" : "in bundle"] }), _jsxs("div", { className: "text-xs text-gray-400 line-through mb-1", children: [isFi ? "erikseen" : "separately", " ", isFi ? pkg.standalone : pkg.standaloneEn, isFi ? "/kk" : "/mo"] }), _jsx("div", { className: "text-xs text-gray-500", children: isFi ? pkg.descFi : pkg.descEn })] }, pkg.count))) }), _jsxs("div", { className: "text-center p-8 rounded-2xl bg-gradient-to-r from-[var(--mk-palette-primary-subtle,rgba(191,34,39,0.06))] to-transparent border border-gray-100", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 mb-2", children: isFi ? "Haluatko useamman palvelun?" : "Want multiple services?" }), _jsx("p", { className: "text-gray-500 mb-6 max-w-lg mx-auto", children: isFi
                                        ? "Räätälöidään sinulle sopiva kokonaisuus. Mitä enemmän palveluita otat, sitä paremman pakettihinnan saat. Kaikki 8 palvelua vain 32,90 €/kk."
                                        : "We'll tailor a package for you. The more services you take, the better the bundle price. All 8 services for just €32.90/mo." }), _jsxs("a", { href: "mailto:hello@musakonttori.fi", className: "inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-8 py-3 text-base font-semibold hover:bg-gray-800 transition-colors", children: [isFi ? "Kysy tarjous" : "Request a quote", " ", _jsx(ArrowRight, { className: "h-4 w-4" })] })] })] }))] }) }));
}
