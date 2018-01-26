"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestCore = /** @class */ (function () {
    function TestCore() {
    }
    TestCore.randomInt = function (max, includeZero) {
        if (includeZero === void 0) { includeZero = false; }
        return Math.random() * max + ((includeZero) ? 0 : 1);
    };
    return TestCore;
}());
exports.TestCore = TestCore;
//# sourceMappingURL=testcore.js.map