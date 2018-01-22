import { DieBag } from "../DieBag";
import { DieModifier } from "./Modifier/DieModifier";
import { TargetModifier } from "./Modifier/TargetModifier";
import { ResultModifier } from "./Modifier/ResultModifier";
export declare abstract class Check {
    protected attributeValue: number;
    protected target: number;
    protected targetModifiers: TargetModifier[];
    protected resultModifiers: ResultModifier[];
    protected dieModifiers: DieModifier[];
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
    addTargetModifier(modifier: TargetModifier): void;
    addResultModifier(modifier: ResultModifier): void;
    addDieModifier(modifier: DieModifier): void;
    getTargetModifiers(): TargetModifier[];
    getResultModifiers(): ResultModifier[];
    getDieModifiers(): DieModifier[];
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
