import { Check } from './Check';
export declare class D20AttributeCheck extends Check {
    protected attributeName: string;
    constructor(attributeValue: number, target: number);
    setAttribute(name: string): void;
    getType(): string;
    protected setBaseDieBag(): void;
    protected static translateAttributeValue(value: number): number;
}
