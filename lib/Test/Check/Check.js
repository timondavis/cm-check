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
var chai_1 = require("chai");
require("mocha");
var Check_1 = require("../../Check/Check");
var ResultModifier_1 = require("../../Check/Modifier/ResultModifier");
describe('Check', function () {
    var c;
    var MyCheck = /** @class */ (function (_super) {
        __extends(MyCheck, _super);
        function MyCheck() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyCheck.prototype.getType = function () { return 'MyCheck'; };
        MyCheck.prototype.setBaseDieBag = function () { };
        return MyCheck;
    }(Check_1.Check));
    it('should not be directly instantiable', function () {
        chai_1.expect(function () { return new Check_1.Check(); }).to.throw();
    });
    it('should allow for modifers to be added', function () {
        c = new MyCheck(10);
        c.getDieBag().add(1, 20, 9);
        c.getDieBag().dieMap['20'][0].setLock(true);
        c.addModifier(new ResultModifier_1.ResultModifier('result-boost', 5));
        var modifiers = c.getModifiers();
        chai_1.expect(modifiers[0].getName() == 'result-boost');
    });
    it('should report pass/fail accurately', function () {
        c = new MyCheck(10);
        c.setResult(9);
        chai_1.expect(c.isPass()).to.be.false;
        c.setResult(10);
        chai_1.expect(c.isPass()).to.be.true;
        c.setResult(11);
        chai_1.expect(c.isPass()).to.be.true;
        c.setTarget(20);
        c.setResult(19);
        chai_1.expect(c.isPass()).to.be.false;
        c.setResult(20);
        chai_1.expect(c.isPass()).to.be.true;
        c.setResult(21);
        chai_1.expect(c.isPass()).to.be.true;
    });
});
//# sourceMappingURL=Check.js.map