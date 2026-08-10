import * as React from "react";
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Progress value 0-100 */
    value?: number;
}
/**
 * Musakonttori Progress - edistymispalkki.
 *
 * @example
 * <Progress value={60} />
 * <Progress value={100} className="h-3" />
 */
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
export { Progress };
//# sourceMappingURL=Progress.d.ts.map