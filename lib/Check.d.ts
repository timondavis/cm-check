import { DieBag } from "./DieBag";
export declare abstract class Check {
    protected attributeValue: number;
    protected target: number;
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
        phase: string;
        remove: boolean;
        strictRemove: boolean;
    }[];
    protected rawResult: number;
    protected result: number;
    protected dieBag: DieBag;
    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} attributeValue
     * @param {number} target
     */
    constructor(attributeValue: number, target: number);
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
        phase: string;
        remove: boolean;
        strictRemove: boolean;
    }): void;
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
        phase: string;
        remove: boolean;
        strictRemove: boolean;
    }[];
    isPass(): boolean;
    setTarget(target: number): void;
    getTarget(): number;
    setResult(result: number): void;
    getResult(): number;
    getRawRollResult(): number;
    check(): void;
    getDieBag(): DieBag;
    /**
     * Get a report on the status of the check
     * @param {boolean} getReportAsString
     *
     * @returns {string | {{isPass: boolean; target: number; result: number}}
     */
    report(getReportAsString: boolean): any;
    abstract getType(): string;
    protected static translateAttributeValue(value: number): number;
    protected abstract setBaseDieBag(): void;
}
