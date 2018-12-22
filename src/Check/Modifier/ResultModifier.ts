import { Modifier } from "./Modifier";
import { Check } from "../Check";
export class ResultModifier extends Modifier {

    ApplyTo( check: Check ): void {
        let sumOfValues = Number( this.SumOfValues() );
        check.setResult( check.getResult() + sumOfValues );
    }

    public get Type(): string {
        return 'result';
    }
}