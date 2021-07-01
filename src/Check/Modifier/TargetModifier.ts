import { Modifier } from "./Modifier";
import { Check } from "../Check";
export class TargetModifier extends Modifier {

    applyTo( check: Check ): void {

        let sumOfValues = Number( this.sumOfValues() );

        check.setTarget( check.getTarget() + sumOfValues );
    }

    public getType(): string {
        return 'target';
    }

    public deserialize(serialized: string) : TargetModifier {
        let d = JSON.parse(serialized);
        let dm = new TargetModifier(d.name, d.value);
        dm.setPhase(d.phase);

        return dm;
    }
}
