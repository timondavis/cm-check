import { ModifierFactory } from "./ModifierFactory";
import { Modifier } from "./Modifier";
export declare class TargetModifierFactory extends ModifierFactory {
    create(name: string, args?: {
        [key: string]: string;
    }): Modifier;
}
