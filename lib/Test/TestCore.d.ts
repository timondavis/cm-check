import { DieBag } from "../Die/DieBag";
export declare class TestCore {
    /**
     * Get a random int between 1 - indicated maximum.  To start range with zero instead, indicate with 2nd param.
     *
     * @param {number} max
     * @param {boolean} includeZero
     *
     * @returns {number}
     */
    static randomInt(max?: number, includeZero?: boolean): number;
    /**
     * Randomize die and add them to the indicated tracker and bag.   The tracker will keep a hold of counts only.
     * Used to validate count integrity on bags.
     *
     * @param {{[p: string]: number}} tracker
     * @param {DieBag} bag
     * @param {string} operator  Pass in a simple arithmetic operator which will be used to affect the count on the
     * tracker.  Defaults to +
     * @param {number} count
     * @param {number} sides
     */
    static trackRandomAddedDie(tracker: {
        [key: string]: number;
    }, bag: DieBag, operator?: string, count?: number, sides?: number): void;
    /**
     * Generate an array of 2-element number arrays, holding the [0]count and [1]sides
     *
     * @returns {number[][]}
     */
    static generateDieDefinitions(): number[][];
    /**
     * Apply the defined die in the die definitions to a DieBag
     *
     * @param {number[][]} dieDefinitions
     * @param {DieBag} bag
     */
    static addDieToBagWithDefinitions(dieDefinitions: number[][], bag: DieBag): void;
    /**
     * Validate the counts of each type of die in the DieBag match up with whats expected in the supplied die
     * definitions.
     * @param {number[][]} dieDefinitions
     * @param {DieBag} bag
     */
    static validateCountsOnBagWithDefinitions(dieDefinitions: number[][], bag: DieBag): void;
    static countTotalValuesOfDieInBag(bag: DieBag, sides?: string): number;
}
