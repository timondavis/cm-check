import { Check } from "../Check";
export interface IModifier {
    /**
     * Apply the modifier to a check.
     *
     * @param {Check} check
     */
    applyTo(check: Check): void;
    getType(): string;
}
