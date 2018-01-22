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
var ResultModifier_1 = require("./ResultModifier");
var ResultModifierFactory = /** @class */ (function (_super) {
    __extends(ResultModifierFactory, _super);
    function ResultModifierFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultModifierFactory.prototype.create = function (name, args) {
        if (args === void 0) { args = {}; }
        return new ResultModifier_1.ResultModifier(name, (args.hasOwnProperty('value')) ? Number(args['value']) : 0);
    };
    return ResultModifierFactory;
}(ModifierFactory_1.ModifierFactory));
exports.ResultModifierFactory = ResultModifierFactory;
//# sourceMappingURL=ResultModifierFactory.js.map