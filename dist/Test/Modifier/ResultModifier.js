var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "chai", "../../Check/CheckExecutor", "../../Check/Check", "../TestCore", "../../Check/Modifier/ResultModifier", "mocha"], function (require, exports, chai_1, CheckExecutor_1, Check_1, TestCore_1, ResultModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('ResultModifier', function () {
        var CE = CheckExecutor_1.CheckExecutor.getInstance();
        var c;
        var MyCheck = /** @class */ (function (_super) {
            __extends(MyCheck, _super);
            function MyCheck() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MyCheck.prototype.getType = function () { return 'MyCheck'; };
            MyCheck.prototype.setCheckDie = function () { };
            return MyCheck;
        }(Check_1.Check));
        it('affects the result of checks', function () {
            var modification = TestCore_1.TestCore.randomInt();
            c = new MyCheck(TestCore_1.TestCore.randomInt());
            c.addModifier(new ResultModifier_1.ResultModifier('Name', modification));
            CE.execute(c);
            chai_1.expect(c.getResult()).to.be.equal(modification);
            c = new MyCheck(TestCore_1.TestCore.randomInt());
            c.addModifier(new ResultModifier_1.ResultModifier('Name', modification * -1));
            CE.execute(c);
            chai_1.expect(c.getResult()).to.be.equal(modification * -1);
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
            var m1 = new ResultModifier_1.ResultModifier('Single-Number', modification1);
            var m2 = new ResultModifier_1.ResultModifier('Single-String', String(modification5));
            var m3 = new ResultModifier_1.ResultModifier('Multi-Number', [
                modification2,
                modification6
            ]);
            var m4 = new ResultModifier_1.ResultModifier('Multi-String', [
                String(modification3),
                String(modification4),
                String(modification7),
                String(modification8)
            ]);
            c = new MyCheck(TestCore_1.TestCore.randomInt());
            c.addModifier(m1);
            c.addModifier(m2);
            c.addModifier(m3);
            c.addModifier(m4);
            CE.execute(c);
            chai_1.expect(c.getResult()).to.be.equal(modificationSum);
        });
        it('should report its typename', function () {
            var modifier = new ResultModifier_1.ResultModifier('Name', TestCore_1.TestCore.randomInt());
            chai_1.expect(modifier.getType()).to.be.equal('result');
        });
    });
});
