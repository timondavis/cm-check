import { Modifier } from "./Modifier";
import { Check } from "../Check";
export class ResultModifier extends Modifier {

    public constructor( name: string, value: number | string | number[] | string[] ) {

        super( name, value );
    }

    applyTo( check: Check ): void {
        let sumOfValues = Number( this.sumOfValues() );
        check.setResult( check.getResult() + sumOfValues );
    }

    public getType(): string {
        return 'result';
    }
}