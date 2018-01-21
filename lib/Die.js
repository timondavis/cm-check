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
    Die.prototype.roll = function () {
        if (!this.isLocked()) {
            return this.value = d(1, this.sides);
        }
        return this.value;
    };
    Die.prototype.getValue = function () {
        return this.value;
    };
    Die.prototype.setValue = function (newValue) {
        if (this.value > 0 && this.value <= this.sides) {
            this.value = newValue;
        }
    };
    Die.prototype.setLock = function (locked) {
        if (locked === void 0) { locked = true; }
        this.locked = locked;
    };
    Die.prototype.isLocked = function () {
        return this.locked;
    };
    return Die;
}());
exports.Die = Die;
