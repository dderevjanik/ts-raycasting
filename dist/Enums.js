var EDirection_1 = require("./enums/EDirection");
exports.EDirection = EDirection_1.EDirection;
var EQuadrant_1 = require("./enums/EQuadrant");
exports.EQuadrant = EQuadrant_1.EQuadrant;
var ESide_1 = require("./enums/ESide");
exports.ESide = ESide_1.ESide;
var ERayTest;
(function (ERayTest) {
    ERayTest[ERayTest["CONTINUE"] = 0] = "CONTINUE";
    ERayTest[ERayTest["SKIP_RAY"] = 1] = "SKIP_RAY";
    ERayTest[ERayTest["STOP_CASTING"] = 2] = "STOP_CASTING";
})(ERayTest = exports.ERayTest || (exports.ERayTest = {}));
;
