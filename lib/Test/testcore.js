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
    return TestCore;
}());
exports.TestCore = TestCore;
//# sourceMappingURL=testcore.js.map