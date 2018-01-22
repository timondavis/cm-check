import { DieBag } from "../../DieBag";
import { Modifier } from "./Modifier";
export declare class DieModifier extends Modifier {
    name: string;
    dieBag: DieBag;
    phase: string;
    remove: boolean;
    strictRemove: boolean;
    constructor(name: string, dieBag: DieBag, phase: string, remove: boolean, strictRemove: boolean);
    getDieBag(): DieBag;
    setDieBag(bag: DieBag): DieModifier;
}
