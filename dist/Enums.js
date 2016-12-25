"use strict";
;
;
var EDirection;
(function (EDirection) {
    EDirection[EDirection["NORTH"] = (Math.PI * 1.5)] = "NORTH";
    EDirection[EDirection["EAST"] = (Math.PI * 2)] = "EAST";
    EDirection[EDirection["SOUTH"] = (Math.PI / 2)] = "SOUTH";
    EDirection[EDirection["WEST"] = Math.PI] = "WEST";
})(EDirection = exports.EDirection || (exports.EDirection = {}));
;
