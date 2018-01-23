import { Check } from "../Check";
export declare abstract class Modifier {
    protected name: string;
    protected value: string | number | string[] | number[];
    abstract applyTo(check: Check): void;
    abstract getType(): string;
    protected phase: string;
    constructor(name: string, value: string | number | string[] | number[]);
    getName(): string;
    getValue(): string | number | string[] | number[];
    setValue(value: string | number | string[] | number[]): Modifier;
    /**
     * Define the check phase in which this modifier should execute
     *
     * @returns {string}
     */
    getPhase(): string;
    /**
     * Get the check phase in which this modifier should execute
     * @param {string} phase
     * @returns {Modifier}
     */
    setPhase(phase: string): Modifier;
    /**
     * Convenience method for summing values stored in the value array.  Only works if they're all numbers.
     *
     * @pre  All items in this.value must be numbers - they can be strings in there, but they must be numeric strings.
     *
     * @returns {number | boolean} Will return false if NaN is found in value array or as value.
     */
    protected sumOfValues(): number | boolean;
}
