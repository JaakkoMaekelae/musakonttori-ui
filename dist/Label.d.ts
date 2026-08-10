export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    /** Show required indicator (*) */
    required?: boolean;
}
/**
 * Musakonttori Label - lomakekentän otsikko.
 *
 * Tukee required-indikaattoria (punainen tähti).
 *
 * @example
 * <Label htmlFor="email">Sähköposti</Label>
 * <Label required>Nimi</Label>
 */
declare function Label({ className, children, required: isRequired, ...props }: LabelProps): import("react").JSX.Element;
export { Label };
//# sourceMappingURL=Label.d.ts.map