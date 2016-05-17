import {IQuadrant, IRay} from './Interfaces';

const twoPI: number = Math.PI * 2;

/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant}
 */
export const getQuadrant = (rot: number): IQuadrant => ({
    top: ((rot < 0) || (rot > Math.PI)) ? true : false,
    right: ((rot > (twoPI * 0.75)) || (rot < (twoPI * 0.25))) ? true : false
});

/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - rot to normalize, in radians
 * @return {number} normalized rot
 */
export const normalizeAngle = (rot: number): number => {
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
export const removeFisheye = (ray: IRay, camRot: number): IRay => {
    ray.dist = ray.dist * Math.cos(camRot - ray.rot);
    return ray;
};

export default {
    getQuadrant: getQuadrant,
    normalizeAngle: normalizeAngle,
    removeFisheye: removeFisheye
};
