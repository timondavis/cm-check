import { Modifier } from "./Modifier";
import { Check } from "../Check";
export declare class ResultModifier extends Modifier {
    constructor(name: string, value: number | string | number[] | string[]);
    applyTo(check: Check): void;
    getType(): string;
}
