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
var CheckExecutor = /** @class */ (function (_super) {
    __extends(CheckExecutor, _super);
    function CheckExecutor() {
        return _super.call(this) || this;
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
     * @TODO THREAD LOCKING IS VERY RUDIMENTARY.  IMPROVE
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
     * Execute a check passed in
     *
     * @param {Check} check
     */
    CheckExecutor.doCheck = function (check) {
        check.check();
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