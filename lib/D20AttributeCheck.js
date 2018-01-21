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
    function D20AttributeCheck() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributeName = '';
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
    D20AttributeCheck.prototype.translateAttributeValue = function (value, callback) {
        return callback(value);
        /*
        if ( this.attributeValue <= 3 ) {
            this.baseModifier = -3;
        }

        else if ( this.attributeValue <= 6 ) {
            this.baseModifier = -2;
        }

        else if ( this.attributeValue <= 9 ) {
            this.baseModifier = -1;
        }

        else if ( this.attributeValue <= 12 ) {

            this.baseModifier = 0;
        }

        else if ( this.attributeValue <= 15 ) {

            this.baseModifier = 1;
        }

        else if ( this.attributeValue <= 18 ) {

            this.baseModifier = 2;
        }

        else if ( this.attributeValue <= 21 ) {

            this.baseModifier = 3;
        }

        else {
            this.baseModifier = 4;
        }
        */
    };
    return D20AttributeCheck;
}(Check_1.Check));
exports.D20AttributeCheck = D20AttributeCheck;
