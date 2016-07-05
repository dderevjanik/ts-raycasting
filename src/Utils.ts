import IQuadrant = require('./interfaces/IQuadrant');
import IRay = require('./interfaces/IRay');

const twoPI: number = Math.PI * 2;
const halfPI: number = Math.PI * 0.5;
const oneAndHalfPI: number = twoPI * 0.75;
/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant}
 */
const getQuadrant = (rot: number): IQuadrant => ({
    top: ((rot < 0) || (rot > Math.PI)) ? true : false,
    right: ((rot > oneAndHalfPI) || (rot < halfPI)) ? true : false
});

/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - rot to normalize, in radians
 * @return {number} normalized rot
 */
const normalizeAngle = (rot: number): number => {
    const rayAngle: number = rot % twoPI;
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
const removeFisheye = (ray: IRay, camRot: number): IRay => {
    ray.dist = ray.dist * Math.cos(camRot - ray.rot);
    return ray;
};

export = {
    getQuadrant: getQuadrant,
    normalizeAngle: normalizeAngle,
    removeFisheye: removeFisheye
};
