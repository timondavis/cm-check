import { ModifierFactory } from "./ModifierFactory";
import { Modifier } from "./Modifier";
export declare class TargetModifierFactory extends ModifierFactory {
    /**
     * Create a new TargetModifier
     *
     * @param {string} name
     * @param {{{[key: string]: string}} args
     * @returns {Modifier}
     */
    create(name: string, args?: {
        [key: string]: string;
    }): Modifier;
}
