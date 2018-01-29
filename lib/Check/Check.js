"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DieBag_1 = require("../Die/DieBag");
var Check = /** @class */ (function () {
    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} target
     */
    function Check(target) {
        if (target === void 0) { target = 0; }
        this.target = target;
        this.modifiers = [];
        this.rawResult = 0;
        this.result = 0;
        this.testCondition = '>=';
        this.dieBag = new DieBag_1.DieBag();
        this.setCheckDie();
    }
    /**
     * Add a new modifier to the check's target number before the roll
     *
     * @param {TargetModifier} modifier
     * @return { Check }
     */
    Check.prototype.addModifier = function (modifier) {
        this.modifiers.push(modifier);
        return this;
    };
    /**
     * Get the modifiers attributed to this check.
     *
     * @returns {Modifier[]}
     */
    Check.prototype.getModifiers = function () {
        return this.modifiers;
    };
    /**
     * Has the check passed?
     *
     * @returns {boolean}
     */
    Check.prototype.isPass = function () {
        var isPass = false;
        switch (this.getTestCondition()) {
            case ('>='): {
                isPass = (this.getResult() >= this.getTarget());
                break;
            }
            case ('>'): {
                isPass = (this.getResult() > this.getTarget());
                break;
            }
            case ('<='): {
                isPass = (this.getResult() <= this.getTarget());
                break;
            }
            case ('<'): {
                isPass = (this.getResult() < this.getTarget());
                break;
            }
            default:
                throw ("Invalid test operator '" + this.getTestCondition() + "', cannot perform test");
        }
        return isPass;
    };
    /**
     * Set or reset the target number for the check
     *
     * @param {number} target
     *
     * @returns {Check}
     */
    Check.prototype.setTarget = function (target) {
        this.target = target;
        return this;
    };
    /**
     * Get the target number for the check
     *
     * @returns {number}
     */
    Check.prototype.getTarget = function () {
        return this.target;
    };
    /**
     * Set or reset the result of the check
     *
     * @param {number} result
     * @returns {Check}
     */
    Check.prototype.setResult = function (result) {
        this.result = result;
        return this;
    };
    /**
     * Get the current result value on the check
     * @returns {number}
     */
    Check.prototype.getResult = function () {
        return this.result;
    };
    /**
     * Get the result of dice rolled, without modifiers.
     * @returns {number}
     */
    Check.prototype.getRawRollResult = function () {
        return this.rawResult;
    };
    /**
     * Roll the dice for the check
     *
     * @returns {Check}
     */
    Check.prototype.roll = function () {
        this.dieBag.roll();
        this.rawResult = this.dieBag.getTotal();
        this.setResult(this.dieBag.getTotal());
        return this;
    };
    /**
     * Get the die bag belonging to the check
     *
     * @returns {DieBag}
     */
    Check.prototype.getDieBag = function () {
        return this.dieBag;
    };
    /**
     * Add die to the check
     *
     * @param {number} count
     * @param {number} sides
     *
     * @returns {Check}
     */
    Check.prototype.addDie = function (count, sides) {
        this.getDieBag().add(count, sides);
        return this;
    };
    /**
     * Remove die from the check
     *
     * @param {number} count
     * @param {number} sides
     *
     * @returns {Check}
     */
    Check.prototype.removeDie = function (count, sides) {
        this.getDieBag().remove(count, sides);
        return this;
    };
    /**
     * Set the comparison operator for the check pass test.  Result on left, Target on right.
     * For example, 'result < target' is a pass if the result is less than the target, and the operator is '<'
     *
     * @param {string} operator
     *
     * @returns {Check}
     */
    Check.prototype.setTestCondition = function (operator) {
        if (operator != '>' && operator != '>=' && operator != '<' && operator != '<=') {
            throw ('Invalid success operator provided.  Value values include "<", "<=", ">", ">="');
        }
        this.testCondition = operator;
        return this;
    };
    /**
     * Get the test condition for the check pass test.  Result is left of the symbol, target on the right.
     * For example, 'result < target' is a pass if the result is less than the target, and the operator is '<'
     *
     * @returns {string}
     */
    Check.prototype.getTestCondition = function () {
        return this.testCondition;
    };
    /**
     * Get a report on the status of the check
     * @param {boolean} getReportAsString
     *
     * @returns {string | {{isPass: boolean; target: number; result: number, modifiers: []any, number}}
     */
    Check.prototype.report = function (getReportAsString) {
        var report = new CheckReport(this.isPass(), this.getTarget(), this.getResult(), this.getModifiers(), this.getRawRollResult(), this.getDieBag());
        return (getReportAsString) ? JSON.stringify(report) : report;
    };
    return Check;
}());
exports.Check = Check;
var CheckReport = /** @class */ (function () {
    function CheckReport(isPass, target, result, modifiers, rollResult, dieBag) {
        this.isPass = isPass;
        this.target = target;
        this.result = result;
        this.modifiers = modifiers;
        this.rollResult = rollResult;
        this.dieBag = dieBag;
    }
    return CheckReport;
}());
exports.CheckReport = CheckReport;
//# sourceMappingURL=Check.js.map