"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        if (includeZero === void 0) { includeZero = false; }
        return Math.floor(Math.random() * Math.floor(max) + ((includeZero) ? 0 : 1));
    };
    /**
     * Randomize die and add them to the indicated tracker and bag.   The tracker will keep a hold of counts only.
     * Used to validate count integrity on bags.
     *
     * @param {{[p: string]: number}} tracker
     * @param {DieBag} bag
     */
    TestCore.trackRandomAddedDie = function (tracker, bag) {
        var randomSides = TestCore.randomInt(100);
        var randomCount = TestCore.randomInt(100);
        if (!tracker.hasOwnProperty(String(randomSides))) {
            tracker[String(randomSides)] = 0;
        }
        tracker[String(randomSides)] += randomCount;
        bag.add(randomCount, randomSides);
    };
    return TestCore;
}());
exports.TestCore = TestCore;
//# sourceMappingURL=testcore.js.map