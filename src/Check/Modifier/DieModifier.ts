import { Modifier } from "./Modifier";
import { Check } from "../Check";
import { DieBag } from "../../Die/DieBag";
export class DieModifier extends Modifier {

    ApplyTo( check: Check ): void {

        let dieDirective: { directive: string, value: number[] };

        if ( Array.isArray( this.value ) ) {

            for ( let valueIndex = 0 ; valueIndex < this.value.length ; valueIndex++ ) {

                dieDirective = DieBag.decodeDieString( String( this.value[valueIndex] ) );
                DieModifier.ProcessDieDirectiveOn( check, dieDirective );
            }

        } else {

            dieDirective = DieBag.decodeDieString( String( this.value ) );
            DieModifier.ProcessDieDirectiveOn( check, dieDirective );
        }
    }

    public constructor( protected name: string = 'Die Modifier', protected value: string | number | string[] | number[] = [] ) {
        super( name, value );
        this.Phase = 'before';
    }

    public get Type(): string {
        return 'die';
    }

    protected static ProcessDieDirectiveOn( check: Check, dieDirective : { directive: string, value: number[] } ) {

        if ( dieDirective.directive === 'add' ) {
            check.getDieBag().add( dieDirective.value[0], dieDirective.value[1] );
        }
        else if ( dieDirective.directive === 'remove' ) {
            check.getDieBag().remove( dieDirective.value[0], dieDirective.value[1] );
        }
    }
}