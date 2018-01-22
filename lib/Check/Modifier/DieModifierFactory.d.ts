import { ModifierFactory } from "./ModifierFactory";
import { Modifier } from "./Modifier";
import { DieBag } from "../../DieBag";
export declare class DieModifierFactory extends ModifierFactory {
    private dieBag;
    /**
     * Create a new DieModifier instance
     * @param {string} name
     * @param {{[p: string]: string}} args
     * @returns {Modifier}
     */
    create(name: string, args?: {
        [key: string]: string;
    }): Modifier;
    /**
     * Set the default die bag to apply to modifiers from this factory.  May be updated at any time.
     * @param {DieBag} bag
     */
    setDefaultDieBag(bag: DieBag): void;
    protected cloneDieBag(bag: DieBag): DieBag;
}
