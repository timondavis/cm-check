import { DieBag } from "../../DieBag";
import { Modifier } from "./Modifier";
export declare class DieModifier extends Modifier {
    name: string;
    dieBag: DieBag;
    phase: string;
    remove: boolean;
    strictRemove: boolean;
    constructor(name: string, dieBag: DieBag, phase: string, remove: boolean, strictRemove: boolean);
    /**
     * GEt the DieBag for this modifier
     *
     * @returns {DieBag}
     */
    getDieBag(): DieBag;
    /**
     * Set or reset the DieBag on this modifier
     *
     * @param {DieBag} bag
     * @returns {DieModifier}
     */
    setDieBag(bag: DieBag): DieModifier;
}
