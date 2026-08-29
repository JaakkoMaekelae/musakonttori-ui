export interface CustomerAccountType {
    value: string;
    label: string;
    requiresOrganization: boolean;
}
export interface CustomerRegisterSimpleLabels {
    name: string;
    email: string;
    password: string;
    minChars: string;
    accountType: string;
    createAccount: string;
    alreadyHave: string;
    errorGeneric: string;
}
export interface CustomerRegisterSimpleProps {
    productName: string;
    registerTitle: string;
    locale?: string;
    signInHref?: string;
    /** Optional consumer/business selection. Omit for a single account type. */
    accountTypes?: CustomerAccountType[];
    onRegister: (data: {
        name: string;
        email: string;
        password: string;
        accountType?: string;
    }) => void | Promise<void>;
    /** External error (e.g. server-action validation failure). */
    errorMessage?: string;
    /** When set, the form is replaced with this success message. */
    successMessage?: string;
    labels?: Partial<CustomerRegisterSimpleLabels>;
    className?: string;
}
export declare function CustomerRegisterSimple({ productName, registerTitle, locale, signInHref, accountTypes, onRegister, errorMessage, successMessage, labels, className, }: CustomerRegisterSimpleProps): import("react").JSX.Element;
//# sourceMappingURL=CustomerRegisterSimple.d.ts.map