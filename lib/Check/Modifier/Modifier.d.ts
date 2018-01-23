export declare abstract class Modifier {
    protected name: string;
    protected value: string | number | string[] | number[];
    protected phase: string;
    protected strict: boolean;
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
     * Modifier should be implemented in 'strict' mode (used optionally by each child implementation)
     * @returns {boolean}
     */
    isStrict(): boolean;
    /**
     * Reports on whether modifier is being used in 'strict' mode.
     * @param {boolean} isStrict
     * @returns {boolean}
     */
    setStrict(isStrict: boolean): boolean;
}
