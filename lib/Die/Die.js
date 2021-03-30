"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Die = void 0;
var DieRoller_1 = require("./DieRoller");
var Die = /** @class */ (function () {
    function Die(sides) {
        this.sides = sides;
        this.value = 1;
        this.locked = false;
        if (sides < 1) {
            throw "Die must have at least one side";
        }
        this.roll();
    }
    /**
     * Roll the die and return the new result.
     *
     * @mutator
     * @returns {Die}
     */
    Die.prototype.roll = function () {
        if (!this.isLocked()) {
            this.value = DieRoller_1.DieRoller.roll(1, this.sides);
        }
        return this;
    };
    /**
     * Get the value of the die
     * @returns {number}
     */
    Die.prototype.getValue = function () {
        return this.value;
    };
    /**
     * Set the value of the die
     *
     * @throws
     * @param {number} newValue
     * @returns {Die}
     */
    Die.prototype.setValue = function (newValue) {
        if (newValue > 0 && newValue <= this.sides) {
            this.value = newValue;
        }
        else {
            throw ("Defined Die value exceeds available range");
        }
        return this;
    };
    /**
     * Lock/Unlock the die from being removed or affected
     *
     * @param {boolean} setLockTo
     * @returns {Die}
     */
    Die.prototype.lock = function (setLockTo) {
        if (setLockTo === void 0) { setLockTo = true; }
        this.locked = setLockTo;
        return this;
    };
    /**
     * Is the die locked?
     * @returns {boolean}
     */
    Die.prototype.isLocked = function () {
        return this.locked;
    };
    return Die;
}());
exports.Die = Die;
//# sourceMappingURL=Die.js.map