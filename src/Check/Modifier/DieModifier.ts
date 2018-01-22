import { DieBag } from "../../DieBag";
import { Modifier } from "./Modifier";
export class DieModifier extends Modifier {

    public constructor(
        public name: string,
        public dieBag: DieBag,
        public phase: string,
        public remove: boolean,
        public strictRemove: boolean ) {

        super( name, -1 );
    }

    /**
     * GEt the DieBag for this modifier
     *
     * @returns {DieBag}
     */
    public getDieBag(): DieBag {
        return this.dieBag;
    }

    /**
     * Set or reset the DieBag on this modifier
     *
     * @param {DieBag} bag
     * @returns {DieModifier}
     */
    public setDieBag( bag : DieBag ): DieModifier {

        this.dieBag = bag;
        return this;
    }
}