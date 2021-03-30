"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModifier = void 0;
var Modifier_1 = require("./Modifier");
var ResultModifier = /** @class */ (function (_super) {
    __extends(ResultModifier, _super);
    function ResultModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultModifier.prototype.applyTo = function (check) {
        var sumOfValues = Number(this.sumOfValues());
        check.setResult(check.getResult() + sumOfValues);
    };
    ResultModifier.prototype.getType = function () {
        return 'result';
    };
    return ResultModifier;
}(Modifier_1.Modifier));
exports.ResultModifier = ResultModifier;
//# sourceMappingURL=ResultModifier.js.map