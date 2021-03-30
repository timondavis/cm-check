"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modifier = void 0;
var Modifier = /** @class */ (function () {
    function Modifier(name, value) {
        if (name === void 0) { name = ''; }
        if (value === void 0) { value = []; }
        this.name = name;
        this.value = value;
        this.phase = 'after';
    }
    /**
     * Get the name of this modifier
     * @returns {string}
     */
    Modifier.prototype.getName = function () {
        return this.name;
    };
    /**
     * Set the name of this modifier
     *
     * @param {string} name
     * @returns {Modifier}
     */
    Modifier.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    /**
     * Get the value of this modifier
     *
     * @returns {string | number | string[] | number[]}
     */
    Modifier.prototype.getValue = function () { return this.value; };
    /**
     * Set the value of this modifier
     *
     * @param {string | number | string[] | number[]} value
     * @returns {Modifier}
     */
    Modifier.prototype.setValue = function (value) {
        this.value = value;
        return this;
    };
    /**
     * Define the check phase in which this modifier should execute
     *
     * @returns {string}
     */
    Modifier.prototype.getPhase = function () {
        return this.phase;
    };
    /**
     * Get the check phase in which this modifier should execute
     * @param {string} phase
     * @returns {Modifier}
     */
    Modifier.prototype.setPhase = function (phase) {
        this.phase = phase;
        return this;
    };
    /**
     * Convenience method for summing values stored in the value array.  Only works if they're all numbers.
     *
     * @pre  All items in this.value must be numbers - they can be strings in there, but they must be numeric strings.
     *
     * @returns {number | boolean} Will return false if NaN is found in value array or as value.
     */
    Modifier.prototype.sumOfValues = function () {
        var valueIndex = 0;
        var accumulatedValue = 0;
        // Add numerical arrays, return false if NaN is found in array.
        if (Array.isArray(this.value)) {
            for (valueIndex = 0; valueIndex < this.value.length; valueIndex++) {
                var localValue = Number(this.value[valueIndex]);
                if (isNaN(localValue)) {
                    return false;
                }
                accumulatedValue += localValue;
            }
            return accumulatedValue;
        }
        // Return the value if not an array, and only if its a number.  False otherwise.
        return (isNaN(Number(this.value)) ? false : Number(this.value));
    };
    return Modifier;
}());
exports.Modifier = Modifier;
//# sourceMappingURL=Modifier.js.map