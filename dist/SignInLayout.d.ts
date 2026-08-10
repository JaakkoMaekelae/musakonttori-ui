import { type ElementType } from "react";
export interface SignInLayoutBenefit {
    icon: ElementType<{
        className?: string;
    }>;
    label: string;
}
export interface SignInLayoutProps {
    productName: string;
    productTagline: string;
    brandEyebrow: string;
    brandTitle: string;
    brandTitleAccent: string;
    brandDescription: string;
    benefits: SignInLayoutBenefit[];
    previewTitle: string;
    previewValue: string;
    previewStatus: string;
    previewOrderName: string;
    previewOrderId: string;
    previewOrderStatus: string;
    previewOrderAmount: string;
    formTitle: string;
    formSubtitle: string;
    formDescription: string;
    onSignIn: (email: string, password: string) => Promise<void>;
    authMode?: "credentials" | "clerk";
    clerkSignInUrl?: string;
    accountsUrl?: string;
    accountsFrom?: string;
    registerHref: string;
    registerLabel: string;
    registerTitle: string;
    registerDescription: string;
    backHref: string;
    backLabel: string;
    securityNote: string;
    errorMessage?: string;
    className?: string;
    /** Current language, e.g. "fi". Built-in: fi, en, sv — unlisted locales fall back to fi. */
    locale?: string;
    /** Override any of the form's own built-in strings. Built-in: fi, en, sv. */
    labels?: {
        emailLabel?: string;
        emailPlaceholder?: string;
        passwordLabel?: string;
        passwordPlaceholder?: string;
        showPassword?: string;
        hidePassword?: string;
        signInButton?: string;
        clerkRedirect?: string;
        accountsRedirect?: string;
        orDivider?: string;
    };
}
/**
 * Reusable sign-in split-panel layout.
 *
 * Left panel: brand identity, benefits, preview card.
 * Right panel: back link, form heading, email/password form with show/hide,
 * error display, submit button, register prompt, security note.
 *
 * Consumer passes all strings, icons, and the auth handler — this component
 * owns zero product-specific copy or logic.
 */
export declare function SignInLayout({ productName, productTagline, brandEyebrow, brandTitle, brandTitleAccent, brandDescription, benefits, previewTitle, previewValue, previewStatus, previewOrderName, previewOrderId, previewOrderStatus, previewOrderAmount, formTitle, formSubtitle, formDescription, onSignIn, authMode, clerkSignInUrl, accountsUrl, accountsFrom, registerHref, registerLabel, registerTitle, registerDescription, backHref, backLabel, securityNote, errorMessage, className, locale, labels, }: SignInLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=SignInLayout.d.ts.map