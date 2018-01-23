import { Modifier } from "./Modifier";
import { Check } from "../Check";
export declare class TargetModifier extends Modifier {
    applyTo(check: Check): void;
    protected getType(): string;
}
