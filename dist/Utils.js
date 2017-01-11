var twoPI = (Math.PI * 2);
var halfPI = (Math.PI * 0.5);
var oneAndHalfPI = (twoPI * 0.75);
/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant} flags
 */
exports.getQuadrant = function (rot) {
    var quadrant = ((rot < 0) || (rot > Math.PI)) ? 1 /* TOP */ : 4 /* BOTTOM */;
    return ((rot > oneAndHalfPI) || (rot < halfPI))
        ? (quadrant | 2 /* RIGTH */)
        : (quadrant | 8 /* LEFT */);
};
/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - to normalize, in radians
 * @return {number} normalized rot
 */
exports.normalizeAngle = function (rot) {
    var rayAngle = (rot % twoPI);
    return (rayAngle < 0)
        ? twoPI + rayAngle
        : rayAngle;
};
/**
 * Remove fisheye effect from a ray
 * @desc ray's distance will be aligned with camera's rot
 * @param {IRay} ray - ray to fix
 * @param {number} camRot - camera's rot
 * @return {IRay} ray with fixed distance
 */
exports.removeFisheye = function (ray, camRot) {
    ray.dist = ray.dist * Math.cos(camRot - ray.rot);
    return ray;
};
