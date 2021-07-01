import { Check } from "../Check";
export declare abstract class Modifier {
    protected name: string;
    protected value: string | number | string[] | number[];
    abstract applyTo(check: Check): void;
    abstract deserialize(serialized: string): Modifier;
    abstract getType(): string;
    protected phase: string;
    constructor(name?: string, value?: string | number | string[] | number[]);
    /**
     * Get the name of this modifier
     * @returns {string}
     */
    getName(): string;
    /**
     * Set the name of this modifier
     *
     * @param {string} name
     * @returns {Modifier}
     */
    setName(name: string): Modifier;
    /**
     * Get the value of this modifier
     *
     * @returns {string | number | string[] | number[]}
     */
    getValue(): string | number | string[] | number[];
    /**
     * Set the value of this modifier
     *
     * @param {string | number | string[] | number[]} value
     * @returns {Modifier}
     */
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
    static serialize(modifier: Modifier): string;
}
