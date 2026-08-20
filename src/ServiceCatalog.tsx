"use client";

import { ArrowRight, ExternalLink } from "lucide-react";

export interface ServiceEntry {
  key: string;
  name: string;
  taglineFi: string;
  taglineEn: string;
  icon: string;
  pricingModel: "subscription" | "one-time" | "tiered" | "free" | "composite";
  pricingSummaryFi: string;
  pricingSummaryEn: string;
  plans: { name: string; price: string; featuresFi: string[]; featuresEn: string[] }[];
  ctaLabelFi: string;
  ctaLabelEn: string;
  url: (locale: string) => string;
  available: boolean;
}

export const SERVICES: ServiceEntry[] = [
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
    url: (locale: string) => `https://musakonttori-live.vercel.app/${locale}`,
    available: true,
  },
  {
    key: "links",
    name: "Links",
    taglineFi: "Artistin digitaalinen käyntikortti — älykkäät linkit ja bio-sivut",
    taglineEn: "Artist's digital storefront — smart links and bio pages",
    icon: "🔗",
    pricingModel: "tiered",
    pricingSummaryFi: "Alkaen 0 € (ilmainen), Agency 149 €/kk",
    pricingSummaryEn: "From €0 (free), Agency €149/mo",
    plans: [
      {
        name: "Free",
        price: "0 €/kk",
        featuresFi: ["Enintään 3 sivua", "5 älylinkkiä", "Perusanalytiikka", "1 työtila"],
        featuresEn: ["Up to 3 pages", "5 smart links", "Basic analytics", "1 workspace"],
      },
      {
        name: "Pro",
        price: "12 €/kk",
        featuresFi: ["Rajattomat älylinkit", "Kehittynyt analytiikka", "Mukautetut verkkotunnukset", "3 työtilaa"],
        featuresEn: ["Unlimited smart links", "Advanced analytics", "Custom domains", "3 workspaces"],
      },
      {
        name: "Team",
        price: "49 €/kk",
        featuresFi: ["15 työtilaa", "Tiimiyhteistyö", "API-yhteys", "Prioriteettituki"],
        featuresEn: ["15 workspaces", "Team collaboration", "API access", "Priority support"],
      },
      {
        name: "Agency",
        price: "149 €/kk",
        featuresFi: ["Rajattomat työtilat", "White-label", "Oma yhteyshenkilö", "SLA"],
        featuresEn: ["Unlimited workspaces", "White-label", "Dedicated support", "SLA"],
      },
    ],
    ctaLabelFi: "Luo linkkisivu",
    ctaLabelEn: "Create link page",
    url: (locale: string) => `https://musakonttori-links.vercel.app/${locale}`,
    available: true,
  },
  {
    key: "promo",
    name: "Promo",
    taglineFi: "Musiikkialan kampanjamoottori — some + sähköposti + AI",
    taglineEn: "Music industry campaign engine — social + email + AI",
    icon: "📢",
    pricingModel: "tiered",
    pricingSummaryFi: "Alkaen 0 € (ilmainen), Team 19,90 €/kk",
    pricingSummaryEn: "From €0 (free), Team €19.90/mo",
    plans: [
      {
        name: "Free",
        price: "0 €/kk",
        featuresFi: ["1 someprofiili", "5 postausta/kk", "10 AI-krediittiä", "1 kampanja"],
        featuresEn: ["1 social profile", "5 posts/mo", "10 AI credits", "1 campaign"],
      },
      {
        name: "Creator",
        price: "4,90 €/kk",
        featuresFi: ["3 someprofiilia", "30 postausta/kk", "50 AI-krediittiä", "3 kampanjaa"],
        featuresEn: ["3 social profiles", "30 posts/mo", "50 AI credits", "3 campaigns"],
      },
      {
        name: "Growth",
        price: "9,90 €/kk",
        featuresFi: ["10 someprofiilia", "100 postausta/kk", "200 AI-krediittiä", "Brändikitit"],
        featuresEn: ["10 social profiles", "100 posts/mo", "200 AI credits", "Brand kits"],
      },
      {
        name: "Team",
        price: "19,90 €/kk",
        featuresFi: ["25 someprofiilia", "250 postausta/kk", "500 AI-krediittiä", "10 käyttäjää"],
        featuresEn: ["25 social profiles", "250 posts/mo", "500 AI credits", "10 users"],
      },
    ],
    ctaLabelFi: "Aloita kampanja",
    ctaLabelEn: "Start a campaign",
    url: (locale: string) => `https://musakonttori-promo.vercel.app/${locale}`,
    available: true,
  },
  {
    key: "mastering",
    name: "Mastering",
    taglineFi: "AI-masterointi — kuukausitilauksella tai kertaostona per kappale",
    taglineEn: "AI mastering — monthly subscription or pay-per-track",
    icon: "🎛️",
    pricingModel: "tiered",
    pricingSummaryFi: "Alkaen 2,90 €/kappale, tai 9,90 €/kk (Label 49 €/kk)",
    pricingSummaryEn: "From €2.90/track, or €9.90/mo (Label €49/mo)",
    plans: [
      {
        name: "Artist",
        price: "9,90 €/kk",
        featuresFi: ["5 krediittiä/kk", "Quick & Release Master", "Sähköpostituki"],
        featuresEn: ["5 credits/mo", "Quick & Release Master", "Email support"],
      },
      {
        name: "Pro Artist",
        price: "19,90 €/kk",
        featuresFi: ["15 krediittiä/kk", "Kaikki masterointipaketit", "Prioriteettijono"],
        featuresEn: ["15 credits/mo", "All mastering packages", "Priority queue"],
      },
      {
        name: "Label",
        price: "49 €/kk",
        featuresFi: ["50 krediittiä/kk", "Batch & Album", "API-pääsy", "White label"],
        featuresEn: ["50 credits/mo", "Batch & Album", "API access", "White label"],
      },
      {
        name: "Enterprise",
        price: "Custom",
        featuresFi: ["Rajaton määrä", "Oma instanssi", "SLA-sopimus", "Dedikoitu tuki"],
        featuresEn: ["Unlimited volume", "Dedicated instance", "SLA", "Dedicated support"],
      },
    ],
    ctaLabelFi: "Masteroi kappale",
    ctaLabelEn: "Master a track",
    url: (locale: string) => `https://musakonttori-mastering.vercel.app/${locale}`,
    available: true,
  },
  {
    key: "ticketing",
    name: "Ticketing",
    taglineFi: "Lipunmyynti ja kulunvalvonta — myy lippuja helposti",
    taglineEn: "Ticketing and access control — sell tickets easily",
    icon: "🎫",
    pricingModel: "tiered",
    pricingSummaryFi: "Alkaen 0 €/kk + 3,5 % per myynti, Venue 149 €/kk + 1,4 %",
    pricingSummaryEn: "From €0/mo + 3.5% per sale, Venue €149/mo + 1.4%",
    plans: [
      {
        name: "Starter",
        price: "0 €/kk",
        featuresFi: ["3,5 % + 0,50 € per lippu", "Omat lippusivut", "Stripe Connect", "Sähköpostilipputoimitus"],
        featuresEn: ["3.5% + €0.50 per ticket", "Hosted ticket pages", "Stripe Connect", "Email ticket delivery"],
      },
      {
        name: "Pro",
        price: "49 €/kk",
        featuresFi: ["2,0 % + 0,40 € per lippu", "Upotettu kassa", "Oma domain", "Kampanjaseuranta"],
        featuresEn: ["2.0% + €0.40 per ticket", "Embedded checkout", "Custom domain", "Campaign attribution"],
      },
      {
        name: "Venue",
        price: "149 €/kk",
        featuresFi: ["1,4 % + 0,30 € per lippu", "Skanneri-tiimitilit", "Tilityspidot", "Prioriteettituki"],
        featuresEn: ["1.4% + €0.30 per ticket", "Scanner team accounts", "Settlement holds", "Priority support"],
      },
      {
        name: "Enterprise",
        price: "Custom",
        featuresFi: ["Neuvoteltu palvelumaksu", "SLA & DPA", "Oma menestyspäällikkö", "SSO + tarkastusloki"],
        featuresEn: ["Negotiated fee", "SLA & DPA", "Dedicated success manager", "SSO + audit log"],
      },
    ],
    ctaLabelFi: "Myy lippuja",
    ctaLabelEn: "Sell tickets",
    url: (locale: string) => `https://musakonttori-ticketing.vercel.app/${locale}`,
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
        featuresFi: ["Artistiprofiili", "Keikkojen hallinta", "Faniviestit", "Sisältää: Links Pro + Promo Creator"],
        featuresEn: ["Artist profile", "Event management", "Fan messages", "Includes: Links Pro + Promo Creator"],
      },
      {
        name: "Järjestäjä",
        price: "59,90 €/kk",
        featuresFi: ["Monitapahtuma", "Artistibookkaus", "Sisältää: Ticketing Pro + Promo Growth + Links Pro"],
        featuresEn: ["Multi-event", "Artist booking", "Includes: Ticketing Pro + Promo Growth + Links Pro"],
      },
    ],
    ctaLabelFi: "Tutustu StageFlowiin",
    ctaLabelEn: "Explore StageFlow",
    url: (locale: string) => `https://musakonttori-stageflow.vercel.app/${locale}`,
    available: true,
  },
  {
    key: "market",
    name: "Market",
    taglineFi: "Verkkokauppa artisteille — myy merch, levyt, liput",
    taglineEn: "E-commerce for artists — sell merch, records, tickets",
    icon: "🛒",
    pricingModel: "tiered",
    pricingSummaryFi: "Alkaen 0 € (ilmainen) + 5 % myyntipalkkio, Pro 79 €/kk + 1 %",
    pricingSummaryEn: "From €0 (free) + 5% sales fee, Pro €79/mo + 1%",
    plans: [
      {
        name: "Free",
        price: "0 €/kk",
        featuresFi: ["10 tuotetta", "5 % myyntipalkkio", "Turvallinen kassa", "Perusraportit"],
        featuresEn: ["10 products", "5% sales fee", "Secure checkout", "Basic reports"],
      },
      {
        name: "Growth",
        price: "29 €/kk",
        featuresFi: ["Rajattomat tuotteet", "2,5 % myyntipalkkio", "Oma verkkotunnus", "Edistynyt analytiikka"],
        featuresEn: ["Unlimited products", "2.5% sales fee", "Custom domain", "Advanced analytics"],
      },
      {
        name: "Pro",
        price: "79 €/kk",
        featuresFi: ["1 % myyntipalkkio", "5 tiimijäsentä", "B2B-hinnastot", "Useita varastosijainteja"],
        featuresEn: ["1% sales fee", "5 team members", "B2B pricing", "Multiple inventory locations"],
      },
    ],
    ctaLabelFi: "Avaa kauppa",
    ctaLabelEn: "Open store",
    url: (locale: string) => `https://musakonttori-market.vercel.app/${locale}`,
    available: true,
  },
];

const modelBadge: Record<string, { labelFi: string; labelEn: string; color: string }> = {
  subscription: { labelFi: "Kk-maksu", labelEn: "Monthly", color: "bg-blue-50 text-blue-700 border-blue-200" },
  "one-time": { labelFi: "Kertamaksu", labelEn: "One-time", color: "bg-amber-50 text-amber-700 border-amber-200" },
  tiered: { labelFi: "Tasohinnoittelu", labelEn: "Tiered", color: "bg-purple-50 text-purple-700 border-purple-200" },
  free: { labelFi: "Ilmainen", labelEn: "Free", color: "bg-green-50 text-green-700 border-green-200" },
  composite: { labelFi: "Yhdistelmä", labelEn: "Composite", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
};

export interface ServiceCatalogProps {
  locale?: string;
  hideFooterCta?: boolean;
  excludeKeys?: string[];
}

export function ServiceCatalog({ locale = "fi", hideFooterCta = false, excludeKeys = [] }: ServiceCatalogProps) {
  const isFi = locale === "fi";
  const services = excludeKeys.length > 0 ? SERVICES.filter((svc) => !excludeKeys.includes(svc.key)) : SERVICES;

  return (
    <section className="sect" id="kaikki-palvelut">
      <div className="container">
        <div className="sect-header">
          <span className="eyebrow">
            {isFi ? "Musakonttori-ekosysteemi" : "Musakonttori ecosystem"}
          </span>
          <h2>
            {isFi ? "Kaikki palvelut" : "All services"}
          </h2>
          <p className="sect-lead max-w-2xl mx-auto">
            {isFi
              ? "Jokaisella palvelulla on oma hinnoittelumallinsa. Valitse tarvitsemasi palvelut — mitä enemmän käytät, sitä edullisemmaksi kokonaisuus tulee."
              : "Each service has its own pricing model. Choose the services you need — the more you use, the better the overall price."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const badge = modelBadge[svc.pricingModel] ?? { labelFi: svc.pricingModel, labelEn: svc.pricingModel, color: "bg-gray-50 text-gray-600 border-gray-200" };
            const href = svc.url(locale);

            return (
              <div
                key={svc.key}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg ${
                  svc.available ? "border-gray-200" : "border-dashed border-gray-300 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{svc.icon}</span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.color}`}
                  >
                    {isFi ? badge.labelFi : badge.labelEn}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">{svc.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  {isFi ? svc.taglineFi : svc.taglineEn}
                </p>

                <p className="text-sm font-semibold text-[var(--mk-palette-primary,#BF2227)] mb-4">
                  {isFi ? svc.pricingSummaryFi : svc.pricingSummaryEn}
                </p>

                <div className="space-y-3 flex-1">
                  {svc.plans.map((plan) => (
                    <div
                      key={plan.name}
                      className="rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2.5"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">{plan.name}</span>
                        <span className="text-sm font-bold text-gray-900">{plan.price}</span>
                      </div>
                      <ul className="space-y-0.5">
                        {(isFi ? plan.featuresFi : plan.featuresEn).slice(0, 3).map((f) => (
                          <li key={f} className="flex items-start gap-1.5 text-xs text-gray-500">
                            <span className="mt-0.5 shrink-0 text-green-500">✓</span>
                            {f}
                          </li>
                        ))}
                        {(isFi ? plan.featuresFi : plan.featuresEn).length > 3 && (
                          <li className="text-xs text-gray-400 pl-4">
                            {isFi ? `+${(isFi ? plan.featuresFi : plan.featuresEn).length - 3} lisää` : `+${(isFi ? plan.featuresFi : plan.featuresEn).length - 3} more`}
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  {svc.available ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--mk-palette-primary,#BF2227)] text-white px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      {isFi ? svc.ctaLabelFi : svc.ctaLabelEn}
                      {href.startsWith("http") ? (
                        <ExternalLink className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5" />
                      )}
                    </a>
                  ) : (
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-gray-100 text-gray-400 px-6 py-2.5 text-sm font-semibold cursor-not-allowed">
                      {isFi ? svc.ctaLabelFi : svc.ctaLabelEn}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!hideFooterCta && (
          <div className="mt-12">
            {/* Bundle pricing examples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { count: 2, discount: 20, standalone: "n. 20 €", standaloneEn: "approx. €20", bundle: "n. 16 €", bundleEn: "approx. €16", labelFi: "Perusduo", labelEn: "Basic Duo", descFi: "Esim. Links + Promo", descEn: "e.g. Links + Promo" },
                { count: 3, discount: 44, standalone: "n. 40 €", standaloneEn: "approx. €40", bundle: "n. 22 €", bundleEn: "approx. €22", labelFi: "Kasvupaketti", labelEn: "Growth Pack", descFi: "Esim. Links + Promo + Mastering", descEn: "e.g. Links + Promo + Mastering", highlighted: true },
                { count: 7, discount: 49, standalone: "65,23 €", standaloneEn: "€65.23", bundle: "32,90 €", bundleEn: "€32.90", labelFi: "Kaikki palvelut", labelEn: "All Services", descFi: "Koko ekosysteemi yhdellä hinnalla", descEn: "The entire ecosystem, one price" },
              ].map((pkg) => (
                <div
                  key={pkg.count}
                  className={`rounded-2xl border p-6 text-center transition-shadow hover:shadow-md ${
                    pkg.highlighted
                      ? "border-[var(--mk-palette-primary,#BF2227)] bg-[var(--mk-palette-primary-subtle,rgba(191,34,39,0.04))] ring-1 ring-[var(--mk-palette-primary,#BF2227)]/20"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="inline-block mb-2 rounded-full bg-[var(--mk-palette-primary,#BF2227)] text-white text-xs font-bold px-3 py-0.5">
                      {isFi ? "Suosituin" : "Most Popular"}
                    </span>
                  )}
                  <div className="text-sm font-semibold text-gray-500 mb-1">
                    {pkg.count} {isFi ? "palvelua" : "services"}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {isFi ? pkg.bundle : pkg.bundleEn}
                    <span className="text-base font-normal text-gray-400">{isFi ? "/kk" : "/mo"}</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium mb-3">
                    -{pkg.discount} % {isFi ? "bundlessa" : "in bundle"}
                  </div>
                  <div className="text-xs text-gray-400 line-through mb-1">
                    {isFi ? "erikseen" : "separately"} {isFi ? pkg.standalone : pkg.standaloneEn}{isFi ? "/kk" : "/mo"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isFi ? pkg.descFi : pkg.descEn}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-[var(--mk-palette-primary-subtle,rgba(191,34,39,0.06))] to-transparent border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isFi ? "Haluatko useamman palvelun?" : "Want multiple services?"}
              </h3>
              <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                {isFi
                  ? "Räätälöidään sinulle sopiva kokonaisuus. Mitä enemmän palveluita otat, sitä paremman pakettihinnan saat. Kaikki 7 palvelua vain 32,90 €/kk."
                  : "We'll tailor a package for you. The more services you take, the better the bundle price. All 7 services for just €32.90/mo."}
              </p>
              <a
                href="mailto:hello@musakonttori.fi"
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-8 py-3 text-base font-semibold hover:bg-gray-800 transition-colors"
              >
                {isFi ? "Kysy tarjous" : "Request a quote"} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
