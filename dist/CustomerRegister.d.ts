export interface CustomerAccountType {
    value: string;
    label: string;
    /** Business accounts create an Organization; consumers skip straight to a personal workspace. */
    requiresOrganization: boolean;
}
export interface CustomerRegisterLabels {
    stepAccount: string;
    stepOrganization: string;
    stepWorkspace: string;
    createAccount: string;
    name: string;
    email: string;
    password: string;
    minChars: string;
    accountType: string;
    continueGoogle: string;
    continueFacebook: string;
    alreadyHave: string;
    createOrganization: string;
    orgName: string;
    orgNamePlaceholder: string;
    orgSlug: string;
    slugAuto: string;
    continue: string;
    createWorkspace: string;
    workspaceName: string;
    workspacePlaceholder: string;
    workspaceType: string;
    goDashboard: string;
    back: string;
    errorGeneric: string;
}
export interface CustomerRegisterProps {
    /** Brand name shown on the account step. */
    productName: string;
    /** Account step heading, e.g. "Create Account". */
    registerTitle: string;
    /** Consumer/business options. The consumer option has requiresOrganization=false. */
    accountTypes: CustomerAccountType[];
    /** Workspace type options (industry), e.g. ["Artist", "Venue", ...]. */
    workspaceTypes: string[];
    /** "Already have an account? Sign in" target. */
    signInHref?: string;
    locale?: string;
    /** Account step: the product delegates account creation to the shared Accounts service. */
    onRegister: (data: {
        name: string;
        email: string;
        password: string;
        accountType: string;
    }) => void;
    /** Organization step (business only). Resolves to the created org id. */
    onCreateOrganization?: (data: {
        name: string;
        slug: string;
    }) => Promise<{
        id: string;
        error?: string;
    }>;
    /** Workspace step (final). Resolves with an optional error. */
    onCreateWorkspace: (data: {
        name: string;
        slug: string;
        type: string;
        organizationId?: string;
    }) => Promise<{
        error?: string;
    } | void>;
    /** Called after the workspace is created (the product redirects to its app). */
    onFinish: () => void;
    labels?: Partial<CustomerRegisterLabels>;
    className?: string;
}
export declare function CustomerRegister({ productName, registerTitle, accountTypes, workspaceTypes, signInHref, locale, onRegister, onCreateOrganization, onCreateWorkspace, onFinish, labels, className, }: CustomerRegisterProps): import("react").JSX.Element;
//# sourceMappingURL=CustomerRegister.d.ts.map