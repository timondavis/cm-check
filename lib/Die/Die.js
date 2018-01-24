"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d = require('dice-bag');
var Die = /** @class */ (function () {
    function Die(sides) {
        this.sides = sides;
        this.value = 1;
        this.locked = false;
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
            this.value = d(1, this.sides);
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
     * @param {number} newValue
     * @returns {Die}
     */
    Die.prototype.setValue = function (newValue) {
        if (this.value > 0 && this.value <= this.sides) {
            this.value = newValue;
        }
        return this;
    };
    /**
     * Lock/Unlock the die from being removed or affected
     * @param {boolean} locked
     * @returns {Die}
     */
    Die.prototype.setLock = function (locked) {
        if (locked === void 0) { locked = true; }
        this.locked = locked;
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