import { DieBag } from "./DieBag";
export declare abstract class Check {
    protected attributeValue: number;
    protected target: number;
    protected attributeModifiers: {
        name: string;
        value: number;
    }[];
    protected targetModifiers: {
        name: string;
        value: number;
    }[];
    protected resultModifiers: {
        name: string;
        value: number;
    }[];
    protected dieModifiers: {
        name: string;
        dieBag: DieBag;
    }[];
    protected result: number;
    protected dieBag: DieBag;
    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} attributeValue
     * @param {number} target
     */
    constructor(attributeValue: number, target: number);
    addAttributeModifier(modifier: {
        name: string;
        value: number;
    }): void;
    addTargetModifier(modifier: {
        name: string;
        value: number;
    }): void;
    addResultModifier(modifier: {
        name: string;
        value: number;
    }): void;
    addDieModifier(modifier: {
        name: string;
        dieBag: DieBag;
    }): void;
    getAttributeModifiers(): {
        name: string;
        value: number;
    }[];
    getTargetModifiers(): {
        name: string;
        value: number;
    }[];
    getResultModifiers(): {
        name: string;
        value: number;
    }[];
    getDieModifiers(): {
        name: string;
        dieBag: DieBag;
    }[];
    isPass(): boolean;
    setTarget(target: number): void;
    getTarget(): number;
    setResult(result: number): void;
    getResult(): number;
    check(): void;
    getDieBag(): DieBag;
    abstract getType(): string;
    protected abstract translateAttributeValue(value: number, callback: {
        (value: number): number;
    }): number;
    protected abstract setBaseDieBag(): void;
}
