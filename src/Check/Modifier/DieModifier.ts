import { Modifier } from "./Modifier";
import { Check } from "../Check";
export class DieModifier extends Modifier {

    applyTo( check: Check ): void {

        let dieDirective: { directive: string, value: number[] };

        if ( Array.isArray( this.value ) ) {

            for ( let valueIndex = 0 ; valueIndex < this.value.length ; valueIndex++ ) {

                dieDirective = DieModifier.decodeDieString( String( this.value[valueIndex] ) );
                DieModifier.processDieDirectiveOn( check, dieDirective );
            }

        } else {

            dieDirective = DieModifier.decodeDieString( String( this.value ) );
            DieModifier.processDieDirectiveOn( check, dieDirective );
        }
    }

    public constructor( protected name: string, protected value: string | number | string[] | number[] ) {
        super( name, value );
    }

    public getType(): string {
        return 'die';
    }

    protected static processDieDirectiveOn( check: Check, dieDirective : { directive: string, value: number[] } ) {

        if ( dieDirective.directive === 'add' ) {
            check.getDieBag().add( dieDirective.value[0], dieDirective.value[1] );
        }
        else if ( dieDirective.directive === 'remove' ) {
            check.getDieBag().remove( dieDirective.value[0], dieDirective.value[1] );
        }
    }

    protected static decodeDieString( dieCode : string ) : { directive: string, value: number[] } {

        let dieDefinition : string[];
        let count: number;
        let sides: number;
        let directive: string = 'add';

        if ( dieCode.indexOf( '-', 0 ) === 0 ) {
            directive = 'remove';
            dieCode = dieCode.substr( 1 );
        }


        dieDefinition = dieCode.split( 'd', 2 );

        if ( dieDefinition.length !== 2 ) { throw ( "Invalid die definition string: " + dieCode ); }

        count = Number( dieDefinition[0] );
        sides = Number( dieDefinition[1] );

        if ( isNaN( count ) || isNaN( sides ) ) { throw ("Invalid die definition string: " + dieCode ); }

        return { directive: directive, value: [ count, sides ] };
    }
}