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
exports.SimpleCheck = void 0;
var Check_1 = require("./Check");
var SimpleCheck = /** @class */ (function (_super) {
    __extends(SimpleCheck, _super);
    function SimpleCheck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleCheck.prototype.getType = function () { return 'simple'; };
    SimpleCheck.prototype.setCheckDie = function () { };
    return SimpleCheck;
}(Check_1.Check));
exports.SimpleCheck = SimpleCheck;
//# sourceMappingURL=SimpleCheck.js.map