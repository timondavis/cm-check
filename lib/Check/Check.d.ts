import { DieBag } from "../DieBag";
import { DieModifier } from "./Modifier/DieModifier";
import { TargetModifier } from "./Modifier/TargetModifier";
import { ResultModifier } from "./Modifier/ResultModifier";
export declare abstract class Check {
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
     * @param {number} target
     */
    constructor(target: number);
    /**
     * Add a new modifier to the check's target number before the roll
     *
     * @param {TargetModifier} modifier
     */
    addTargetModifier(modifier: TargetModifier): void;
    /**
     * Add a new modifier to the check's result after the roll
     *
     * @param {ResultModifier} modifier
     */
    addResultModifier(modifier: ResultModifier): void;
    /**
     * Add a new modifier to the amount of die (before or after the roll)
     *
     * @param {DieModifier} modifier
     */
    addDieModifier(modifier: DieModifier): void;
    /**
     * Get a collection of all registered target modifiers
     * @returns {TargetModifier[]}
     */
    getTargetModifiers(): TargetModifier[];
    /**
     * Get a collection of all registered result modifiers
     * @returns {ResultModifier[]}
     */
    getResultModifiers(): ResultModifier[];
    /**
     * Get a collection of all registered die modifiers
     * @returns {DieModifier[]}
     */
    getDieModifiers(): DieModifier[];
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
     * Execute the check
     */
    check(): void;
    /**
     * Get the die bag belonging to the check
     *
     * @returns {DieBag}
     */
    getDieBag(): DieBag;
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
    protected abstract setBaseDieBag(): void;
}
