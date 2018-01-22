import { DieBag } from "../../DieBag";
export class DieModifier {

    public constructor(
        public name: string,
        public dieBag: DieBag,
        public phase: string,
        public remove: boolean,
        public strictRemove: boolean ) {}
}