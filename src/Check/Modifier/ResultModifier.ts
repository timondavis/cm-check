import { Modifier } from "./Modifier";
import { Check } from "../Check";
export class ResultModifier extends Modifier {

    applyTo( check: Check ): void {
        let sumOfValues = Number( this.sumOfValues() );
        check.setResult( check.getResult() + sumOfValues );
    }

    public getType(): string {
        return 'result';
    }
}