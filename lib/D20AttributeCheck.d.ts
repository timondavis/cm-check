import { Check } from './Check';
export declare class D20AttributeCheck extends Check {
    protected attributeName: string;
    setAttribute(name: string): void;
    getType(): string;
    protected setBaseDieBag(): void;
    protected translateAttributeValue(value: number, callback: {
        (value: number): number;
    }): number;
}
