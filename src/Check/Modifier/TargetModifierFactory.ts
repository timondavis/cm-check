import { ModifierFactory } from "./ModifierFactory";
import { Modifier } from "./Modifier";
import { TargetModifier } from "./TargetModifier";

export class TargetModifierFactory extends ModifierFactory {

    /**
     * Create a new TargetModifier
     *
     * @param {string} name
     * @param {{{[key: string]: string}} args
     * @returns {Modifier}
     */
    create( name: string, args: { [key: string] : string } = {} ): Modifier {

        return new TargetModifier( name, (args.hasOwnProperty( 'value' )) ? Number( args['value'] ) : 0 );
    }

}