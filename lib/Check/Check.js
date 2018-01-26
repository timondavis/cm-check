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
        this.target = target;
        this.modifiers = [];
        this.rawResult = 0;
        this.result = 0;
        this.dieBag = new DieBag_1.DieBag();
        this.setBaseDieBag();
    }
    /**
     * Add a new modifier to the check's target number before the roll
     *
     * @param {TargetModifier} modifier
     */
    Check.prototype.addModifier = function (modifier) {
        this.modifiers.push(modifier);
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
        return (this.getResult() >= this.getTarget());
    };
    /**
     * Set or reset the target number for the check
     *
     * @param {number} target
     */
    Check.prototype.setTarget = function (target) {
        this.target = target;
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
     */
    Check.prototype.setResult = function (result) {
        this.result = result;
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
     * Execute the check
     */
    Check.prototype.check = function () {
        this.dieBag.roll();
        this.rawResult = this.dieBag.getTotal();
        this.setResult(this.dieBag.getTotal());
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