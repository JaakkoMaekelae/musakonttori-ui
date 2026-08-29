export type CustomerSignInProvider = 'credentials' | 'nodemailer' | 'google' | 'facebook';
export interface CustomerSignInLabels {
    subtitle: string;
    tabEmail: string;
    tabSocial: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    signInEmail: string;
    sendMagicLink: string;
    continueGoogle: string;
    continueFacebook: string;
    noAccount: string;
    createOne: string;
    or: string;
    errorEnterEmail: string;
    errorInvalid: string;
    errorSendFailed: string;
    errorCheckEmail: string;
}
export interface CustomerSignInProps {
    /** Product/brand name shown above the form (e.g. "SmartLink", "Market"). */
    productName: string;
    /** Where the "create account" prompt links to (the product's register route). */
    registerHref: string;
    /** Where the "forgot password" prompt links to (optional). */
    resetHref?: string;
    /** Current language: fi, en, sv. Unlisted locales fall back to fi. */
    locale?: string;
    /**
     * Auth action. The product wires this to the shared Accounts client, e.g.
     * `(provider, opts) => signIn(provider, opts)` from
     * `@musakonttori/auth/accounts-client`.
     */
    onSignIn: (provider: CustomerSignInProvider, options?: {
        email?: string;
        password?: string;
        callbackUrl?: string;
    }) => void;
    /** Override any built-in string. */
    labels?: Partial<CustomerSignInLabels>;
    /** External error message (e.g. from a server-action login failure). */
    errorMessage?: string;
    className?: string;
}
export declare function CustomerSignIn({ productName, registerHref, resetHref, locale, onSignIn, labels, errorMessage, className, }: CustomerSignInProps): import("react").JSX.Element;
//# sourceMappingURL=CustomerSignIn.d.ts.map