export declare class Die {
    sides: number;
    protected value: number;
    protected locked: boolean;
    constructor(sides: number);
    /**
     * Roll the die and return the new result.
     *
     * @mutator
     * @returns {Die}
     */
    roll(): Die;
    /**
     * Get the value of the die
     * @returns {number}
     */
    getValue(): number;
    /**
     * Set the value of the die
     *
     * @throws
     * @param {number} newValue
     * @returns {Die}
     */
    setValue(newValue: number): Die;
    /**
     * Lock/Unlock the die from being removed or affected
     *
     * @param {boolean} setLockTo
     * @returns {Die}
     */
    lock(setLockTo?: boolean): Die;
    /**
     * Is the die locked?
     * @returns {boolean}
     */
    isLocked(): boolean;
}
