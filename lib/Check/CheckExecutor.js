"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var SimpleCheck_1 = require("./SimpleCheck");
var D20AttributeCheck_1 = require("./D20AttributeCheck");
var DieModifier_1 = require("./Modifier/DieModifier");
var ResultModifier_1 = require("./Modifier/ResultModifier");
var TargetModifier_1 = require("./Modifier/TargetModifier");
var CheckExecutor = /** @class */ (function (_super) {
    __extends(CheckExecutor, _super);
    function CheckExecutor() {
        var _this = _super.call(this) || this;
        _this.checkTypes = {};
        _this.modifierTypes = {};
        _this.registerCheckType('simple', function () { return new SimpleCheck_1.SimpleCheck(); });
        _this.registerCheckType('d20-attribute', function () { return new D20AttributeCheck_1.D20AttributeCheck(); });
        _this.registerModifierType('die', function () { return new DieModifier_1.DieModifier(); });
        _this.registerModifierType('result', function () { return new ResultModifier_1.ResultModifier(); });
        _this.registerModifierType('target', function () { return new TargetModifier_1.TargetModifier(); });
        return _this;
    }
    /**
     * Get the global instance of the Check Machine
     * @returns {CheckExecutor}
     */
    CheckExecutor.getInstance = function () {
        return CheckExecutor.instance;
    };
    /**
     * Execute a check
     *
     * @TODO is there a better way to thread-lock on this method?
     *
     * @param {Check} check
     * @returns {Check}
     */
    CheckExecutor.prototype.execute = function (check) {
        while (CheckExecutor.isThreadLocked()) { }
        CheckExecutor.engageThreadLock();
        this.on(check.getType() + '_modifiers', CheckExecutor.processModifiers);
        this.emit(check.getType() + '_modifiers', check, 'before');
        while (CheckExecutor.isThreadLocked()) { }
        this.removeListener(check.getType() + '_modifiers', CheckExecutor.processModifiers);
        CheckExecutor.engageThreadLock();
        this.on(check.getType() + '_roll', CheckExecutor.liftThreadLock);
        this.emit(check.getType() + '_roll', check, 'before');
        while (CheckExecutor.isThreadLocked()) { }
        this.removeListener(check.getType() + '_roll', CheckExecutor.liftThreadLock);
        CheckExecutor.doCheck(check);
        CheckExecutor.engageThreadLock();
        this.on(check.getType() + '_modifiers', CheckExecutor.processModifiers);
        this.emit(check.getType() + '_modifiers', check, 'after');
        while (CheckExecutor.isThreadLocked()) { }
        this.removeListener(check.getType() + '_modifiers', CheckExecutor.processModifiers);
        CheckExecutor.engageThreadLock();
        this.on(check.getType() + '_finish', CheckExecutor.liftThreadLock);
        this.emit(check.getType() + '_finish', check, 'after');
        while (CheckExecutor.isThreadLocked()) { }
        this.removeListener(check.getType() + '_finish', CheckExecutor.liftThreadLock);
        // Has the dice bag been affected in a way that affects the final result?  Compare the difference between
        // the adjusted and original dice rolls and apply the difference to the result.
        var difference = check.getDieBag().getTotal() - check.getRawRollResult();
        if (difference !== 0) {
            check.setResult(check.getResult() + difference);
        }
        return check;
    };
    /**
     * Generate a new check.  Returns a simple check by default, but you can pass in the key of a check type to get
     * an instance.
     *
     * @param {string} type
     * @returns {Check}
     */
    CheckExecutor.prototype.generateCheck = function (type) {
        if (type === void 0) { type = 'simple'; }
        if (!this.checkTypes.hasOwnProperty(type)) {
            throw ("Check Type '" + type + "' does not exist.");
        }
        return this.checkTypes[type]();
    };
    /**
     * Register a check type to the CheckExecutor.  The callback provided should return an instance of the check
     * being paired with it.
     *
     * @param {string} type
     * @param {Function} callback
     */
    CheckExecutor.prototype.registerCheckType = function (type, callback) {
        this.checkTypes[type] = callback;
    };
    /**
     * Get an array of the available check names
     * @returns {string[]}
     */
    CheckExecutor.prototype.getCheckTypes = function () {
        return Object.keys(this.checkTypes);
    };
    /**
     * Generate a new modifier instance
     *
     * @param {string} type
     * @returns {Modifier}
     */
    CheckExecutor.prototype.generateModifier = function (type) {
        if (!this.modifierTypes.hasOwnProperty(type)) {
            throw ("Modifier Type '" + type + "' does not exist.");
        }
        return this.modifierTypes[type]();
    };
    /**
     * Register a new modifier type
     *
     * @param {string} type
     * @param {Function} callback
     */
    CheckExecutor.prototype.registerModifierType = function (type, callback) {
        this.modifierTypes[type] = callback;
    };
    /**
     * Get an array of available modifier names
     *
     * @returns {string[]}
     */
    CheckExecutor.prototype.getModifierTypes = function () {
        return Object.keys(this.modifierTypes);
    };
    CheckExecutor.doCheck = function (check) {
        check.roll();
    };
    CheckExecutor.processModifiers = function (check, phase) {
        var modifiers = check.getModifiers();
        for (var modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
            if (modifiers[modifierIndex].getPhase() != phase) {
                continue;
            }
            modifiers[modifierIndex].applyTo(check);
        }
        CheckExecutor.liftThreadLock();
    };
    CheckExecutor.engageThreadLock = function () { CheckExecutor.locked = true; };
    CheckExecutor.liftThreadLock = function () { CheckExecutor.locked = false; };
    CheckExecutor.isThreadLocked = function () { return CheckExecutor.locked; };
    CheckExecutor.instance = new CheckExecutor();
    CheckExecutor.locked = false;
    return CheckExecutor;
}(events_1.EventEmitter));
exports.CheckExecutor = CheckExecutor;
//# sourceMappingURL=CheckExecutor.js.map