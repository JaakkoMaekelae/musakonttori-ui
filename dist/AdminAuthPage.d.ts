import { type ReactNode } from "react";
export type AdminAuthStep = "credentials" | "mfa" | "enroll" | "backup" | "password" | "done";
export interface AdminAuthBrand {
    name: string;
    title: string;
    accent?: string;
    description?: string;
    benefits?: Array<{
        title: string;
        description: string;
    }>;
    logo?: ReactNode;
}
export interface AdminAuthLabels {
    signInHeading: string;
    signInDescription: string;
    identifier: string;
    password: string;
    signIn: string;
    signingIn: string;
    mfaHeading: string;
    mfaDescription: string;
    code: string;
    verify: string;
    verifying: string;
    enrollHeading: string;
    enrollDescription: string;
    secretLabel: string;
    qrAlt: string;
    openInAuthenticator: string;
    backupHeading: string;
    backupDescription: string;
    backupSaved: string;
    passwordHeading: string;
    passwordDescription: string;
    newPassword: string;
    confirmPassword: string;
    savePassword: string;
    saving: string;
    doneHeading: string;
    doneDescription: string;
    genericError: string;
    errors: Record<string, string>;
}
export interface AdminAuthEndpoints {
    login: string;
    mfaVerify: string;
    mfaEnroll: string;
    password: string;
}
export interface AdminAuthPageProps {
    brand: AdminAuthBrand;
    labels: AdminAuthLabels;
    endpoints?: Partial<AdminAuthEndpoints>;
    /** Product slug for the HQ handoff after a successful login. */
    product?: string;
    /** Where HQ should send the user back after the handoff. */
    returnTo?: string;
    /** Fallback target when no product handoff is requested. */
    successHref?: string;
    onSuccess?: () => void;
    className?: string;
}
export declare function AdminAuthPage({ brand, labels, endpoints, product, returnTo, successHref, onSuccess, className, }: AdminAuthPageProps): import("react").JSX.Element;
//# sourceMappingURL=AdminAuthPage.d.ts.map