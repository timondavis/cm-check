import { ModifierFactory } from "./ModifierFactory";
import { Modifier } from "./Modifier";
import { TargetModifier } from "./TargetModifier";

export class TargetModifierFactory extends ModifierFactory {

    create( name: string, args: { [key: string] : string } = {} ): Modifier {

        return new TargetModifier( name, (args.hasOwnProperty( 'value' )) ? Number( args['value'] ) : 0 );
    }

}