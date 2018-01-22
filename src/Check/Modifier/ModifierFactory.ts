import { Modifier } from "./Modifier";

export abstract class ModifierFactory {

    /**
     * Create a new modifier instance
     *
     * @param {string} name
     * @param {{[key: string]: string}} args
     * @returns {Modifier}
     */
    public abstract create( name: string, args: { [key: string]: string } ) : Modifier;
}

