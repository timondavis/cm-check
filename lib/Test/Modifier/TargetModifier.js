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
require("mocha");
var chai_1 = require("chai");
var CheckExecutor_1 = require("../../Check/CheckExecutor");
var Check_1 = require("../../Check/Check");
var TestCore_1 = require("../TestCore");
var TargetModifier_1 = require("../../Check/Modifier/TargetModifier");
describe('TargetModifier', function () {
    var CE = CheckExecutor_1.CheckExecutor.getInstance();
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
    it('affects the result of checks', function () {
        var modification = TestCore_1.TestCore.randomInt();
        var initialTarget = TestCore_1.TestCore.randomInt();
        c = new MyCheck(initialTarget);
        c.addModifier(new TargetModifier_1.TargetModifier('Name', modification));
        CE.execute(c);
        chai_1.expect(c.getTarget()).to.be.equal(initialTarget + modification);
        c = new MyCheck(initialTarget);
        c.addModifier(new TargetModifier_1.TargetModifier('Name', modification * -1));
        CE.execute(c);
        chai_1.expect(c.getTarget()).to.be.equal(initialTarget + (modification * -1));
    });
    it('can process a single or array of numeric string or numeric values', function () {
        var modification1 = TestCore_1.TestCore.randomInt();
        var modification2 = TestCore_1.TestCore.randomInt();
        var modification3 = TestCore_1.TestCore.randomInt();
        var modification4 = TestCore_1.TestCore.randomInt();
        var modification5 = -1 * TestCore_1.TestCore.randomInt();
        var modification6 = -1 * TestCore_1.TestCore.randomInt();
        var modification7 = -1 * TestCore_1.TestCore.randomInt();
        var modification8 = -1 * TestCore_1.TestCore.randomInt();
        var modificationSum = modification1 + modification2 + modification3 + modification4 +
            modification5 + modification6 + modification7 + modification8;
        var m1 = new TargetModifier_1.TargetModifier('Single-Number', modification1);
        var m2 = new TargetModifier_1.TargetModifier('Single-String', String(modification5));
        var m3 = new TargetModifier_1.TargetModifier('Multi-Number', [
            modification2,
            modification6
        ]);
        var m4 = new TargetModifier_1.TargetModifier('Multi-String', [
            String(modification3),
            String(modification4),
            String(modification7),
            String(modification8)
        ]);
        var initialTarget = TestCore_1.TestCore.randomInt();
        c = new MyCheck(initialTarget);
        c.addModifier(m1);
        c.addModifier(m2);
        c.addModifier(m3);
        c.addModifier(m4);
        CE.execute(c);
        chai_1.expect(c.getTarget()).to.be.equal(initialTarget + modificationSum);
    });
    it('should report its typename', function () {
        var modifier = new TargetModifier_1.TargetModifier('Name', TestCore_1.TestCore.randomInt());
        chai_1.expect(modifier.getType()).to.be.equal('target');
    });
});
//# sourceMappingURL=TargetModifier.js.map