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

    public deserialize(serialized: string) : ResultModifier {
        let d = JSON.parse(serialized);
        let dm = new ResultModifier(d.name, d.value);
        dm.setPhase(d.phase);

        return dm;
    }
}
