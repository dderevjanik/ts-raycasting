import { IRay } from './Interfaces';
import { EQuadrant } from './Enums';

const twoPI = (Math.PI * 2);
const halfPI = (Math.PI * 0.5);
const oneAndHalfPI = (twoPI * 0.75);

/**
 * From which quadrant are we looking out ?
 * @param {number} rot
 * @return {IQuadrant} flags
 */

export const getQuadrant = (rot: number): number => {
    const quadrant = ((rot < 0) || (rot > Math.PI)) ? EQuadrant.TOP : EQuadrant.BOTTOM;
    return ((rot > oneAndHalfPI) || (rot < halfPI))
        ? (quadrant | EQuadrant.RIGTH)
        : (quadrant | EQuadrant.LEFT);
};

/**
 * Normalize angle to be between <0, 2*Math.Pi>
 * @param {number} rot - to normalize, in radians
 * @return {number} normalized rot
 */
export const normalizeAngle = (rot: number): number => {
    const rayAngle = (rot % twoPI);
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
export const removeFisheye = (ray: IRay, camRot: number): IRay => {
    ray.dist = ray.dist * Math.cos(camRot - ray.rot);
    return ray;
};
