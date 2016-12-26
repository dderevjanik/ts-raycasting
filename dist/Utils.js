"use strict";
var twoPI = (Math.PI * 2);
var halfPI = (Math.PI * 0.5);
var oneAndHalfPI = (twoPI * 0.75);
/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant}
 */
exports.getQuadrant = function (rot) {
    var quadrant = ((rot < 0) || (rot > Math.PI)) ? 1 /* TOP */ : 4 /* BOTTOM */;
    return ((rot > oneAndHalfPI) || (rot < halfPI))
        ? (quadrant | 2 /* RIGTH */)
        : (quadrant | 8 /* LEFT */);
};
/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - rot to normalize, in radians
 * @return {number} normalized rot
 */
exports.normalizeAngle = function (rot) {
    var rayAngle = (rot % twoPI);
    return (rayAngle < 0)
        ? twoPI + rayAngle
        : rayAngle;
};
/**
 * Remove fisheye effect
 * @param {IRay} ray - ray to fix
 * @param {number} camRot - camera rot
 * @return {IRay} fixed ray
 */
exports.removeFisheye = function (ray, camRot) {
    ray.dist = ray.dist * Math.cos(camRot - ray.rot);
    return ray;
};
