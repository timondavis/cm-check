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
var ModifierFactory_1 = require("./ModifierFactory");
var DieModifier_1 = require("./DieModifier");
var DieBag_1 = require("../../DieBag");
var DieModifierFactory = /** @class */ (function (_super) {
    __extends(DieModifierFactory, _super);
    function DieModifierFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dieBag = new DieBag_1.DieBag();
        return _this;
    }
    DieModifierFactory.prototype.create = function (name, args) {
        if (args === void 0) { args = {}; }
        var clonedDieBag = this.cloneDieBag(this.dieBag);
        return new DieModifier_1.DieModifier(name, clonedDieBag, (args.hasOwnProperty('phase')) ? args['phase'] : 'before', (args.hasOwnProperty('remove')), (args.hasOwnProperty('strictRemove')));
    };
    /**
     * Set the default die bag to apply to modifiers from this factory.  May be updated at any time.
     * @param {DieBag} bag
     */
    DieModifierFactory.prototype.setDefaultDieBag = function (bag) {
        this.dieBag = bag;
    };
    DieModifierFactory.prototype.cloneDieBag = function (bag) {
        var newBag = new DieBag_1.DieBag();
        Object.keys(bag.report()).forEach(function (groupName) {
            for (var originalIndex = 0; originalIndex < bag.report()[groupName].length; originalIndex++) {
                newBag.add(1, Number(groupName), bag.report()[groupName][originalIndex].getValue());
            }
        });
        return newBag;
    };
    return DieModifierFactory;
}(ModifierFactory_1.ModifierFactory));
exports.DieModifierFactory = DieModifierFactory;
//# sourceMappingURL=DieModifierFactory.js.map