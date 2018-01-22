import { DieBag } from "../../DieBag";
export declare class DieModifier {
    name: string;
    dieBag: DieBag;
    phase: string;
    remove: boolean;
    strictRemove: boolean;
    constructor(name: string, dieBag: DieBag, phase: string, remove: boolean, strictRemove: boolean);
}
