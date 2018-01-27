"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Die_1 = require("./Die");
var DieBag = /** @class */ (function () {
    function DieBag() {
        this._dieMap = {};
        this.rollResults = {};
    }
    Object.defineProperty(DieBag.prototype, "dieMap", {
        get: function () {
            return this._dieMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add die to the bag.  Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     * @param {number} value (optional)
     *
     * @return {DieBag}
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
            this._dieMap[sides].push(die);
        }
        return this;
    };
    /**
     * Add the contents of a die bag to this bag
     * @param {DieBag} bag
     *
     * @return {DieBag}
     */
    DieBag.prototype.addBag = function (bag) {
        var self = this;
        var dieIndex = 0;
        Object.keys(bag._dieMap).forEach(function (groupIndex) {
            for (dieIndex = 0; dieIndex < bag._dieMap[groupIndex].length; dieIndex++) {
                var newDie = bag._dieMap[groupIndex][dieIndex];
                self.add(1, Number(groupIndex), newDie.getValue());
            }
        });
        return this;
    };
    /**
     * Removed die from the bag. Translates to the famous xdy pattern  (i.e. 2d6 == 2 six sided die)
     *
     * @param {number} count
     * @param {number} sides
     *
     * @return {DieBag}
     */
    DieBag.prototype.remove = function (count, sides) {
        if (!this.isDieIndexExists(sides)) {
            return this;
        }
        var remainingDie = this._dieMap[String(sides)].length;
        while (remainingDie > 0 && count > 0) {
            this._dieMap[String(sides)].pop();
            remainingDie = this._dieMap[String(sides)].length;
            count--;
        }
        return this;
    };
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
    DieBag.prototype.removeBag = function (bag, strictRemove) {
        if (strictRemove) {
            this.strictRemoveBag(bag);
        }
        else {
            this.looseRemoveBag(bag);
        }
        return this;
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
        return this._dieMap;
    };
    /**
     * Does the indicated # of sides already have an index in the _dieMap?
     *
     * @param {number} sides
     *
     * @return {boolean}
     */
    DieBag.prototype.isDieIndexExists = function (sides) {
        return this._dieMap.hasOwnProperty(String(sides));
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
        this._dieMap[String(sides)] = [];
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
    /**
     * Get a collection of all die in the bag with the indicated amount of sides
     *
     * @param {number | string} sides
     * @returns {Die[]}
     */
    DieBag.prototype.getDieWithSides = function (sides) {
        if (isNaN(Number(sides))) {
            throw "Non-numerical value requested";
        }
        sides = String(Math.floor(Number(sides)));
        if (!this.dieMap.hasOwnProperty(sides)) {
            return [];
        }
        return this.dieMap[sides];
    };
    DieBag.decodeDieString = function (dieCode) {
        var dieDefinition;
        var count;
        var sides;
        var directive = 'add';
        if (dieCode.indexOf('-', 0) === 0) {
            directive = 'remove';
            dieCode = dieCode.substr(1);
        }
        dieDefinition = dieCode.split('d', 2);
        if (dieDefinition.length !== 2) {
            throw ("Invalid die definition string: " + dieCode);
        }
        count = Number(dieDefinition[0]);
        sides = Number(dieDefinition[1]);
        if (isNaN(count) || isNaN(sides)) {
            throw ("Invalid die definition string: " + dieCode);
        }
        return { directive: directive, value: [count, sides] };
    };
    DieBag.prototype.rollCollection = function () {
        var self = this;
        Object.keys(self._dieMap).forEach(function (groupName) {
            self.rollResults[groupName] = 0;
            Object.keys(self._dieMap[groupName]).forEach(function (dieIndexString, dieIndex) {
                var _dieMapGroup = self._dieMap[groupName];
                self.rollResults[groupName] += _dieMapGroup[dieIndex].roll().getValue();
            });
        });
    };
    // TODO IMPLEMENT!  IF SEARCH IS A THING WE SUPPORT, THIS MUST BE IN PLACE
    DieBag.prototype.refreshDieResults = function () {
        var self = this;
        Object.keys(self._dieMap).forEach(function (groupName) {
            self.rollResults[groupName] = 0;
            Object.keys(self._dieMap[groupName]).forEach(function (dieIndexString, dieIndex) {
                var _dieMapGroup = self._dieMap[groupName];
                self.rollResults[groupName] += _dieMapGroup[dieIndex].getValue();
            });
        });
    };
    // @TODO, OPTIMIZE, THIS IS A PROTYPE IMPLEMENTATION ONLY
    DieBag.prototype.strictRemoveBag = function (bag) {
        var self = this;
        var guestDieIndex = 0;
        var selfDieIndex = 0;
        Object.keys(bag._dieMap).forEach(function (groupIndex) {
            for (guestDieIndex = 0; guestDieIndex < bag._dieMap[groupIndex].length; guestDieIndex++) {
                var value = bag._dieMap[groupIndex][guestDieIndex].getValue();
                for (selfDieIndex = 0; selfDieIndex < self._dieMap[groupIndex].length; selfDieIndex++) {
                    if (self._dieMap.hasOwnProperty(groupIndex) &&
                        value === self._dieMap[groupIndex][selfDieIndex].getValue() &&
                        !self._dieMap[groupIndex][selfDieIndex].isLocked()) {
                        self._dieMap[groupIndex].splice(selfDieIndex, 1);
                        break;
                    }
                }
            }
        });
    };
    // @TODO, OPTIMIZE, THIS IS A PROTYPE IMPLEMENTATION ONLY
    DieBag.prototype.looseRemoveBag = function (bag) {
        var self = this;
        Object.keys(bag._dieMap).forEach(function (groupIndex) {
            var groupSize = bag._dieMap[groupIndex].length;
            self.remove(groupSize, Number(groupIndex));
        });
    };
    return DieBag;
}());
exports.DieBag = DieBag;
//# sourceMappingURL=DieBag.js.map