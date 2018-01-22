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
var Check_1 = require("./Check");
var D20AttributeCheck = /** @class */ (function (_super) {
    __extends(D20AttributeCheck, _super);
    function D20AttributeCheck(attributeValue, target) {
        var _this = _super.call(this, D20AttributeCheck.translateAttributeValue(attributeValue), target) || this;
        _this.attributeName = '';
        _this.dieBag.add(1, 20);
        return _this;
    }
    D20AttributeCheck.prototype.setAttribute = function (name) {
        this.attributeName = name;
    };
    D20AttributeCheck.prototype.getType = function () {
        return this.attributeName + 'Attribute';
    };
    D20AttributeCheck.prototype.setBaseDieBag = function () {
        this.dieBag.add(1, 20);
    };
    D20AttributeCheck.translateAttributeValue = function (value) {
        if (value <= 3) {
            return -3;
        }
        else if (value <= 6) {
            return -2;
        }
        else if (value <= 9) {
            return -1;
        }
        else if (value <= 12) {
            return 0;
        }
        else if (value <= 15) {
            return 1;
        }
        else if (value <= 18) {
            return 2;
        }
        else if (value <= 21) {
            return 3;
        }
        else {
            return 4;
        }
    };
    return D20AttributeCheck;
}(Check_1.Check));
exports.D20AttributeCheck = D20AttributeCheck;
//# sourceMappingURL=D20AttributeCheck.js.map