import { DieBag } from "../Die/DieBag";
import { Modifier } from "./Modifier/Modifier";
export declare abstract class Check {
    protected target: number;
    protected modifiers: Modifier[];
    protected rawResult: number;
    protected result: number;
    protected testCondition: string;
    protected dieBag: DieBag;
    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} target
     */
    constructor(target?: number);
    /**
     * Add a new modifier to the check's target number before the roll
     *
     * @param {TargetModifier} modifier
     */
    addModifier(modifier: Modifier): void;
    /**
     * Get the modifiers attributed to this check.
     *
     * @returns {Modifier[]}
     */
    getModifiers(): Modifier[];
    /**
     * Has the check passed?
     *
     * @returns {boolean}
     */
    isPass(): boolean;
    /**
     * Set or reset the target number for the check
     *
     * @param {number} target
     */
    setTarget(target: number): void;
    /**
     * Get the target number for the check
     *
     * @returns {number}
     */
    getTarget(): number;
    /**
     * Set or reset the result of the check
     *
     * @param {number} result
     */
    setResult(result: number): void;
    /**
     * Get the current result value on the check
     * @returns {number}
     */
    getResult(): number;
    /**
     * Get the result of dice rolled, without modifiers.
     * @returns {number}
     */
    getRawRollResult(): number;
    /**
     * Roll the dice for the check
     */
    roll(): void;
    /**
     * Get the die bag belonging to the check
     *
     * @returns {DieBag}
     */
    getDieBag(): DieBag;
    /**
     * Add die to the check
     *
     * @param {number} count
     * @param {number} sides
     */
    addDie(count: number, sides: number): void;
    /**
     * Remove die from the check
     *
     * @param {number} count
     * @param {number} sides
     */
    removeDie(count: number, sides: number): void;
    /**
     * Set the comparison operator for the check pass test.  Result on left, Target on right.
     * For example, 'result < target' is a pass if the result is less than the target, and the operator is '<'
     *
     * @param {string} operator
     */
    setTestCondition(operator: string): void;
    /**
     * Get the test condition for the check pass test.  Result is left of the symbol, target on the right.
     * For example, 'result < target' is a pass if the result is less than the target, and the operator is '<'
     *
     * @returns {string}
     */
    getTestCondition(): string;
    /**
     * Get a report on the status of the check
     * @param {boolean} getReportAsString
     *
     * @returns {string | {{isPass: boolean; target: number; result: number, modifiers: []any, number}}
     */
    report(getReportAsString: boolean): any;
    /**
     * Get the typename of this check
     *
     * @returns {string}
     */
    abstract getType(): string;
    /**
     * Set a new DieBag on this check.
     */
    protected abstract setCheckDie(): void;
}
export declare class CheckReport {
    isPass: boolean;
    target: number;
    result: number;
    modifiers: Modifier[];
    rollResult: number;
    dieBag: DieBag;
    constructor(isPass: boolean, target: number, result: number, modifiers: Modifier[], rollResult: number, dieBag: DieBag);
}
