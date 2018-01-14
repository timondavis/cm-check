import { Die } from "./Die";
export declare class DieBag {
    protected dieMap: {
        [key: string]: Die[];
    };
    protected rollResults: {
        [key: string]: number;
    };
    /**
     * Add die to the bag.  Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     */
    add(count: number, sides: number): void;
    /**
     * Removed die from the bag. Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     */
    remove(count: number, sides: number): void;
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
     * Does the indicated # of sides already have an index in the dieMap?
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
    private rollCollection();
    private tabulateCollectionRoll();
}
