import { Modifier } from "./Modifier";
import { Check } from "../Check";
export class TargetModifier extends Modifier {

    ApplyTo( check: Check ): void {

        let sumOfValues = Number( this.SumOfValues() );

        check.setTarget( check.getTarget() + sumOfValues );
    }

    public get Type(): string {
        return 'target';
    }
}