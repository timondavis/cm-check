"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Die_1 = require("./Die");
var DieBag = /** @class */ (function () {
    function DieBag() {
        this.dieMap = {};
        this.rollResults = {};
    }
    /**
     * Add die to the bag.  Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     * @param {number} value (optional )
     */
    DieBag.prototype.add = function (count, sides, value) {
        if (value === void 0) { value = -1; }
        if (!this.isDieIndexExists(sides)) {
            this.addNewDieIndex(sides);
        }
        for (var index = 0; index < count; index++) {
            var die = new Die_1.Die(sides);
            die.roll();
            if (value >= 0) {
                die.setValue(value);
            }
            this.dieMap[sides].push(die);
        }
    };
    /**
     * Add the contents of a die bag to this bag
     * @param {DieBag} bag
     */
    DieBag.prototype.addBag = function (bag) {
        var self = this;
        var dieIndex = 0;
        Object.keys(bag.dieMap).forEach(function (groupIndex) {
            for (dieIndex = 0; dieIndex < bag.dieMap[groupIndex].length; dieIndex++) {
                var newDie = bag.dieMap[groupIndex][dieIndex];
                self.add(1, Number(groupIndex), newDie.getValue());
            }
        });
    };
    /**
     * Removed die from the bag. Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     */
    DieBag.prototype.remove = function (count, sides) {
        if (!this.isDieIndexExists(sides)) {
            return;
        }
        var remainingDie = this.dieMap[String(sides)].length;
        while (remainingDie > 0) {
            this.dieMap[String(sides)].pop();
            remainingDie = this.dieMap[String(sides)].length;
        }
    };
    /**
     * Remove die from the bag based on the contents of the given bag.
     * If strictRemove is enabled, only die matching the provided die types and values will be removed.
     * If off, it will simply remove the first available die which matches type, disregarding value.
     * If a die cannot be removed because it is locked or does not exist, the removal of that type will stop.
     *
     * @param {DieBag} bag
     * @param {boolean} strictRemove
     */
    DieBag.prototype.removeBag = function (bag, strictRemove) {
        if (strictRemove) {
            this.strictRemoveBag(bag);
        }
        else {
            this.looseRemoveBag(bag);
        }
    };
    // @TODO, OPTIMIZE, THIS IS A PROTYPE IMPLEMENTATION ONLY
    DieBag.prototype.strictRemoveBag = function (bag) {
        var self = this;
        var guestDieIndex = 0;
        var selfDieIndex = 0;
        Object.keys(bag.dieMap).forEach(function (groupIndex) {
            for (guestDieIndex = 0; guestDieIndex < bag.dieMap[groupIndex].length; guestDieIndex++) {
                var value = bag.dieMap[groupIndex][guestDieIndex].getValue();
                for (selfDieIndex = 0; selfDieIndex < self.dieMap[groupIndex].length; selfDieIndex++) {
                    if (self.dieMap.hasOwnProperty(groupIndex) &&
                        value === self.dieMap[groupIndex][selfDieIndex].getValue() &&
                        !self.dieMap[groupIndex][selfDieIndex].isLocked()) {
                        self.dieMap[groupIndex].splice(selfDieIndex, 1);
                        break;
                    }
                }
            }
        });
    };
    // @TODO, OPTIMIZE, THIS IS A PROTYPE IMPLEMENTATION ONLY
    DieBag.prototype.looseRemoveBag = function (bag) {
        var self = this;
        Object.keys(bag.dieMap).forEach(function (groupIndex) {
            var groupSize = bag.dieMap[groupIndex].length;
            self.remove(groupSize, Number(groupIndex));
        });
    };
    /**
     * Roll 'dem laughing bones...
     *
     * Will roll and return a report on every dice in the bag.
     *
     * @returns {{[string:key] : number}
     */
    DieBag.prototype.roll = function () {
        this.rollResults = {};
        this.rollCollection();
        return this.rollResults;
    };
    /**
     * Get the object representing the contents of the bag.
     *
     * @returns {{{[p: string]: Die[]}}
     */
    DieBag.prototype.report = function () {
        return this.dieMap;
    };
    /**
     * Does the indicated # of sides already have an index in the dieMap?
     *
     * @param {number} sides
     *
     * @return {boolean}
     */
    DieBag.prototype.isDieIndexExists = function (sides) {
        return this.dieMap.hasOwnProperty(String(sides));
    };
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
    DieBag.prototype.addNewDieIndex = function (sides) {
        this.dieMap[String(sides)] = [];
    };
    /**
     * Get the total value of the dice in the die bag
     *
     * @returns {number}
     */
    DieBag.prototype.getTotal = function () {
        var self = this;
        var total = 0;
        this.refreshDieResults();
        Object.keys(self.rollResults).forEach(function (groupIndex) {
            total += self.rollResults[groupIndex];
        });
        return total;
    };
    DieBag.prototype.rollCollection = function () {
        var self = this;
        Object.keys(self.dieMap).forEach(function (groupName) {
            self.rollResults[groupName] = 0;
            Object.keys(self.dieMap[groupName]).forEach(function (dieIndexString, dieIndex) {
                var dieMapGroup = self.dieMap[groupName];
                self.rollResults[groupName] += dieMapGroup[dieIndex].roll();
            });
        });
    };
    // TODO IMPLEMENT!  IF SEARCH IS A THING WE SUPPORT, THIS MUST BE IN PLACE
    DieBag.prototype.refreshDieResults = function () {
        var self = this;
        Object.keys(self.dieMap).forEach(function (groupName) {
            self.rollResults[groupName] = 0;
            Object.keys(self.dieMap[groupName]).forEach(function (dieIndexString, dieIndex) {
                var dieMapGroup = self.dieMap[groupName];
                self.rollResults[groupName] += dieMapGroup[dieIndex].getValue();
            });
        });
    };
    return DieBag;
}());
exports.DieBag = DieBag;
//# sourceMappingURL=DieBag.js.map