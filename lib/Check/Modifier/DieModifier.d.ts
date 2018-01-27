import { Modifier } from "./Modifier";
import { Check } from "../Check";
export declare class DieModifier extends Modifier {
    protected name: string;
    protected value: string | number | string[] | number[];
    applyTo(check: Check): void;
    constructor(name: string, value: string | number | string[] | number[]);
    getType(): string;
    protected static processDieDirectiveOn(check: Check, dieDirective: {
        directive: string;
        value: number[];
    }): void;
}
