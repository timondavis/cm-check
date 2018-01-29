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
var Modifier_1 = require("../../Check/Modifier/Modifier");
var TestCore_1 = require("../TestCore");
describe('Modifier', function () {
    var m;
    var MyModifier = /** @class */ (function (_super) {
        __extends(MyModifier, _super);
        function MyModifier() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyModifier.prototype.applyTo = function (check) { };
        MyModifier.prototype.getType = function () { return 'MyModifier'; };
        return MyModifier;
    }(Modifier_1.Modifier));
    it('is a base abstract class and cannot be invoked directly', function () {
        chai_1.expect(function () { return new Modifier_1.Modifier('Name', 10); }).to.throw;
    });
    it('is is applied to the "after" phase of the check, unless modified.  It should report its phase.', function () {
        m = new MyModifier('Name', 10);
        chai_1.expect(m.getPhase()).to.be.equal('after');
        m.setPhase('before');
        chai_1.expect(m.getPhase()).to.be.equal('before');
    });
    it('should report modifier values, as well as allow for adjustment', function () {
        var modifierValue = TestCore_1.TestCore.randomInt();
        var newModifierValue = TestCore_1.TestCore.randomInt();
        m = new MyModifier('Name', modifierValue);
        chai_1.expect(Number(m.getValue())).to.be.equal(modifierValue);
        m.setValue(newModifierValue);
        chai_1.expect(Number(m.getValue())).to.be.equal(newModifierValue);
    });
    it('should report its name and allow updates to the name', function () {
        var name = 'Name';
        m = new MyModifier(name, 10);
        chai_1.expect(m.getName()).to.be.equal(name);
        m.setName('New Name');
        chai_1.expect(m.getName()).to.be.equal('New Name');
    });
});
//# sourceMappingURL=Modifier.js.map