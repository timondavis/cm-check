import { Die } from "./Die";
export declare class DieBag {
    protected _dieMap: {
        [key: string]: Die[];
    };
    protected rollResults: {
        [key: string]: number;
    };
    readonly dieMap: {
        [key: string]: Die[];
    };
    /**
     * Add die to the bag.  Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     * @param {number} value (optional)
     *
     * @return {DieBag}
     */
    add(count: number, sides: number, value?: number): DieBag;
    /**
     * Add the contents of a die bag to this bag
     * @param {DieBag} bag
     *
     * @return {DieBag}
     */
    addBag(bag: DieBag): DieBag;
    /**
     * Removed die from the bag. Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     *
     * @return {DieBag}
     */
    remove(count: number, sides: number): DieBag;
    /**
     * Remove die from the bag based on the contents of the given bag.
     * If strictRemove is enabled, only die matching the provided die types and values will be removed.
     * If off, it will simply remove the first available die which matches type, disregarding value.
     * If a die cannot be removed because it is locked or does not exist, the removal of that type will stop.
     *
     * @param {DieBag} bag
     * @param {boolean} strictRemove
     *
     * @return {DieBag}
     */
    removeBag(bag: DieBag, strictRemove: boolean): DieBag;
    /**
     * Roll 'dem laughing bones...
     *
     * Will roll and return a report on every dice in the bag.
     *
     * @returns {{[string:key] : number}
     */
    roll(): {
        [key: string]: number;
    };
    /**
     * Get the object representing the contents of the bag.
     *
     * @returns {{{[p: string]: Die[]}}
     */
    report(): {
        [key: string]: Die[];
    };
    /**
     * Does the indicated # of sides already have an index in the _dieMap?
     *
     * @param {number} sides
     *
     * @return {boolean}
     */
    protected isDieIndexExists(sides: number): boolean;
    /**
     * Adds a new index to the dieBag.
     *
     * @mutator
     *
     * @pre The index must not already exist, or it will be overwritten.
     * @post The index will be assigned with an empty array
     *
     * @param {number} sides
     */
    protected addNewDieIndex(sides: number): void;
    /**
     * Get the total value of the dice in the die bag
     *
     * @returns {number}
     */
    getTotal(): number;
    /**
     * Get a collection of all die in the bag with the indicated amount of sides
     *
     * @param {number | string} sides
     * @returns {Die[]}
     */
    getSetOfSidedDie(sides: number | string): Die[];
    private rollCollection();
    private refreshDieResults();
    private strictRemoveBag(bag);
    private looseRemoveBag(bag);
}
