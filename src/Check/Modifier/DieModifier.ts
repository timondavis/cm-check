import { Modifier } from "./Modifier";
import { Check } from "../Check";
import { DieBag } from "../../Die/DieBag";
export class DieModifier extends Modifier {

    public constructor( protected name: string = 'Die Modifier', protected value: string | number | string[] | number[] = [] ) {
        super( name, value);
        this.setPhase( 'before' );
    }

    getType(): string {
        return "die";
    }

    applyTo( check: Check ): void {

        let dieDirective: { directive: string, value: number[] };

        if ( Array.isArray( this.value ) ) {

            for ( let valueIndex = 0 ; valueIndex < this.value.length ; valueIndex++ ) {

                dieDirective = DieBag.decodeDieString( String( this.value[valueIndex] ) );
                DieModifier.processDieDirectiveOn( check, dieDirective );
            }

        } else {

            dieDirective = DieBag.decodeDieString( String( this.value ) );
            DieModifier.processDieDirectiveOn( check, dieDirective );
        }
    }

    public deserialize(serialized: string) : DieModifier {
        let d = JSON.parse(serialized);
        let dm = new DieModifier(d.name, d.value);
        dm.setPhase(d.phase);

        return dm;
    }

    protected static processDieDirectiveOn( check: Check, dieDirective : { directive: string, value: number[] } ) {
        if ( dieDirective.directive === 'add' ) {
            check.getDieBag().add( dieDirective.value[0], dieDirective.value[1] );
        }
        else if ( dieDirective.directive === 'remove' ) {
            check.getDieBag().remove( dieDirective.value[0], dieDirective.value[1] );
        }
    }


}
