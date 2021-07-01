import { Modifier } from "./Modifier";
import { Check } from "../Check";
export declare class DieModifier extends Modifier {
    protected name: string;
    protected value: string | number | string[] | number[];
    constructor(name?: string, value?: string | number | string[] | number[]);
    getType(): string;
    applyTo(check: Check): void;
    deserialize(serialized: string): DieModifier;
    protected static processDieDirectiveOn(check: Check, dieDirective: {
        directive: string;
        value: number[];
    }): void;
}
