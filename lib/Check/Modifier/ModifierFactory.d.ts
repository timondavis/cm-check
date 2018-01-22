import { Modifier } from "./Modifier";
export declare abstract class ModifierFactory {
    /**
     * Create a new modifier instance
     *
     * @param {string} name
     * @param {{[key: string]: string}} args
     * @returns {Modifier}
     */
    abstract create(name: string, args: {
        [key: string]: string;
    }): Modifier;
}
