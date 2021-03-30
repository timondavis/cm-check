import { Modifier } from "./Modifier";
import { Check } from "../Check";
export declare class ResultModifier extends Modifier {
    applyTo(check: Check): void;
    getType(): string;
}
