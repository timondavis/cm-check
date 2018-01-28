import { Check } from "./Check";

export class SimpleCheck extends Check {
    getType(): string { return 'simple'; }
    protected setBaseDieBag(): void {}
}