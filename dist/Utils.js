"use strict";
var twoPI = Math.PI * 2;
/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant}
 */
exports.getQuadrant = function (rot) { return ({
    top: ((rot < 0) || (rot > Math.PI)) ? true : false,
    right: ((rot > (twoPI * 0.75)) || (rot < (twoPI * 0.25))) ? true : false
}); };
/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - rot to normalize, in radians
 * @return {number} normalized rot
 */
exports.normalizeAngle = function (rot) {
    var rayAngle = rot % twoPI;
    return (rayAngle < 0)
        ? twoPI + rayAngle
        : rayAngle;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getQuadrant: exports.getQuadrant,
    normalizeAngle: exports.normalizeAngle
};
//# sourceMappingURL=Utils.js.map