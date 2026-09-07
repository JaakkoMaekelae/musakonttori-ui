import { type BadgeTone } from "./Badge";
export interface HealthMeterProps {
    title: string;
    /** The figure that matters: a percentage, a latency, a count. */
    value: string;
    /** One line under the value, e.g. "on-time shipment". */
    caption?: string;
    /** 0–100. */
    progress: number;
    /** Right-aligned status chip. */
    badge?: {
        label: string;
        tone?: BadgeTone;
    };
    className?: string;
}
/**
 * A single health/status cell with a labelled progress meter.
 *
 * Used for seller health, DSP health, discovery intelligence and live event
 * command — anywhere a name needs a score and a status at a glance.
 */
export declare function HealthMeter({ title, value, caption, progress, badge, className, }: HealthMeterProps): import("react").JSX.Element;
//# sourceMappingURL=HealthMeter.d.ts.map