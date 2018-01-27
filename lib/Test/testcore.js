"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var TestCore = /** @class */ (function () {
    function TestCore() {
    }
    /**
     * Get a random int between 1 - indicated maximum.  To start range with zero instead, indicate with 2nd param.
     *
     * @param {number} max
     * @param {boolean} includeZero
     *
     * @returns {number}
     */
    TestCore.randomInt = function (max, includeZero) {
        if (max === void 0) { max = 1000; }
        if (includeZero === void 0) { includeZero = false; }
        return Math.floor(Math.random() * Math.floor(max) + ((includeZero) ? 0 : 1));
    };
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
    TestCore.trackRandomAddedDie = function (tracker, bag, operator, count, sides) {
        if (operator === void 0) { operator = '+'; }
        if (count === void 0) { count = -1; }
        if (sides === void 0) { sides = -1; }
        sides = (sides === -1) ? TestCore.randomInt() : sides;
        count = (count === -1) ? TestCore.randomInt() : count;
        if (!tracker.hasOwnProperty(String(sides))) {
            tracker[String(sides)] = 0;
        }
        switch (operator) {
            case ('-'):
                tracker[String(sides)] -= count;
                break;
            case ('+'):
                tracker[String(sides)] += count;
                break;
            case ('*'):
                tracker[String(sides)] *= count;
                break;
            case ('/'):
                tracker[String(sides)] /= count;
                break;
            default:
                throw (operator + " is not a valid operator for use invoked.  Use + - / or * ");
        }
        bag.add(count, sides);
    };
    /**
     * Generate an array of 2-element number arrays, holding the [0]count and [1]sides
     *
     * @returns {number[][]}
     */
    TestCore.generateDieDefinitions = function () {
        var sides;
        var dieDefs = [];
        var sidesUsed = [];
        for (var defCounter = 0; defCounter < TestCore.randomInt(100); defCounter++) {
            do {
                sides = TestCore.randomInt();
            } while (sidesUsed.indexOf(sides) != -1);
            sidesUsed.push(sides);
            dieDefs.push([TestCore.randomInt(), sides]);
        }
        return dieDefs;
    };
    /**
     * Apply the defined die in the die definitions to a DieBag
     *
     * @param {number[][]} dieDefinitions
     * @param {DieBag} bag
     */
    TestCore.addDieToBagWithDefinitions = function (dieDefinitions, bag) {
        for (var defCounter = 0; defCounter < dieDefinitions.length; defCounter++) {
            bag.add(dieDefinitions[defCounter][0], dieDefinitions[defCounter][1]);
        }
    };
    /**
     * Validate the counts of each type of die in the DieBag match up with whats expected in the supplied die
     * definitions.
     * @param {number[][]} dieDefinitions
     * @param {DieBag} bag
     */
    TestCore.validateCountsOnBagWithDefinitions = function (dieDefinitions, bag) {
        for (var defCounter = 0; defCounter < dieDefinitions.length; defCounter++) {
            chai_1.expect(bag.getDieWithSides(dieDefinitions[defCounter][1])).to.have.lengthOf(dieDefinitions[defCounter][0]);
        }
    };
    TestCore.countTotalValuesOfDieInBag = function (bag) {
        var total = 0;
        Object.keys(bag.dieMap).forEach(function (sides) {
            for (var dieIndex = 0; dieIndex < bag.dieMap[sides].length; dieIndex++) {
                total += bag.dieMap[sides][dieIndex].getValue();
            }
        });
        return total;
    };
    return TestCore;
}());
exports.TestCore = TestCore;
//# sourceMappingURL=TestCore.js.map