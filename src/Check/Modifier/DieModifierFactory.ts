import { ModifierFactory } from "./ModifierFactory";
import { Modifier } from "./Modifier";
import { DieModifier } from "./DieModifier";
import { DieBag } from "../../DieBag";

export class DieModifierFactory extends ModifierFactory {

    private dieBag: DieBag = new DieBag();

    /**
     * Create a new DieModifier instance
     * @param {string} name
     * @param {{[p: string]: string}} args
     * @returns {Modifier}
     */
    create( name: string, args: { [key: string]: string } = {} ): Modifier {

        let clonedDieBag = this.cloneDieBag( this.dieBag );

        return new DieModifier( name, clonedDieBag,
            ( args.hasOwnProperty( 'phase' )) ? args['phase'] : 'before',
            ( args.hasOwnProperty( 'remove' ) ) ,
            ( args.hasOwnProperty( 'strictRemove' ) )
        );
    }

    /**
     * Set the default die bag to apply to modifiers from this factory.  May be updated at any time.
     * @param {DieBag} bag
     */
    public setDefaultDieBag( bag: DieBag ) {

        this.dieBag = bag;
    }

    protected cloneDieBag( bag : DieBag ) : DieBag {

        let newBag = new DieBag();

        Object.keys( bag.report() ).forEach( function( groupName ) {

            for ( let originalIndex = 0 ; originalIndex < bag.report()[groupName].length ; originalIndex++) {

                newBag.add( 1, Number(groupName), bag.report()[groupName][originalIndex].getValue() );
            }
        });

        return newBag;
    }

}